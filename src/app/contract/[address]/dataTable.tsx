'use client'

import {
    Link,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import {blockType} from "@/api";
import React from "react";
import {useRouter} from "next/navigation";
import {formatLocalTime, shortenHash} from "@/lib/function";
import {CopyableText} from "@/componments/CopyableText";
import {List} from "@/type";

type NftTableProps = {
    data: List[];
    isLoading: boolean;
    page: number;
    setPageAction: React.Dispatch<React.SetStateAction<number>>;
    total: number;
};
export const NftTable=({data,isLoading,page,setPageAction,total}:NftTableProps)=>{
    const router = useRouter()
    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
    const renderCell = React.useCallback((user: List, columnKey: keyof List) => {
        const cellValue = user[columnKey];
        const press=()=>{
            // const {BlockHeight,BlockHash,TxNum,Timestamp}=user
            // const encoded = btoa(JSON.stringify({BlockHeight,BlockHash,TxNum,Timestamp})); // Base64编码
            // router.push(`/block/${user.BlockHeight}?data=${encoded}`);
        }
        switch (columnKey) {
            case "contractId":
                return (
                    <div className={'flex items-center gap-2'}>
                        <Link onPress={press} isBlock className={'cursor-pointer'}  >
                            {shortenHash(String(cellValue),15)}
                        </Link>
                        <CopyableText text={cellValue}>
                        </CopyableText>
                    </div>
                );
                case "name":
                return (
                    <div className={'flex items-center gap-2'}>
                        <Link underline={'hover'} onPress={press} isBlock className={'cursor-pointer'}  >
                            {cellValue}
                        </Link>
                    </div>
                );
            case "tokenId":
                return (
                    <div className={'flex items-center gap-2'}>
                        <Link onPress={press} isBlock className={'cursor-pointer'}  >
                            {shortenHash(String(cellValue),15)}
                        </Link>
                        <CopyableText text={cellValue}>
                        </CopyableText>
                    </div>

                );
            case "createAt":
                return (
                    <>
                        <div className={'flex items-center gap-2'}>
                            {formatLocalTime(cellValue)}
                        </div>

                    </>
                )
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table
            isStriped
            isHeaderSticky
            bottomContent={
                <div className="flex w-full justify-end">
                    <Pagination
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={total}
                        onChange={(page) => setPageAction(page)}
                    />
                </div>
            }
        >
            <TableHeader>
                <TableColumn key="name">
                    NFT名称</TableColumn>
                <TableColumn key="tokenId">NFT ID</TableColumn>
                <TableColumn key="contractId">合约ID</TableColumn>
                <TableColumn key="createAt" >
                    创建时间
                </TableColumn>
            </TableHeader>
            <TableBody
                items={data ?? []}
                loadingContent={<Spinner/>}
                loadingState={loadingState}
                isLoading={isLoading}
            >
                {(item) => (
                    <TableRow key={item?.tokenId}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof List)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
