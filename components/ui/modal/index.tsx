"use client";
import React, { ReactNode } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/elements/button";

export default function Modal({
   open,
   children,
   onClose,
}: {
   open: boolean;
   children: ReactNode;
   onClose: Function;
}) {
   return (
      <FadeIn key={`${open}`} duration={0.2}>
         <div
            className={`${
               open ? "opacity-100" : " opacity-0 hidden"
            } bg-mirage bg-opacity-80 transition-all w-full h-full flex justify-center items-center absolute after:content-none after:relative left-0 top-0 z-50`}
         >
            <div className=" border-2 z-30 border-cadetGrey relative flex justify-center flex-col items-center bg-shark bg-opacity-80 w-max h-max py-4 px-6 rounded-xl">
               <Button
                  text={
                     <IoMdArrowRoundBack
                        onClick={() => onClose(false)}
                        className="text-cadetGrey w-6 h-6"
                     />
                  }
                  type="Text"
                  parentClassName=" absolute top-4 left-6"
               />
               {children}
            </div>
         </div>
      </FadeIn>
   );
}
