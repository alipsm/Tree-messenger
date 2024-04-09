import React from "react";
import { Metadata } from "next";

import SettingPage from "@/components/pages/settings";
import GoogleCaptchaWrapper from "@/components/auth/GoogleCaptchaWrapper";

export const metadata: Metadata = {
   title: "settings",
   description: "edit user profile",
};

export default function page() {

   return (
      <GoogleCaptchaWrapper>
         <SettingPage />
      </GoogleCaptchaWrapper>
   );
}
