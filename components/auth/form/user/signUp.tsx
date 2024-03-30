"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import UserHeaderForm from "./header";
import Button from "@/components/elements/button";
import TextBox from "@/components/elements/textbox";

export default function RegisterForm() {
   const { executeRecaptcha } = useGoogleReCaptcha();

   async function handleSubmit() {
      if (!executeRecaptcha) {
         console.log("not available");
         return;
      }

      const captchaToken = await executeRecaptcha("inquirySubmit");

      const response = await axios.post(
         "/api/v1/user/register",
         { captchaToken },
         {
            headers: {
               Accept: "application/json,text/plain, */*",
               "Content-Type": "application/json",
            },
         }
      );

      console.log("response", response);
   }
   return (
      <div className="flex justify-center items-center h-full flex-col gap-4 relative">
         <UserHeaderForm title="Sign Up" info="please create your tree" />
         <br />
         <div className="flex flex-col gap-5">
            <TextBox placeholder="Tree-Surname" />
            <TextBox placeholder="Password" />
            <TextBox placeholder="Confirm Password" />
         </div>
         <Button text="Register" onclick={handleSubmit} />
         <p className=" text-cadetGrey">
            I have a tree,{" "}
            <Link href={"login"} className="text-mistBlue underline hover:opacity-80 transition-opacity">
               <strong>Login</strong>
            </Link>
         </p>
      </div>
   );
}
