"use client";
import React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import TextBox from "@/components/elements/textbox";
import Button from "@/components/elements/button";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import useFormValidation from "@/hooks/useValidation";
import useAppStore from "@/hooks/useStore";

const Header = require("./layouts/header");
const Footer = require("./layouts/footer");

export default function LoginForm() {

   const { executeRecaptcha } = useGoogleReCaptcha();

   const { post } = useApi();
   const { success, error } = useToast();
   const { getValidation } = useFormValidation();
   const {updateUserData} = useAppStore()
   const router = useRouter();

   const mutation = useMutation({
      mutationFn: async (e: React.FormEvent) => {
         e.preventDefault();
         const formData = new FormData(e.target as HTMLFormElement);
         const objFormData = Object.fromEntries(formData.entries());
         if (!executeRecaptcha) {
            console.warn("captcha is not available");
            return Promise.reject("captcha is not available");
         }

         const validationResult = getValidation(objFormData);
         if (!validationResult.status) {
            return Promise.reject(validationResult.message);
         }
         console.log("validation result: ", validationResult);

         try {
            const captchaToken = await executeRecaptcha("inquirySubmit");
            const data: any = await post("/user/login", objFormData, {
               headers: { "captcha-token": captchaToken },
            });
            const token = data?.token;
            if (token) {
               return Promise.resolve(data);
            }
         } catch (error: any) {
            return Promise.reject(error.message);
         }

         return Promise.reject("Sorry..., Try again later");
      },
      onSuccess: async (data: any) => {
         success("Welcome back to the Quicker");
         updateUserData(data)
         localStorage.setItem("token", data.token);
         router.replace("/dashboard");
      },
      onError: async (err: string) => {
         error(err);
      },
      onSettled: async () => {},
   });

   return (
      <div className="flex justify-center items-center h-full flex-col gap-4 relative">
         {Header({ title: "Login", info: "please enter your tree data " })}
         <br />
         <form onSubmit={mutation.mutate} className="flex justify-center items-center flex-col gap-5">
            <TextBox name="username" placeholder="Username" />
            <TextBox name="password" placeholder="Password" />
            <Button text="Login" submit  loading={mutation.isLoading}/>
         </form>
         {Footer({
            text: "I don't hove any tree,",
            link: { text: "SignUp", href: "signup" },
         })}
      </div>
   );
}
