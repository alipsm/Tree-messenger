import React from "react";
import { Metadata } from "next";

import Header from "@/components/ui/header";
import FindUserForm from "@/components/forms/find_user";
import GoogleCaptchaWrapper from "@/components/auth/GoogleCaptchaWrapper";
import page_ico from "@/public/ico/group.png"


export const metadata: Metadata = {
   title: "find user",
   description: "find user with quick id and start communication",
};

export default function page() {
   return (
      <>
         <GoogleCaptchaWrapper>
            <Header src={page_ico} alt="group ico"/>
            <FindUserForm />
         </GoogleCaptchaWrapper>
      </>
   );
}
