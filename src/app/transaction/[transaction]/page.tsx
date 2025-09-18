'use client';
import React, {use, useEffect, useState} from 'react'
import {Card, CardBody, CardFooter, CardHeader, Divider} from "@heroui/react";
import {transactionDetailHash} from "@/api";
import {CopyableText} from "@/componments/CopyableText";

export default function Page({params,searchParams}: {
    params: Promise<{ transaction: string }>,
    searchParams: Promise<{data:string }>
}) {

    const {data:search}=use(searchParams)
    const obj:{ TxId:string} = JSON.parse(atob(search));
    const [info,setInfo]=useState({})
    const {transaction} = use(params)
    // 发送请求
    useEffect(() => {
        // transactionDetailHash({hash:obj.TxId}).then((res) => {
        transactionDetailHash({hash:obj.TxId}).then((res) => {
            setInfo(res.data.data.result)
            // 处理返回的数据
        })
    }, [obj.TxId, transaction]);





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
                                <div className={'ml-4 flex items-center gap-3'}>
                                    {obj.TxId}
                                    <CopyableText text={obj.TxId}></CopyableText>
                                </div>
                            </div>
                            <div className="flex ">
                                <div className={'font-bold'}>交易状态</div>
                                <div className={'ml-4'}>{obj.TxNum}</div>
                            </div>
                            <div className="flex ">
                                <div className={'font-bold'}>区块高度</div>
                                <div className={'ml-4'}>{obj.Timestamp}</div>
                            </div>
                            <div className="flex ">
                                <div className={'font-bold'}>时间</div>
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
