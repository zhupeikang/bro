import httpService from "@/lib/http";

const API={
    BLOCK:{
        LIST: 'explorer/v1/block_list'
    }
}


export const blockList = async (params: { limit:number }) => {
    return httpService.get<{ data: never[] }>(API.BLOCK.LIST, {params})
}
