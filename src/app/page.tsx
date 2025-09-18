'use client';
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Link} from "@heroui/react";
import {ArrowRightLeft, Gem, HardDrive, Wallet} from 'lucide-react';
import React, {useEffect} from "react";
import {useIndexData} from "@/hooks/useIndexData";
import {BlockTable} from "@/app/block/dataTable";
import {blockDetail, blockList, blockType, transactionListType} from "@/api";
import {toDate} from "@/lib/function";
import {TransactionTable} from "@/app/transaction/dataTable";

export default function Home() {
    const {trans_count,nft_count,block,user_count}=useIndexData()

    const [dataTable, setData] = React.useState<blockType[]>([]);
    const [dataTable2, setData2] = React.useState<transactionListType[]>([]);
    useEffect(() => {
        blockList({size: 5,page:0}).then((res) => {
            // 取出第一条数据的ID值除以size当做总页数
            setIsLoading(false);
            res.data.data.list.forEach(item => {
                item.Timestamp = toDate(Number(item.Timestamp))
            })
            setData(res.data.data.list);
            // 处理返回的数据
        })
        blockDetail({size: 5, page: 0}).then((res) => {
            // 取出第一条数据的ID值除以size当做总页数
            setIsLoading2(false);

            res.data.data.list.forEach(item => {
                item.Timestamp =toDate(Number(item.Timestamp))
            })
            setData2(res.data.data.list);
            // 处理返回的数据
        })
    }, []);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isLoading2, setIsLoading2] = React.useState(true);

    return (
            <div className="min-h-screen flex p-10 flex-col   bg-gray-100">
                <Card className="">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                            <p className=" ">恺英联盟链网数据统计</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="flex gap-3 mb-5">
                            <div className="flex-1 flex  justify-between bg-white p-2 rounded-lg shadow">
                                <div>
                                    <p className="text-gray-500">交易总数</p>
                                    <p className="text-2xl font-bold">{trans_count}</p>
                                </div>
                                <ArrowRightLeft></ArrowRightLeft>

                            </div>
                            <div className="flex-1 flex  justify-between bg-white p-2 rounded-lg shadow">
                                <div>
                                    <p className="text-gray-500">NFT总数</p>
                                    <p className="text-2xl font-bold">{nft_count}</p>
                                </div>
                                <Gem></Gem>

                            </div>
                            <div className="flex-1 flex  justify-between bg-white p-2 rounded-lg shadow">
                                <div>
                                    <p className="text-gray-500">区块高度</p>
                                    <p className="text-2xl font-bold">{block}</p>
                                </div>
                                <HardDrive></HardDrive>

                            </div>
                            <div className="flex-1 flex  justify-between bg-white p-2 rounded-lg shadow">
                                <div>
                                    <p className="text-gray-500">链账户地址数</p>
                                    <p className="text-2xl font-bold">{user_count}</p>
                                </div>
                                <Wallet></Wallet>

                            </div>
                        </div>
                        <Divider className="mb-5"/>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <p className="text-gray-500 mb-2">最新区块</p>
                                </CardHeader>
                                <Divider className="mb-5"/>

                                <CardBody>
                                    <BlockTable data={dataTable} isLoading={isLoading} ></BlockTable>

                                </CardBody>
                                <CardFooter className={'justify-end'}>
                                    <Button variant="flat" color="primary" className="">
                                        <Link href="/block">查看更多区块</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <p className="text-gray-500 mb-2">最新交易</p>
                                </CardHeader>
                                <Divider className="mb-5"/>
                                <CardBody>



                                    <TransactionTable data={dataTable2} isLoading={isLoading2} ></TransactionTable>

                                </CardBody>
                                <CardFooter className={'justify-end'}>
                                    <Button variant={'flat'} color="secondary" className="">
                                        <Link href="/block">查看全部交易</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>


                    </CardBody>
                </Card>
            </div>

    );
}

