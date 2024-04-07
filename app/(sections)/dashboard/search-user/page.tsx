import React from "react";

import FindUserForm from "@/components/forms/find_user";
import GoogleCaptchaWrapper from "@/components/auth/GoogleCaptchaWrapper";

export default function page() {
   return (
      <>
         <GoogleCaptchaWrapper>
            <FindUserForm />
         </GoogleCaptchaWrapper>
      </>
   );
}
