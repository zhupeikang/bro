import httpService from "@/lib/http";
import {indexDataType} from "@/hooks/useIndexData";

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

export type commonResponse<T> = {
    list: T,
    total: number
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
    return httpService.get<{ data: commonResponse<blockType[]> }>(API.BLOCK.DETAIL, {params})

}
export const transactionDetail = async (params: { id: string }) => {
    return httpService.get(API.TRANSACTION.DETAIL,{params} )
}
export const transactionDetailHash = async (params: { hash: string }) => {
    return httpService.get(API.TRANSACTION.HASH,{params} )
}
