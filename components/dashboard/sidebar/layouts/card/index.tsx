"use client";
import React, { ReactNode } from "react";

export default function SideBarCard({ico,title,subtitle,rightText}:{ico?:ReactNode,title:string,subtitle?:string,rightText?:string}) {
   return (
      <div className=" w-full py-2 flex justify-between items-center cursor-pointer hover:opacity-80 border-b border-mirage">
         <div className="flex justify-start items-center gap-2">
            {ico}
            <div className="flex flex-col justify-evenly items-start text-white">
               <b className=" capitalize">{title}</b>
               <span className=" opacity-60 text-xs">{subtitle}</span>
            </div>
         </div>
         <div>
            <span className=" text-xs opacity-60">{rightText?.toString()}</span>
         </div>
      </div>
   );
}
