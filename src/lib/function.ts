import useCopyToClipboard from 'react-use/lib/useCopyToClipboard'
export const toDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // 将秒转换为毫秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const shortenHash = (
    hash: string|number,
    front = 10,
    back = 4
):string  => {
    hash = String(hash);
    if (!hash || hash.length <= front + back) {
        return hash; // 长度太短就不省略
    }
    return `${hash.slice(0, front)}...${hash.slice(-back)}`;
};

/**
 * 将 ISO 时间字符串格式化为本地时间
 * @param iso ISO 格式时间，如 "2025-09-16T06:28:40"
 * @returns 本地时间字符串，如 "2025/09/16 14:28:40"
 */
export function formatLocalTime(iso: string): string {
    if (!iso) return "";
    const date = new Date(iso);
    if (isNaN(date.getTime())) return iso; // 解析失败时原样返回

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}
