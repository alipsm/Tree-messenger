"use client";
import Link from "next/link";
import React, {
   useEffect,
   useState,
} from "react";

export default function Switcher({ onChange }: { onChange: Function }) {
   const [position, setPosition] = useState("chats");

   useEffect(() => {
      onChange(position);
   }, [position]);

   const getBgPosition =
      position === "chats" ? { left: "4px" } : { right: "4px" };

   return (
      <div className=" relative flex justify-around h-max items-center bg-mirage p-2 rounded-md text-white">
         <Link
            href={""}
            onClick={() => setPosition("chats")}
            className=" relative z-10 cursor-pointer"
         >
            Chats
         </Link>
         <Link
            href={""}
            onClick={() => setPosition("utils")}
            className="relative z-10 cursor-pointer"
         >
            More
         </Link>

         <div
            style={getBgPosition}
            className="absolute bg-shark w-1/2 h-3/4 rounded-md transition-all"
         ></div>
      </div>
   );
}
