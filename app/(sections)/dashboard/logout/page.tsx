"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
   useEffect(()=>{
       redirect("/user/login")
       return ()=>{
           localStorage.removeItem("token")
       }
   },[])
   return (
      <div className="flex w-full h-full justify-center items-center text-lg text-white">
         <strong>Please wait...</strong>
      </div>
   );
}
