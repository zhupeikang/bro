'use client';
import {Card, CardHeader, Divider, Link, CardBody, CardFooter, Button} from "@heroui/react";
import {ArrowRightLeft, Gem, Wallet, HardDrive} from 'lucide-react';

export default function Home() {
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
                                <p className="text-2xl font-bold">100</p>
                            </div>
                            <ArrowRightLeft></ArrowRightLeft>

                        </div>
                        <div className="flex-1 flex  justify-between bg-white p-2 rounded-lg shadow">
                            <div>
                                <p className="text-gray-500">NFT总数</p>
                                <p className="text-2xl font-bold">100</p>
                            </div>
                            <Gem></Gem>

                        </div>
                        <div className="flex-1 flex  justify-between bg-white p-2 rounded-lg shadow">
                            <div>
                                <p className="text-gray-500">区块高度</p>
                                <p className="text-2xl font-bold">100</p>
                            </div>
                            <HardDrive></HardDrive>

                        </div>
                        <div className="flex-1 flex  justify-between bg-white p-2 rounded-lg shadow">
                            <div>
                                <p className="text-gray-500">链账户地址数</p>
                                <p className="text-2xl font-bold">100</p>
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
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span>交易哈希1</span>
                                        <Link href="/transaction/1"
                                              className="text-blue-500 hover:underline">查看详情</Link>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>交易哈希2</span>
                                        <Link href="/transaction/2"
                                              className="text-blue-500 hover:underline">查看详情</Link>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>交易哈希3</span>
                                        <Link href="/transaction/3"
                                              className="text-blue-500 hover:underline">查看详情</Link>
                                    </li>
                                </ul>
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
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span>交易哈希1</span>
                                        <Link href="/transaction/1"
                                              className="text-blue-500 hover:underline">查看详情</Link>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>交易哈希2</span>
                                        <Link href="/transaction/2"
                                              className="text-blue-500 hover:underline">查看详情</Link>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>交易哈希3</span>
                                        <Link href="/transaction/3"
                                              className="text-blue-500 hover:underline">查看详情</Link>
                                    </li>
                                </ul>
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

