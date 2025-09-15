import httpService from "@/lib/http";

const API={
    BLOCK:{
        LIST: 'explorer/v1/block_list'
    },
    INDEX:{
        DATA:'explorer/v1/index'
    }
}

export type blockType = {
    Id:number,
    ChainId:string
    BlockHash:string
    PreBlockHash:string
    BlockHeight:number
    Timestamp:string
    DagHash:string
    RwSetHash:string
    TxRootHash:string
    TxNum:number
    OrgId:string
    OrgName:string
    NodeName:string
}
export const blockList = async (params: { size:number,page:number }) => {
    return httpService.get<{ data: blockType[] }>(API.BLOCK.LIST, {params})
}

export const getIndexData = async () => {
    return httpService.get<{ data: object }>(API.INDEX.DATA)
}
