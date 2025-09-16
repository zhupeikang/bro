'use client';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
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
import React, {useEffect} from "react";
import {blockDetail, blockType} from "@/api";
import {useIndexData} from "@/hooks/useIndexData";
import {Chip} from "@heroui/chip";
import {useRouter} from "next/navigation";
import {toDate} from "@/lib/function";

export default function Page() {

    const [data, setData] = React.useState<blockType[]>();
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
                item.Timestamp = toDate(Number(item.Timestamp))
            })
            setData(res.data.data.list);
            setTotal(res.data.data.total)
            // 处理返回的数据
        }).catch((error) => {
        });
    }, [ page]);
    const [isLoading, setIsLoading] = React.useState(true);

    const router = useRouter()

    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
    const {block: blockCurrent} = useIndexData()
    const renderCell = React.useCallback((user: blockType, columnKey: keyof blockType) => {
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
        <div>
            <Card className={''}>
                <CardHeader>
                    <h3 className="font-bold">当前区块:<Chip className={'text-lg'} color="success">{blockCurrent}</Chip>
                    </h3>
                </CardHeader>
                <CardBody>
                    <Table
                        isStriped
                        isHeaderSticky
                    >
                        <TableHeader>
                            <TableColumn key="TxId">交易哈希</TableColumn>
                            <TableColumn key="TxType">交易消息类型</TableColumn>
                            <TableColumn key="TxStatusCode">状态</TableColumn>
                            <TableColumn key="BlockHeight">区块高度</TableColumn>
                            <TableColumn key="Timestamp">时间</TableColumn>
                            <TableColumn key="Gas">GAS</TableColumn>
                        </TableHeader>
                        <TableBody
                            items={data ?? []}
                            loadingContent={<Spinner/>}
                            loadingState={loadingState}
                            isLoading={isLoading}
                        >
                            {(item) => (
                                <TableRow key={item?.Id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof blockType)}</TableCell>}
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
                        total={totalPage}
                        onChange={(page) => setPage(page)}
                    />
                </CardFooter>

            </Card>
        </div>
    );
}
