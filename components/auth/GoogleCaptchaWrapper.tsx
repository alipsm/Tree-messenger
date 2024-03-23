"use client"
import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function GoogleCaptchaWrapper({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY || ""}>
                {children}
            </GoogleReCaptchaProvider>
    )
}
