'use client'
import React, {createContext, useContext, useEffect, useState} from "react";
import {getIndexData} from "@/api";
export type indexDataType = {
    trans_count:number;
    nft_count:number;
    block:number;
    user_count:number;
}
const IndexContext = createContext<indexDataType|null>(null);

export const IndexProvider = ({children}: { children: React.ReactNode }) => {
    const [indexData, setIndexData] = useState<indexDataType>({
        trans_count:0,
        nft_count:0,
        block:0,
        user_count:0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getIndexData(); // 确保 `getHomeIndex` 是异步的
                setIndexData(res.data.data);
            } catch (err) {
                console.error("Error fetching home index:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <IndexContext.Provider value={indexData}>
            {children}
        </IndexContext.Provider>
    );
};
export const useIndexData = () => {
    const context = useContext(IndexContext);

    if (!context) throw new Error("useNews must be used within IndexProvider");

    return context; // 现在 `useNews()` 可以获取 `data` 和 `setData`
};
