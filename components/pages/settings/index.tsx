"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { MdOpenInNew } from "react-icons/md";
import { useMutation } from "react-query";

import UpdatePasswordModal from "@/components/auth/modal/user/updatePassword";
import UpdateUsernameModal from "@/components/auth/modal/user/updateUsername";
import Button from "@/components/ui/elements/button";
import Switcher from "@/components/ui/elements/switcher";
import ListItems from "@/components/ui/list";
import useApi from "@/hooks/useApi";
import useAppStore from "@/hooks/useStore";
import useToast from "@/hooks/useToast";
import DeleteUserModal from "@/components/auth/modal/user/deleteUser";
import ChangeQuickIdModal from "@/components/auth/modal/user/changeQuickId";

export default function SettingPage() {

   const [modalsData, setModalsData] = useState({
      updateUsername: false,
      updatePassword: false,
      changeQuickId: false,
      deleteAccound: false,
   })

   const { user } = useAppStore()
   const { error, success } = useToast()
   const { delete_ } = useApi()

   const router = useRouter()

   const mutation = useMutation({
      mutationFn: async () => {
         try {
            const data: any = await delete_(`/user/delete/${user.username}`);
            if (data?.success) {
               return Promise.resolve(data);
            }
         } catch (error: any) {
            return Promise.reject(error.message);
         }

         return Promise.reject("Sorry..., Try again later");
      },
      onSuccess: async (data: any) => {
         success(data.message)
         router.replace("/user/login")
      },
      onError: async (e: Error) => {
         error(e.message)
      },
   });


   const listData = {
      account_details: [
         <>
            <span className=" text-white ">{user.username}</span>
            <HiPencilAlt onClick={() => setModalsData({ ...modalsData, updateUsername: true })} className=" text-shark w-5 h-5 bg-white p-1 box-content  rounded-full cursor-pointer hover:opacity-80 transition-opacity" />
         </>,
         <>
            <span className=" text-white ">Password: ********</span>
            <HiPencilAlt onClick={() => setModalsData({ ...modalsData, updatePassword: true })} className=" text-shark w-5 h-5 bg-white p-1 box-content  rounded-full cursor-pointer hover:opacity-80 transition-opacity" />
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
            <Button text="Change Quick ID" onclick={() => setModalsData({ ...modalsData, changeQuickId: true })} type="Text" parentClassName="m-auto" className=" text-cadetGrey"/>
         ,
         <Button text="Delete Account" onclick={() => setModalsData({ ...modalsData, deleteAccound: true })} parentClassName="m-auto" className=" text-red text-center" type="Text" />,
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
            About Messenger <MdOpenInNew className=" inline-block w-3 h-3" />
         </a>
         <a
            href="https://github.com/alipsm"
            target="_blank"
            className=" text-left w-full text-xs text-cadetGrey underline py-1"
         >
            About Creator <MdOpenInNew className=" inline-block w-3 h-3" />
         </a>


         {/* Auth modals for update username and password */}
         {modalsData.updateUsername && <UpdateUsernameModal onClose={(e: boolean) => setModalsData({ ...modalsData, updateUsername: e })} />}
         {modalsData.updatePassword && <UpdatePasswordModal onClose={(e: boolean) => setModalsData({ ...modalsData, updatePassword: e })} />}
         {modalsData.deleteAccound && <DeleteUserModal onClose={(e: boolean) => setModalsData({ ...modalsData, deleteAccound: e })} />}
         {modalsData.changeQuickId && <ChangeQuickIdModal onClose={(e: boolean) => setModalsData({ ...modalsData, changeQuickId: e })} />}
      </div>
   );
}
