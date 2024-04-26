"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Banner from "./layouts/banner";
import Switcher from "./layouts/switcher";
import Contacts from "./sections/contacts";
import FadeIn from "@/components/animations/FadeIn";
import Utils from "./sections/utils";

export default function SideBar() {

   const [switchValue, setSwitchValue] = useState("chats");
   const pathname = usePathname();

   return (
      <div
         className={`tablet:relative text-white h-full bg-shark ${
            pathname === "/dashboard"
               ? " absolute top-0 right-0 w-full"
               : " hidden "
         } tablet:inline-block tablet:w-80 tablet:min-w-80 px-6 py-4`}
      >
         <Switcher onChange={setSwitchValue} />
         <FadeIn refreshKey={switchValue}>
            {switchValue === "chats" ? <Contacts /> : <Utils />}
         </FadeIn>
         <Banner />
      </div>
   );
}
