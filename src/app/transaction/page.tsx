'use client';
import {Card, CardBody, CardFooter, CardHeader, Pagination} from "@heroui/react";
import React, {useEffect} from "react";
import {blockDetail, transactionListType} from "@/api";
import {useIndexData} from "@/hooks/useIndexData";
import {Chip} from "@heroui/chip";
import {toDate} from "@/lib/function";
import {TransactionTable} from "@/app/transaction/dataTable";

export default function Page() {

    const [data, setData] = React.useState<transactionListType[]>([]);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 50;
    const [total, setTotal] = React.useState(0);
    const totalPage = React.useMemo(() => {
        return Math.ceil(total / rowsPerPage);

    }, [total]);

    // 发送请求
    useEffect(() => {
        blockDetail({size: rowsPerPage, page: page-1}).then((res) => {
            // 取出第一条数据的ID值除以size当做总页数
            setIsLoading(false);

            res.data.data.list.forEach(item => {
                item.Timestamp =toDate(Number(item.Timestamp))
            })
            setData(res.data.data.list);
            setTotal(res.data.data.total)
            // 处理返回的数据
        })
    }, [ page]);
    const [isLoading, setIsLoading] = React.useState(true);


    const {block: blockCurrent} = useIndexData()

    return (
        <div>
            <Card className={''}>
                <CardHeader>
                    <h3 className="font-bold">当前区块:<Chip className={'text-lg'} color="success">{blockCurrent}</Chip>
                    </h3>
                </CardHeader>
                <CardBody>
                    <TransactionTable data={data} isLoading={isLoading}></TransactionTable>
                </CardBody>
                <CardFooter className={'flex justify-end'}>
                    <Pagination
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
    );
}
