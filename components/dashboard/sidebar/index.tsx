"use client";
import React, { useState } from "react";
import Banner from "./layouts/banner";
import Switcher from "./layouts/switcher";
import Contacts from "./sections/contacts";
import FadeIn from "@/components/auth/animations/FadeIn";
import Utils from "./sections/utils";

export default function SideBar() {
   
   const [ switchValue, setSwitchValue] = useState("chats")
   console.log("switch" , switchValue)
   return (
      <div className=" relative text-white h-full bg-shark w-full tablet:w-80 px-6 py-4">
        <Switcher onChange={setSwitchValue}/>
      
      <FadeIn key={switchValue}>
         {switchValue === "chats" ?<Contacts/>:<Utils/>}
      </FadeIn>

        <Banner/>
      </div>
   );
}
