"use client";
import React from "react";
import Banner from "./banner";
import ContactCard from "./card";
import Switcher from "./switcher";

export default function SideBar() {
   // pure function
   
   return (
      <div className=" relative text-white h-full bg-shark w-full tablet:w-80 px-6 py-4">
        <Switcher/>
        <ContactCard name="parsa" lastUpdate={"12:36"} status="online" treeID="tree-6985" />
        <ContactCard name="melika" lastUpdate={"15:23"} status="online" treeID="tree-7543" />
        <ContactCard name="javad" lastUpdate={"05:48"} status="online" treeID="tree-5689" />
        <ContactCard name="reza" lastUpdate={"23:16"} status="offline" treeID="tree-4523" />
        <Banner/>
      </div>
   );
}
