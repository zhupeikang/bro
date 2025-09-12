'use client';
import {useEffect} from "react";
import httpService from "@/lib/http";

export default function Page() {


    useEffect(() => {
            httpService.get<{data:object}>('v2/home/index').then(r=>{
                console.log(r.data.data);
            })
    }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Login Page</h1>
        <p className="text-lg">This is the login page.</p>
      </div>
    </div>
  );
}
