"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import FadeIn from "@/components/auth/animations/FadeIn";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import { GiQuickSlash } from "react-icons/gi";

export default function NavBar() {
   const GetPathName = usePathname();
   const IsDashboard = () => {
      const subdirectory = GetPathName?.split("/").includes("dashboard");
      return subdirectory;
   };

   const router = useRouter();
   const isTokenExist = true;
   useEffect(() => {
      if (isTokenExist && !IsDashboard()) router.push("/dashboard");
      else if (!isTokenExist) router.push("/user/login");
   }, []);

   return (
      <nav
         className={`px-6 tablet:px-10 flex ${
            IsDashboard() ? " justify-between" : " justify-center"
         } items-center w-full bg-shark h-10 tablet:h-14 text-white border-b border-mirage`}
      >
         <FadeIn className="flex justify-center items-center gap-2">
            <GiQuickSlash
               className=" relative cursor-pointer w-6 h-6  text-mistBlue hover:rotate-45 transition-transform"
               width={20}
               height={20}
            />
            <h1 className=" text-xs tablet:text-lg">
               <strong>Quicker-Messanger</strong>
            </h1>
         </FadeIn>
         {IsDashboard() && (
            <AiOutlineSetting
               className=" relative cursor-pointer w-6 h-6 text-white hover:rotate-45 transition-transform"
               width={20}
               height={20}
            />
         )}
      </nav>
   );
}
