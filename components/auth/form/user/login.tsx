"use client";
import React from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import TextBox from "@/components/elements/textbox";
import Button from "@/components/elements/button";

const Header = require("./layouts/header");
const Footer = require("./layouts/footer");

export default function LoginForm() {
   const { executeRecaptcha } = useGoogleReCaptcha();

   async function handleSubmit() {
      if (!executeRecaptcha) {
         console.log("not available");
         return;
      }

      const captchaToken = await executeRecaptcha("inquirySubmit");

      const response = await axios.post(
         "/api/v1/user/login",
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
         {Header({ title: "Login", info: "please enter your tree data " })}
         <br />
         <div className="flex flex-col gap-5">
            <TextBox placeholder="Tree-Surname" />
            <TextBox placeholder="Password" />
         </div>
         <Button text="Login" onclick={handleSubmit} />
         {Footer({
            text: "I don't hove any tree,",
            link: { text: "SignUp", href: "signup" },
         })}
      </div>
   );
}
