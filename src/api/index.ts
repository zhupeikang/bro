import httpService from "@/lib/http";
import {indexDataType} from "@/hooks/useIndexData";
import {AccountDetailType, ContractDetailType, TxDetailType} from "@/type";

const API = {
    BLOCK: {
        LIST: 'explorer/v1/block_list',
        DETAIL: 'explorer/v1/tx_list'
    },
    INDEX: {
        DATA: 'explorer/v1/index'
    },
    TRANSACTION: {
        DETAIL: 'explorer/v1/tx_detail',
        HASH: 'explorer/v1/hash'
    },
    ACCOUNT:{
        DETAIL:'explorer/v1/account'
    },
    CONTRACT:{
        DETAIL:'explorer/v1/contract'
    }
}


export type blockType = {
    Id: number,
    ChainId: string
    BlockHash: string
    PreBlockHash: string
    BlockHeight: number
    Timestamp: string
    DagHash: string
    RwSetHash: string
    TxRootHash: string
    TxNum: number
    OrgId: string
    OrgName: string
    NodeName: string
}


export type transactionListType = {
    Id: number,
    ChainId: string
    BlockHash: string
    BlockHeight: number
    Timestamp: string
    OrgId: string
    OrgName: string
    UserName: string
    TxId:string,
    TxStatusCode:string,
    TxType:string
    Gas:number
    ContractName:string
    ContractMethod:string
}


export type ContractParameters = {
    key: string
    value: string
}



export type commonResponse<T> = {
    list: T,
    total: number
}

export type SyResponse<T> = {
    code: number,
    type: string,
    msg:string,
    data:{
        code:number,
        message:string,
        result:T,
    }
}




export const blockList = async (params: { size: number, page: number }) => {
    return httpService.get<{ data: commonResponse<blockType[]> }>(API.BLOCK.LIST, {params})
}

export const getIndexData = async () => {
    return httpService.get<{ data: indexDataType }>(API.INDEX.DATA)
}
export const blockDetail = async (params: {
    size: number,
    block_height?: number,
    page?: number
}) => {
    return httpService.get<{ data: commonResponse<transactionListType[]> }>(API.BLOCK.DETAIL, {params})
}
export const transactionDetail = async (params: { id: string }) => {
    return httpService.get(API.TRANSACTION.DETAIL, {params})
}
export const transactionDetailHash = async (params: { hash: string }) => {
    return httpService.get<SyResponse<TxDetailType>>(API.TRANSACTION.HASH, {params})
}
export const accountDetail = async (params: {
    size?: number,
    hash: string,
    page?: number
}) => {
    return httpService.get<{ data: AccountDetailType }>(API.ACCOUNT.DETAIL, {params})
}
export const contractDetail = async (params: {
    hash: string,
}) => {
    return httpService.get<{ data: ContractDetailType }>(API.ACCOUNT.DETAIL, {params})
}
