import GoogleCaptchaWrapper from '@/components/auth/GoogleCaptchaWrapper';
import LoginForm from '@/components/auth/form/user/login';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Login",
  description: "Sign up / login page",
};
export default function Login() {
  return (
    <GoogleCaptchaWrapper>
      <main className=' flex justify-center items-center h-full flex-col gap-4 relative'>
        <LoginForm />
      </main>
    </GoogleCaptchaWrapper>
  )
}
