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
import React from "react";
export default function Page() {
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
