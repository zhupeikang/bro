'use client'
import React, {useEffect, useState} from "react";
import {Data, NFTLIST} from "@/type";
import {nftList} from "@/api";
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
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
import {SearchIcon} from "@heroui/shared-icons";
import {shortenHash, toDate} from "@/lib/function";
import {CopyableText} from "@/componments/CopyableText";
import {useRouter} from "next/navigation";


type keysTYpe={
    name:string,
     id:string
     contract_id:string
     tx_id:string
     ow:string
     minted_at:number
}

export default function Page() {
    const router = useRouter()

    const [list, setList] = useState<NFTLIST>()
    const [page, setPageAction] = useState(1);
    const [isLoading, setIsLoading] = React.useState(true);
    const loadingState = isLoading || list?.data.length === 0 ? "loading" : "idle";
    const [total,setTotal]=useState(0)
    useEffect(() => {
        nftList({
            page: page,
            size: 10
        }).then(res => {
            setIsLoading(false)
            setList(res.data.data)
            setTotal(res.data.data.last_page)

        })
    }, [page]);
    const renderCell = React.useCallback(
        (user: Data, columnKey: keyof keysTYpe) => {
            let cellValue: string|number;

            switch (columnKey) {
                case "name":
                    cellValue = user.contract.name;
                    break;
                case "id":
                    cellValue = user.token_id;
                    break;
                case "ow":
                    cellValue = user.user_wallet.address;
                    break;
                case "contract_id":
                    cellValue = user.contract.chain_contract_id;
                    break;
                case "tx_id":
                    cellValue = user.tx_id;
                    break;
                case "minted_at":
                    cellValue = user.minted_at;
                    break;
                default:
                    cellValue = "";
            }



            switch (columnKey) {
                case "name":
                    return <>
                        <Link isBlock href={`/nft/${user.token_id}`}>{cellValue}</Link>
                    </>;
                case 'id':
                    return <div className={'flex items-center'}>
                        <Link isBlock href={`/nft/${user.token_id}`}>{shortenHash(cellValue)}</Link>
                        <CopyableText text={cellValue}></CopyableText>
                    </div>;
                case "contract_id":
                    return <div className={'flex items-center'}>
                        <Link isBlock href={`/contract/${cellValue}`}>{shortenHash(cellValue)}</Link>
                        <CopyableText text={cellValue}></CopyableText>
                    </div>;
                case "ow":
                    return <div className={'flex items-center'}>
                        <Link isBlock href={`/account/${cellValue}`}>{cellValue}</Link>
                        <CopyableText text={cellValue}></CopyableText>
                    </div>;
                case 'tx_id':
                    return <div className={'flex items-center'}>
                        <Link isBlock href={`/transaction/${cellValue}`}>{shortenHash(cellValue)}</Link>
                        <CopyableText text={cellValue}></CopyableText>
                    </div>;
                case "minted_at":
                    return (
                        <>
                            {toDate(typeof cellValue === "number" ? cellValue :Number(cellValue))}
                        </>
                    );

                default:
                    return cellValue;
            }
        },
        []
    );

    const [value,setvalue]=useState('')

    const keyUp=()=>{
        router.push("/nft/"+value);
    }


    return (

        <div className={'pt-6 px-4'}>
            <Card>
                <CardHeader>
                    <div className={'flex w-full gap- justify-between'}>
                        <div className={'font-bold'}>
                            NFT总数: <span className={'text-2xl'}> {list?.total} </span>
                        </div>
                        <Input
                            classNames={{
                                base: "max-w-[40rem] ",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            onValueChange={setvalue}
                            value={value}
                            placeholder="请输入hash进行搜索"
                            size="sm"
                            endContent={<SearchIcon onClick={keyUp} className={'cursor-pointer'}/>}
                            type="search"
                        />
                    </div>
                </CardHeader>
                <Divider></Divider>
                <CardBody>
                    <Table
                        isStriped
                        isHeaderSticky
                        bottomContent={
                            <div className="flex w-full justify-end">
                                <Pagination
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={total}
                                    onChange={(page) => setPageAction(page)}
                                />
                            </div>
                        }
                    >
                        <TableHeader>
                            <TableColumn key="name">NFT名称</TableColumn>
                            <TableColumn key="id">NFT ID</TableColumn>
                            <TableColumn key="contract_id">合约ID</TableColumn>
                            <TableColumn key="tx_id">交易hash</TableColumn>
                            <TableColumn key="ow">拥有者</TableColumn>
                            <TableColumn key="minted_at" >
                                创建时间
                            </TableColumn>
                        </TableHeader>
                        <TableBody
                            items={list?.data?? []}
                            loadingContent={<Spinner/>}
                            loadingState={loadingState}
                            isLoading={isLoading}
                        >
                            {(item) => (
                                <TableRow key={item?.token_id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof keysTYpe)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
