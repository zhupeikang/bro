'use client'
import React, {use, useEffect, useState} from "react";
import {accountDetail} from "@/api";
import {AccountDetailType} from "@/type";
import {CopyableText} from "@/componments/CopyableText";
import {Tab, Tabs} from "@heroui/tabs";
import {Card, CardBody} from "@heroui/react";
import {NftTable} from "@/app/account/[address]/dataTable";

export default function Page({params}: { params: Promise<{ address: string }> }) {
    const {address} = use(params)
    const [info,seiInfo]=useState<AccountDetailType>({account: {address:'',created_at:0}, count: 0, list: []})
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 15;
    const [total, setTotal] = React.useState(0);
    useEffect(() => {
        accountDetail({hash: address,page,size:rowsPerPage }).then(res=>{
            seiInfo(res.data.data)
            setTotal(res.data.data.count)
        })
    }, [address, page]);

    const totalPage = React.useMemo(() => {
        return Math.ceil(total / rowsPerPage);
    }, [total]);
    return (
        <div className={'p-10'}>
            <div className={'flex gap-2 items-center'}>
                <h1>地址详情 | </h1>
                {info?.account?.address}
                <CopyableText text={info?.account?.address}></CopyableText>
            </div>
            <div className={'mt-4'}>
                <Tabs aria-label="Options">
                    <Tab key="music" title="NFT">
                        <Card>
                            <CardBody>
                                <NftTable page={page} setPageAction={setPage} total={totalPage}  data={info?.list} isLoading={false}></NftTable>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
