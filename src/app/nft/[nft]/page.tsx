'use client'
import React, {use, useEffect, useState} from "react";
import {nftDetail} from "@/api";
import {AssetData} from "@/type";
import {Card, CardBody, CardHeader, Divider, Image, Link} from "@heroui/react";
import {Chip} from "@heroui/chip";
import {CopyableText} from "@/componments/CopyableText";
import NotFound from "@/componments/NotFound";

export default function Page({params}: { params: Promise<{ nft: string }> }) {
    const {nft} = use(params)
    const [info, seiInfo] = useState<AssetData | undefined>()
    const [error, setError] = useState(false)
    useEffect(() => {
        nftDetail({hash: nft}).then(res => {
            seiInfo(res.data.data)
        }).catch(() => {
            setError(true)
        })
    }, [nft]);
    if (error) {
        return < div className={' w-full  h-screen flex justify-center items-center'}>
            <NotFound></NotFound>
        </div>
    }

    return (
        <>
            <div className={'sm:p-10 p-4'}>
                <div className={'px-4'}>
                    <h1 className={'font-bold'}>NFT详情</h1>
                </div>
                <div className={'pt-4'}>
                    <Card>
                        <CardHeader>
                            <div className={'flex items-end gap-2'}>
                                <Image width={80} radius={'full'} alt={'NFT'} src={info?.contract.image_url}></Image>
                                <div className={'flex flex-col gap-2'}>
                                    {info?.nft.name}#{info?.nft.no}
                                    <Chip radius={'sm'}>NFT</Chip>
                                </div>
                            </div>
                        </CardHeader>
                        <Divider/>

                        <CardBody  >
                            <div className={'flex  flex-col gap-2'}>
                                <div className="flex items-center">
                                    <div className=" w-50 font-bold text-left mr-4">NFT ID</div>
                                    <div className="flex-1 flex items-center gap-2 ">
                                        {info?.nft.tokenId}
                                        <CopyableText text={info?.nft.tokenId}></CopyableText>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-50 font-bold text-left mr-4">发行商</div>
                                    <div className="flex-1 ">{info?.contract.publisher_address}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-50 font-bold text-left mr-4">作者</div>
                                    <div className="flex-1 ">{info?.nft.author}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-50 font-bold text-left mr-4">拥有者</div>
                                    <div className="flex-1 flex items-center gap-2 ">
                                        <Link href={'/account/' + info?.nft.userAddress} underline={'hover'}>
                                            {info?.nft.userAddress}
                                        </Link>
                                        <CopyableText text={info?.nft.userAddress}></CopyableText>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-50 font-bold text-left mr-4">创建哈希</div>
                                    <div className="flex-1 ">{info?.nft.txId}</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-50 font-bold text-left mr-4">链上数据</div>
                                    <div className="flex-1 ">{info?.nft.name}#{info?.nft.no}</div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                </div>
            </div>
        </>
    )
}
