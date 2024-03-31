"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import tree_log from "@/public/static/img/tree-logo.png";
import FadeIn from "@/components/auth/animations/FadeIn";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";

export default function NavBar() {

   const GetPathName = usePathname();
   const IsDashboard = () => {
      const subdirectory = GetPathName?.split("/").includes("dashboard");
      return subdirectory;
   };

   const router = useRouter();
   useEffect(() => {
      const isTokenExist = true;
      if (isTokenExist && !IsDashboard()) router.push("/dashboard");
   }, []);

   return (
      <nav
         className={`px-6 tablet:px-10 flex ${
            IsDashboard() ? " justify-between" : " justify-center"
         } items-center w-full bg-shark h-10 tablet:h-14 text-white border-b border-mirage`}
      >
         <FadeIn className="flex justify-center items-center gap-2">
            <Image src={tree_log} className="w-4 tablet:w-5" alt="tree logo" />
            <h1 className=" text-xs tablet:text-lg">
               <strong>Tree-Messanger</strong>
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
