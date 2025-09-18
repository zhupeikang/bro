'use client'

import {Link, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {blockType} from "@/api";
import React from "react";
import {useRouter} from "next/navigation";
import {shortenHash} from "@/lib/function";
import {Clock9, Copy} from "lucide-react";
import {CopyableText} from "@/componments/CopyableText";


export const BlockTable=({data,isLoading}:{data:blockType[],isLoading:boolean})=>{
    const router = useRouter()
    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
    const renderCell = React.useCallback((user: blockType, columnKey: keyof blockType) => {
        const cellValue = user[columnKey];
        const press=()=>{
            const {BlockHeight,BlockHash,TxNum,Timestamp}=user
            const encoded = btoa(JSON.stringify({BlockHeight,BlockHash,TxNum,Timestamp})); // Base64编码
            router.push(`/block/${user.BlockHeight}?data=${encoded}`);
        }
        switch (columnKey) {
            case "BlockHeight":
                return (
                    <Link onPress={press} isBlock className={'cursor-pointer'}  >
                        {(cellValue)}
                    </Link>
                );
            case "BlockHash":
                return (
                    <div className={'flex items-center gap-2'}>
                        <Link onPress={press} isBlock className={'cursor-pointer'}  >
                            {shortenHash(String(cellValue))}
                        </Link>
                        <CopyableText text={cellValue}>
                        </CopyableText>
                    </div>

                );
            case "Timestamp":
                return (
                    <>
                        <div className={'flex items-center gap-2'}>
                            {cellValue}
                        </div>

                    </>
                )
            default:
                return cellValue;
        }
    }, [router]);

    return (
        <Table
            isStriped
            isHeaderSticky
        >
            <TableHeader>
                <TableColumn key="BlockHeight">
                    区块高度</TableColumn>
                <TableColumn key="BlockHash">区块哈希</TableColumn>
                <TableColumn key="TxNum">交易数量</TableColumn>
                <TableColumn key="Timestamp" >
                    出块时间
                </TableColumn>
            </TableHeader>
            <TableBody
                items={data ?? []}
                loadingContent={<Spinner/>}
                loadingState={loadingState}
                isLoading={isLoading}
            >
                {(item) => (
                    <TableRow key={item?.Id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof blockType)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
