"use client";
import React from "react";
import { BsFillTreeFill } from "react-icons/bs";

export default function ContactCard({status,name,treeID,lastUpdate}:{status:("online"|"offline"),name:string,treeID:string,lastUpdate:string}) {
   
   const statusColor = {
      online:"#38E54D",
      offline:"#FDFF00"
   }
   

   return (
      <div className=" w-full py-2 flex justify-between items-center cursor-pointer hover:opacity-80 border-b border-mirage">
         <div className="flex justify-start items-center gap-2">
            <BsFillTreeFill color={statusColor[status]} />
            <div className="flex flex-col justify-evenly items-start text-white">
               <b className=" capitalize">{name}</b>
               <span className=" opacity-60 text-xs">{treeID}</span>
            </div>
         </div>
         <div>
            <span className=" text-xs opacity-60">{lastUpdate?.toString()}</span>
         </div>
      </div>
   );
}
