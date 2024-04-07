"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSetting } from "react-icons/ai";
import { GiQuickSlash } from "react-icons/gi";
import Link from "next/link";

import FadeIn from "@/components/animations/FadeIn";

export default function NavBar() {
   const GetPathName = usePathname();
   const router = useRouter();

   const IsDashboard = () => {
      const subdirectory = GetPathName?.split("/").includes("dashboard");
      return subdirectory;
   };

   useEffect(() => {
      const isTokenExist = localStorage.getItem("token");
      if (!isTokenExist) {
         router.push("/user/login");
      }
   }, []);

   return (
      <nav
         className={`px-6 tablet:px-10 flex ${
            IsDashboard() ? " justify-between" : " justify-center"
         } items-center w-full bg-shark h-10 tablet:h-14 text-white border-b border-mirage`}
      >
         <FadeIn className="flex justify-center items-center gap-2">
            <GiQuickSlash
               className=" relative cursor-pointer w-6 h-6  text-mistBlue"
               width={20}
               height={20}
            />
            <h1 className=" text-xs tablet:text-lg">
               <strong>Quicker-Messenger</strong>
            </h1>
         </FadeIn>
         {IsDashboard() && (
            <Link href={"/dashboard/settings"}>
               <AiOutlineSetting
                  className=" relative cursor-pointer w-6 h-6 text-white hover:rotate-45 transition-transform"
                  width={20}
                  height={20}
               />
            </Link>
         )}
      </nav>
   );
}
