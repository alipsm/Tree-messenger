"use client";
import useAppStore from "@/hooks/useStore";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function page() {
   const { resetUserData } = useAppStore()
   useEffect(()=>{
      resetUserData()
      localStorage.removeItem("token")
      redirect("/user/login")
   },[])
   return (
      <div className="flex w-full h-full justify-center items-center text-lg text-white">
         <strong>Please wait...</strong>
      </div>
   );
}
