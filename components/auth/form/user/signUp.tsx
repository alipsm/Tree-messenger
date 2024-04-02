"use client";
import React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import Button from "@/components/elements/button";
import TextBox from "@/components/elements/textbox";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";

const Header = require("./layouts/header");
const Footer = require("./layouts/footer");

export default function RegisterForm() {
   const { post } = useApi();
   const router = useRouter();

   const { executeRecaptcha } = useGoogleReCaptcha();

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const objFormData = Object.fromEntries(formData.entries());

      if (!executeRecaptcha) {
         console.warn("captcha is not available");
         return;
      }

      try {
         const captchaToken = await executeRecaptcha("inquirySubmit");
         const data: any = await post("/user/signup", objFormData, {
            headers: { "captcha-token": captchaToken },
         });
         const token = data?.token;
         if (token) {
            localStorage.setItem("token", token);
            router.replace("/dashboard");
         }
      } catch (error) {
         console.error(error);
      }
   }
   return (
      <div className="flex justify-center items-center h-full flex-col gap-4 relative">
         {Header({ title: "Sign Up", info: "please create your tree" })}
         <br />
         <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-5"
         >
            <TextBox name="username" placeholder="Tree-Surname" />
            <TextBox name="password" placeholder="Password" />
            <TextBox name="configmPassword" placeholder="Confirm Password" />
            <Button text="Register" submit />
         </form>
         {Footer({
            text: "I have a tree,",
            link: { text: "Login", href: "login" },
         })}
      </div>
   );
}
