'use client';
import React, {use} from 'react'
import {
    Card,
    CardBody, CardFooter,
    CardHeader,
    Divider, getKeyValue, Pagination,
    Spinner,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";

export default function Page({params}: {
    params: Promise<{ block: string }>
}) {
    const [page, setPage] = React.useState(1);

    const rowsPerPage = 20;

    const pages = Math.ceil(100 / rowsPerPage); // Assuming 100 total items for demonstration

    const isLoading = false; // Replace with actual loading state
    const data = {
        results: Array.from({ length: rowsPerPage }, (_, index) => ({
            name: `Item ${index + 1 + (page - 1) * rowsPerPage}`,
            height: Math.floor(Math.random() * 1000),
            mass: Math.floor(Math.random() * 1000),
            birth_year: `Year ${Math.floor(Math.random() * 100)}`,
        })),
    }
    const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

    const {block} = use(params)
    return (
        <div className="p-10">
            <p className={'text-2xl font-bold'}>区块详情</p>
            <div className="mt-4">
                <Card>
                    <CardHeader>
                        <h2>区块高度{block}</h2>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className="flex flex-col gap-3">
                            <div className="flex ">
                                <div className={'font-bold'}>区块哈希</div>
                                <div className={'ml-4'}>0x1234567890abcdef</div>
                            </div>
                            <div className="flex ">
                                <div className={'font-bold'}>交易数量</div>
                                <div className={'ml-4'}>0x1234567890abcdef</div>
                            </div>
                            <div className="flex ">
                                <div className={'font-bold'}>出块时间</div>
                                <div className={'ml-4'}>0x1234567890abcdef</div>
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
                        <Table
                            isStriped
                        >
                            <TableHeader>
                                <TableColumn key="name">
                                    区块高度</TableColumn>
                                <TableColumn key="height">区块哈希</TableColumn>
                                <TableColumn key="mass">交易数量</TableColumn>
                                <TableColumn key="birth_year">出块时间</TableColumn>
                            </TableHeader>
                            <TableBody
                                items={data?.results ?? []}
                                loadingContent={<Spinner />}
                                loadingState={loadingState}
                            >
                                {(item) => (
                                    <TableRow key={item?.name}>
                                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                    <CardFooter className={'flex justify-end'}>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
