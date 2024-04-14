"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { LiaParachuteBoxSolid } from "react-icons/lia";
import { MdMessage } from "react-icons/md";

import MoveElement from "@/components/animations/MoveElement";
import Button from "@/components/ui/elements/button";
import TextBox from "@/components/ui/elements/textbox";
import group_ico from "./img/group.png";
import Modal from "@/components/ui/modal";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";

export default function FindUserForm() {
   const [modalData, setModalData] = useState({
      show: false,
      user_data: {
         username: "",
         quick_id: 0o00,
      },
   });
   const { executeRecaptcha } = useGoogleReCaptcha();
   const { error } = useToast();
   const { post } = useApi();

   const mutation = useMutation({
      mutationFn: async (e: React.FormEvent) => {
         e.preventDefault();
         const formData = new FormData(e.target as HTMLFormElement);
         const objFormData = Object.fromEntries(formData.entries());
         if (!executeRecaptcha) {
            console.warn("captcha is not available");
            return Promise.reject("captcha is not available");
         }

         try {
            const captchaToken = await executeRecaptcha("inquirySubmit");
            const data: any = await post("/user/get-user", objFormData, {
               headers: { "captcha-token": captchaToken },
            });

            if (!!data.quick_id) {
               return Promise.resolve(data);
            }
         } catch (error: any) {
            return Promise.reject(error.message);
         }
         return Promise.reject("Please try again later");
      },
      onSuccess: async (data: any) => {
         setModalData({ show: true, user_data: data });
      },
      onError: async (err: string) => {
         error(err);
      },
      onSettled: async () => {},
   });

   return (
      <div className="w-full h-full flex justify-center items-center flex-col gap-4 text-white relative">
         <div className="relative flex justify-center items-center flex-col  -top-24">
            <div className=" flex justify-start flex-col items-start w-max h-max relative z-0">
               <Image src={group_ico} alt="group" className=" w-64 h-64 z-10" />
               <div className="p-[15%] absolute top-0 left-0 w-full h-full">
                  <div
                     style={{ animationDuration: "40s" }}
                     className="  border-4 border-dashed border-white  w-full h-full rounded-full animate-spin"
                  ></div>
               </div>
            </div>
            <p className=" text-lg ">Enter your friend's quick-ID</p>
         </div>
         <form
            onSubmit={mutation.mutate}
            action=""
            className="flex justify-center w flex-col items-center gap-2 text-center"
         >
            <div className=" flex  justify-end items-center relative w-24 gap-1">
               <b className=" text-lg">quick-</b>
               <TextBox
                  placeholder="xxxx"
                  name="quick_id"
                  type="number"
                  maxLength={4}
                  number
                  className=" w-8 text-center min-w-24"
                  removeAutoComplete
                  parentClassName="w-24 "
               />
            </div>
            <Button text="Search" submit loading={mutation.isLoading} />
         </form>
         <Modal
            open={modalData.show}
            onClose={(e: boolean) =>
               setModalData({ show: e, user_data: modalData.user_data })
            }
         >
            <div className=" text-lg">{modalData.user_data.username}</div>
            <br />
            <div className="  relative mb-12 text-white z-20 text-lg py-7 px-28 border-2 border-white rounded-2xl bg-shark">
               <strong>quick-{modalData.user_data.quick_id}</strong>
               <div className=" absolute w-full  left-0 top-16 text-white flex z-10 justify-around items-end h-full pt-4">
                  <Link
                     href={"/dashboard/chat/4586546848"}
                     className=" hover:opacity-80 transition-opacity z-0 relative"
                  >
                     <MoveElement
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col justify-center items-center"
                     >
                        <MdMessage className=" text-cadetGrey w-8 h-8" />
                        <span className=" text-xs">Send Message</span>
                     </MoveElement>
                  </Link>
                  <Link
                     href={"/dashboard/send-post"}
                     className=" hover:opacity-80  transition-opacity"
                  >
                     <MoveElement
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col justify-center items-center"
                     >
                        <LiaParachuteBoxSolid className=" text-cadetGrey w-8 h-8" />
                        <span className=" text-xs">Post Message</span>
                     </MoveElement>
                  </Link>
               </div>
            </div>
            <br />
            <br />
         </Modal>
      </div>
   );
}
