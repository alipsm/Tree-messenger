import React from "react";
import { Metadata } from "next";

import FindUserForm from "@/components/forms/find_user";
import GoogleCaptchaWrapper from "@/components/auth/GoogleCaptchaWrapper";

export const metadata: Metadata = {
   title: "find user",
   description: "find user with quick id and start communication",
};

export default function page() {
   return (
      <>
         <GoogleCaptchaWrapper>
            <FindUserForm />
         </GoogleCaptchaWrapper>
      </>
   );
}
