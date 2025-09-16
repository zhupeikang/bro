'use client';
import React, {use, useEffect, useState} from 'react'
import {
    Card,
    CardBody, CardFooter,
    CardHeader,
    Divider, getKeyValue, Link, Pagination,
    Spinner,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import {useIndexData} from "@/hooks/useIndexData";
import {useRouter, useSearchParams} from "next/navigation";
import {Chip} from "@heroui/chip";
import {blockDetail, blockList, blockType, transactionDetail, transactionDetailHash} from "@/api";
import {toDate} from "@/lib/function";

export default function Page({params,searchParams}: {
    params: Promise<{ transaction: string }>,
    searchParams: Promise<{data:string }>
}) {

    const {data:search}=use(searchParams)
    const obj:{ TxId:string} = JSON.parse(atob(search));

    const [isLoading, setIsLoading] = React.useState(true);

    const [info,setInfo]=useState({})
    const {transaction} = use(params)

    const [data, setData] = React.useState<blockType[]>();
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 40;
    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

    // 发送请求
    useEffect(() => {
        transactionDetail({id:transaction}).then((res) => {
            // 取出第一条数据的ID值除以size当做总页数
            res.data.data.forEach(item => {
                item.Timestamp = toDate(Number(item.Timestamp))
            })
            setIsLoading(false)
            setData(res.data.data);
            // 处理返回的数据
        }).catch((error) => {
        });
        // transactionDetailHash({hash:obj.TxId}).then((res) => {
        transactionDetailHash({hash:'f86e1375d633d2fe59bd2b734c7b3bd93c3a39582f246c49c2e73e9d99ee160e'}).then((res) => {
            console.log(res)

            setInfo(res.data.data.result)
            // 处理返回的数据
        }).catch((error) => {
        });
    }, [transaction, page]);
    const router = useRouter()

    const renderCell = React.useCallback((user: blockType, columnKey: keyof blockType) => {
        const cellValue = user[columnKey];
        const press=()=>{
            const {BlockHeight,BlockHash,TxNum,Timestamp}=user
            const encoded = btoa(JSON.stringify({BlockHeight,BlockHash,TxNum,Timestamp})); // Base64编码
            router.push(`/block/${user.BlockHeight}?data=${encoded}`);
        }
        const statusColor=user['TxStatusCode']==='SUCCESS'?'success':'danger'
        switch (columnKey) {
            case "BlockHeight":
            case "BlockHash":
                return (
                    <Link onPress={press} isBlock className={'cursor-pointer'}  >
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
                    <Link onPress={press} isBlock className={'cursor-pointer'}  >
                        {cellValue}
                    </Link>
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
        <div className="p-10">
            <p className={'text-2xl font-bold'}>交易详情</p>
            <div className="mt-4">
                <Card>
                    <CardHeader>
                        <h3 className="font-bold">基本信息</h3>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className="flex flex-col gap-3">
                            <div className="flex ">
                                <div className={'font-bold'}>交易哈希</div>
                                <div className={'ml-4'}>{info.tx_id}</div>
                            </div>
                            <div className="flex ">
                                <div className={'font-bold'}>交易数量</div>
                                <div className={'ml-4'}>{obj.TxNum}</div>
                            </div>
                            <div className="flex ">
                                <div className={'font-bold'}>出块时间</div>
                                <div className={'ml-4'}>{obj.Timestamp}</div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="mt-4">
                <Card>
                    <CardHeader>
                        交易列表
                    </CardHeader>
                    <Divider/>
                    <CardBody>

                    </CardBody>
                    <CardFooter className={'flex justify-end'}>

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
