"use client";

import { useRouter } from "next/navigation";

export function useNavigate() {
    const router = useRouter();

    const goTo = (path: string, params?: Record<string, string | number>) => {
        if (params) {
            const query = new URLSearchParams(
                Object.entries(params).map(([k, v]) => [k, String(v)])
            );
            router.push(`${path}?${query.toString()}`);
        } else {
            console.log(333)
            router.push(path);
        }
    };

    return { goTo };
}
