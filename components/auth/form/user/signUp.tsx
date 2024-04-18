"use client";
import React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import Button from "@/components/ui/elements/button";
import TextBox from "@/components/ui/elements/textbox";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import useFormValidation from "@/hooks/useValidation";
import useAppStore from "@/hooks/useStore";
import { encryptText } from "@/utils/encryptText";

const Header = require("./layouts/header");
const Footer = require("./layouts/footer");

export default function RegisterForm() {
   const { post } = useApi();
   const { success, error } = useToast();
   const {getValidation} = useFormValidation()
   const router = useRouter();
   const {updateUserData} = useAppStore()

   const mutation = useMutation({
      mutationFn: async (e: React.FormEvent) => {
         e.preventDefault();
         const formData = new FormData(e.target as HTMLFormElement);
         const objFormData = Object.fromEntries(formData.entries());
         if (!executeRecaptcha) {
            console.warn("captcha is not available");
            return Promise.reject("captcha is not available");
         }

         const validationResult = getValidation(objFormData)
         if (!validationResult.status) {
            return Promise.reject(validationResult.message)
         }

         try {
            let user_password = objFormData.password as string
            objFormData.password = encryptText(user_password)
            delete objFormData["confirm-password"]
            const captchaToken = await executeRecaptcha("inquirySubmit");
            const data: any = await post("/user/signup", objFormData , {
               headers: { "captcha-token": captchaToken },
            });
            const token = data?.token;
            if (token) {
               return Promise.resolve(data);
            }
         } catch (error:any) {
            return Promise.reject(error.message)
         }

         return Promise.reject("Sorry..., Try again later");
      },
      onSuccess: async (data: any) => {
         success("Welcome to the Quicker");
         updateUserData(data)
         localStorage.setItem("token", data.token);
         router.replace("/dashboard");
      },
      onError: async (err: string) => {
         error(err);
      },
      onSettled: async () => {},
   });

   const { executeRecaptcha } = useGoogleReCaptcha();

   return (
      <div className="flex justify-center items-center h-full flex-col gap-4 relative">
         {Header({ title: "Sign Up", info: "please create your tree" })}
         <br />
         <form
            onSubmit={mutation.mutate}
            className="flex justify-center items-center flex-col gap-5"
         >
            <TextBox name="username" placeholder="Username" />
            <TextBox name="password" placeholder="Password" />
            <TextBox name="confirm-password" placeholder="Confirm Password" />
            <Button text="Register" submit loading={mutation.isLoading} />
         </form>
         {Footer({
            text: "I have a tree,",
            link: { text: "Login", href: "login" },
         })}
      </div>
   );
}
