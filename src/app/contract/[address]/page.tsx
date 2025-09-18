'use client'
import React, {use, useEffect, useState} from "react";
import {contractDetail} from "@/api";
import {ContractDetailType} from "@/type";

export default function Page({params}: { params: Promise<{ contract: string }> }) {
    const {contract} = use(params)
    const [info,seiInfo]=useState<ContractDetailType>({})
    useEffect(() => {
        contractDetail({hash: contract }).then(res=>{
            seiInfo(res.data.data)
            console.log(info)
        })
    }, [contract]);


    return (
        <>
            {contract}
        </>
    )
}
