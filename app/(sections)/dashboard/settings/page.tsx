import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { MdOpenInNew } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { FaHeart } from "react-icons/fa6";

import ListItems from "@/components/ui/list";
import Switcher from "@/components/elements/switcher";

export const metadata: Metadata = {
   title: "settings",
   description: "edit user profile",
};

export default function page() {
   const listData = {
      account_details: [
         <>
            <span className=" text-white ">stooormix</span>
            <HiPencilAlt className=" text-shark w-5 h-5 bg-white p-1 box-content  rounded-full cursor-pointer hover:opacity-80 transition-opacity" />
         </>,
         <>
            <span className=" text-white ">Password: ********</span>
            <HiPencilAlt className=" text-shark w-5 h-5 bg-white p-1 box-content  rounded-full cursor-pointer hover:opacity-80 transition-opacity" />
         </>,
         <p className=" text-center w-full">
            <Link
               href={"/dashboard/logout"}
               className=" text-center  text-red hover:opacity-80 transition-opacity"
            >
               Log out
            </Link>
         </p>,
      ],
      settings: [
         <>
            <span>Language</span>
            <Switcher items={["EN", "FA"]} defaultItem={"EN"} />
         </>,
         <>
            <span>Theme</span>
            <Switcher
               items={["Dark", "System", "Light"]}
               defaultItem={"System"}
            />
         </>,
      ],
      sensitive_area: [
         <div className=" w-full text-center">
            <span className=" text-cadetGrey cursor-pointer hover:opacity-80">
               Change Quick ID
            </span>
         </div>,
         <p className=" text-red text-center w-full">Delete Account</p>,
      ],
   };

   return (
      <div className="flex w-full h-full justify-start flex-col items-center py-10 px-[20%] text-white overflow-y-auto">
         <h1 className=" text-2xl text-start w-full">
            <b>Account</b>
         </h1>
         <br />
         <ListItems
            title="Account Details"
            node={listData.account_details.map((item) => item)}
         />
         <br />
         <br />
         <ListItems
            title="Setting"
            node={listData.settings.map((item) => item)}
         />
         <br />
         <br />
         <ListItems
            title="Sensitive Area"
            node={listData.sensitive_area.map((item) => item)}
         />
         <br />
         <br />
         <br />
         <hr className="w-full border-shark" />
         <br />
         <p className=" text-left w-full text-xs  opacity-80">
            Thank you for your support and use of this messenger.{" "}
            <FaHeart className=" inline-block text-red" />
         </p>
         <a
            href="https://github.com/alipsm"
            target="_blank"
            className=" text-left w-full text-xs text-cadetGrey underline py-1"
         >
            About Creator <MdOpenInNew className=" inline-block w-3 h-3" />
         </a>
      </div>
   );
}
