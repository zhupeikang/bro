'use client';
import React, {use, useEffect} from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
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
import {useRouter} from "next/navigation";
import {Chip} from "@heroui/chip";
import {blockDetail, transactionListType} from "@/api";
import {toDate} from "@/lib/function";
import {CopyableText} from "@/componments/CopyableText";
import {TransactionTable} from "@/app/transaction/dataTable";

export default function Page({params,searchParams}: {
    params: Promise<{ block: string }>,
    searchParams: Promise<{data:string }>
}) {

    const {data:search}=use(searchParams)
    const obj:{ BlockHash:string,BlockHeight:number,Timestamp:string,TxNum:number} = JSON.parse(atob(search));

    const [isLoading, setIsLoading] = React.useState(true);


    const {block} = use(params)

    const [data, setData] = React.useState<transactionListType[]>([]);
    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);

    const rowsPerPage = 10;
    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
    const totalPage = React.useMemo(() => {
        return Math.ceil(total / rowsPerPage);
    }, [total]);
    // 发送请求
    useEffect(() => {
        blockDetail({size: rowsPerPage, block_height: block as unknown as number,page:page-1}).then((res) => {
            // 取出第一条数据的ID值除以size当做总页数
            res.data.data.list.forEach(item => {
                item.Timestamp =toDate(Number(item.Timestamp))
            })
            setIsLoading(false)
            setData(res.data.data.list);
            setTotal(res.data.data.total);

            // 处理返回的数据
        })
    }, [block, page]);
    const router = useRouter()

    const renderCell = React.useCallback((user: transactionListType, columnKey: keyof transactionListType) => {
        const cellValue = user[columnKey];
        const press=()=>{
            const {TxId}=user
            const encoded = btoa(JSON.stringify({TxId})); // Base64编码
            router.push(`/transaction/${user.Id}?data=${encoded}`);
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
            <p className={'text-2xl font-bold'}>区块详情</p>
            <div className="mt-4">
                <Card>
                    <CardHeader>
                        <h3 className="font-bold">当前区块:<Chip className={'text-lg'} color="success">{block}</Chip></h3>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className="flex flex-col gap-3">
                            <div className="flex ">
                                <div className={'font-bold'}>区块哈希</div>
                                <div className={'ml-4 flex items-center gap-3'}>
                                    {obj.BlockHash}
                                    <CopyableText text={obj.BlockHash}></CopyableText>
                                </div>
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
                        <TransactionTable data={data} isLoading={isLoading}></TransactionTable>
                    </CardBody>
                    <CardFooter className={'flex justify-end'}>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={totalPage}
                            onChange={(page) => setPage(page)}
                        />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
