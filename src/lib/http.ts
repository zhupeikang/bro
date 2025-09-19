import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';

// 定义接口
interface TokenData {
    accessToken: string;
    refreshToken: string;
    expiresAt: number; // 过期时间戳 (毫秒)
}

interface RefreshQueueItem {
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
}

class HttpService {
    private readonly instance: AxiosInstance;
    private tokenStorageKey = 'app_auth_tokens';
    private isRefreshing = false;
    private refreshQueue: RefreshQueueItem[] = [];

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private getTokenData(): TokenData | null {
        if (typeof window === 'undefined') return null; // 确保在客户端执行

        const data = localStorage.getItem(this.tokenStorageKey);
        return data ? JSON.parse(data) : null;
    }

    private setTokenData(data: TokenData): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(this.tokenStorageKey, JSON.stringify(data));
    }

    public clearTokens(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(this.tokenStorageKey);
    }

    private async refreshAccessToken(): Promise<string> {
        try {
            const tokenData = this.getTokenData();
            if (!tokenData) throw new Error('No tokens available');

            // 实际项目中这里应该是刷新 token 的 API 调用
            const response = await axios.post<{
                accessToken: string;
                expiresIn: number;
            }>('/api/auth/refresh', {
                refreshToken: tokenData.refreshToken,
            });

            const newTokenData: TokenData = {
                accessToken: response.data.accessToken,
                refreshToken: tokenData.refreshToken,
                expiresAt: Date.now() + response.data.expiresIn * 1000,
            };

            this.setTokenData(newTokenData);
            return newTokenData.accessToken;
        } catch (error) {
            this.clearTokens();
            throw error;
        }
    }

    private setupInterceptors(): void {
        // 请求拦截器 - 添加认证 token
        this.instance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const tokenData = this.getTokenData();

                if (tokenData) {
                    // 检查 token 是否过期
                    if (Date.now() >= tokenData.expiresAt - 30000) { // 提前30秒刷新
                        try {
                            const newToken = await this.handleTokenRefresh();
                            config.headers.Authorization = `Bearer ${newToken}`;
                        } catch (error) {
                            console.error('Token refresh failed', error);
                            // 可以在这里触发重新登录
                        }
                    } else {
                        config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // 响应拦截器 - 处理 token 过期
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(response)
                if (response.data.code === 200) {
                    return response;
                } else {
                    return Promise.reject(new Error(response.statusText || 'Error'));
                }
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
                // 处理 401 错误且不是刷新 token 的请求
                if (error.response?.status === 401 && !originalRequest?._retry) {
                    if (this.isRefreshing) {
                        // 将请求加入队列等待刷新完成
                        return new Promise((resolve, reject) => {
                            this.refreshQueue.push({ resolve, reject });
                        }).then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return this.instance(originalRequest);
                        }).catch(err => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const newToken = await this.refreshAccessToken();
                        // 更新原始请求的 header
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;

                        // 重试原始请求
                        const retryResponse = await this.instance(originalRequest);

                        // 处理队列中的请求
                        this.processQueue(null, newToken);
                        return retryResponse;
                    } catch (refreshError) {
                        this.processQueue(refreshError as AxiosError);
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    private async handleTokenRefresh(): Promise<string> {
        if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
                this.refreshQueue.push({ resolve, reject });
            });
        }

        this.isRefreshing = true;
        try {
            const newToken = await this.refreshAccessToken();
            this.processQueue(null, newToken);
            return newToken;
        } catch (error) {
            this.processQueue(error as AxiosError);
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    private processQueue(error: AxiosError | null, token?: string): void {
        this.refreshQueue.forEach(promise => {
            if (error) {
                promise.reject(error);
            } else if (token) {
                promise.resolve(token);
            }
        });
        this.refreshQueue = [];
    }

    public get<T>(url: string, config?: AxiosRequestConfig):  Promise<AxiosResponse<T>>{
        return this.instance.get<T>(url, config);
    }
    public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data, config);
    }

    public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(url, config);
    }

    // 设置 token (登录成功后调用)
    public setTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
        this.setTokenData({
            accessToken,
            refreshToken,
            expiresAt: Date.now() + expiresIn * 1000,
        });
    }
}

// 导出单例实例
const httpService = new HttpService();
export default httpService;
