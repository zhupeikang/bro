'use client'

import {Link, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {transactionListType} from "@/api";
import React from "react";
import {useRouter} from "next/navigation";
import {Chip} from "@heroui/chip";
import {shortenHash} from "@/lib/function";
import {CopyableText} from "@/componments/CopyableText";


export const TransactionTable=({data,isLoading}:{data:transactionListType[],isLoading:boolean})=>{
    const router = useRouter()
    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
    const renderCell = React.useCallback((user: transactionListType, columnKey: keyof transactionListType) => {
        const cellValue = user[columnKey];
        const press=()=>{
            const {TxId}=user
            const encoded = btoa(JSON.stringify({TxId})); // Base64编码
            router.push(`/transaction/${user.TxId}`);
        }
        const pressHeight=()=>{
            const {BlockHeight,BlockHash,Timestamp}=user
            const encoded = btoa(JSON.stringify({BlockHeight,BlockHash,Timestamp})); // Base64编码
            router.push(`/block/${user.BlockHeight}?data=${encoded}`);
        }
        const statusColor=user['TxStatusCode']==='SUCCESS'?'success':'danger'
        switch (columnKey) {
            case "BlockHeight":
                return (
                    <Link onPress={pressHeight} isBlock className={'cursor-pointer'}  >
                        {cellValue}
                    </Link>
                );
            case "TxStatusCode":
                return (
                    <Chip color={statusColor}  >
                        {cellValue}
                    </Chip>
                );
            case "TxType":
                return (
                    <Chip color={'primary'}  >
                        {cellValue}
                    </Chip>
                );
            case "TxId":
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
    }, []);


    return (
        <Table
            isStriped
            isHeaderSticky
        >
            <TableHeader>
                <TableColumn key="TxId">交易哈希</TableColumn>
                <TableColumn key="TxType">交易消息类型</TableColumn>
                <TableColumn key="TxStatusCode">状态</TableColumn>
                <TableColumn key="BlockHeight">区块高度</TableColumn>
                <TableColumn key="Timestamp">时间</TableColumn>
                <TableColumn key="Gas">GAS</TableColumn>
            </TableHeader>
            <TableBody
                items={data ?? []}
                loadingContent={<Spinner/>}
                loadingState={loadingState}
                isLoading={isLoading}
            >
                {(item) => (
                    <TableRow key={item?.Id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof transactionListType)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
