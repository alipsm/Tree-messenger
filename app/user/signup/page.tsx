import React from "react";
import { Metadata } from "next";

import GoogleCaptchaWrapper from "@/components/auth/GoogleCaptchaWrapper";
import RegisterForm from "@/components/auth/form/user/signUp";

export const metadata: Metadata = {
   title: "Sign up",
};

export default function Register() {
   return (
      <GoogleCaptchaWrapper>
         <main className=" flex justify-center items-center h-full flex-col gap-4 relative">
            <RegisterForm />
         </main>
      </GoogleCaptchaWrapper>
   );
}
