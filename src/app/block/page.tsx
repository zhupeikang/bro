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
import React, {useEffect, useRef} from "react";
import {blockList, blockType} from "@/api";
export default function Page() {

    const [data,setData] = React.useState<blockType[]>();
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 40;
    const [firstItemId, setFirstItemId] = React.useState<number >(0);
    const total = React.useMemo(() => {
        if (!firstItemId) return 0;
        return Math.ceil(firstItemId / rowsPerPage);
    }, [firstItemId, rowsPerPage]);
    console.log("总页数:", total);

    const toDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // 将秒转换为毫秒
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


    // 发送请求
    useEffect(() => {
        blockList({size:rowsPerPage,page:page}).then((res) => {
            // 取出第一条数据的ID值除以size当做总页数
            setIsLoading(false);
            if (!firstItemId) {
                setFirstItemId(res.data.data[0]?.Id || 0); // 只在第一次赋值
            }
            res.data.data.forEach(item=>{
                item.Timestamp = toDate(Number(item.Timestamp))
            })
            setData(res.data.data);
            // 处理返回的数据
        }).catch((error) => {});
    }, [firstItemId, page]);
    const [isLoading, setIsLoading] = React.useState(true);



    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
    // const loadingState = 'idle'
    return (
        <div >
            <Card  className={''}>
                <CardHeader>
                    <h3 className=" ">当前区块{total}</h3>
                </CardHeader>
                <CardBody>
                    <Table
                        isStriped
                    >
                        <TableHeader>
                            <TableColumn key="BlockHeight">
                                区块高度</TableColumn>
                            <TableColumn key="BlockHash">区块哈希</TableColumn>
                            <TableColumn key="TxNum">交易数量</TableColumn>
                            <TableColumn key="Timestamp">出块时间</TableColumn>
                        </TableHeader>
                        <TableBody
                            items={data ?? []}
                            loadingContent={<Spinner />}
                            loadingState={loadingState}
                            isLoading={isLoading}
                        >
                            {(item) => (
                                <TableRow key={item?.Id}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter className={'flex justify-end'}>
                    <Pagination
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={total}
                        onChange={(page) => setPage(page)}
                    />
                </CardFooter>

            </Card>
        </div>
    );
}
