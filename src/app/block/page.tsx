'use client';
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
    getKeyValue,
} from "@heroui/react";
import React, {useEffect} from "react";
import {blockList} from "@/api";
export default function Page() {

    const [data,setData] = React.useState(null);
    // 发送请求
    useEffect(() => {
        blockList({limit:10}).then((res) => {
            setData(res.data.data);
            // 处理返回的数据
            console.log(data)
        }).catch((error) => {});
    }, []);
    const [page, setPage] = React.useState(1);

    const rowsPerPage = 20;

    const pages = Math.ceil(100 / rowsPerPage); // Assuming 100 total items for demonstration

    const isLoading = false; // Replace with actual loading state

    // const loadingState = isLoading || data.length === 0 ? "loading" : "idle";
    const loadingState = 'idle'
    return (
        <div >
            <Card  className={''}>
                <CardHeader>
                    <h3 className=" ">当前区块</h3>
                </CardHeader>
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
    );
}
