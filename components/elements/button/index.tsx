"use client";

import { ReactNode } from "react";
import { FaCircleNotch } from "react-icons/fa6";

interface ButtonInterface {
   onclick?: Function;
   text?: ReactNode | string;
   submit?: boolean;
   className?: string;
   parentClassName?:string
   loading?:boolean
   type?:("Text"|"Primary")
}

export default function Button(props: ButtonInterface) {
   return (
      <div className={`${props.parentClassName} max-w-80`}>
         <button
            type={props.submit ? "submit" : "button"}
            disabled={props.loading ? true:false}
            onClick={() => props.onclick?.()}
            className={`${props.loading&& "animate-pulse"} ${props.type !== "Text" &&  " bg-mistBlue py-2 px-4"} text-white relative flex justify-center items-center gap-2  rounded cursor-pointer hover:opacity-90 transition-opacity text-xs tablet:text-base disabled:opacity-80 disabled:cursor-wait ${props.className}`}
         >
            {props.loading && <FaCircleNotch  className=" absolute top-1 left-1 text-white w-2 h-2 animate-spin"/>}
            {props.text}
         </button>
      </div>
   );
}
