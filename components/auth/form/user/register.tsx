"use client"
import TextBox from '@/components/elements/textbox'
import React from 'react'
import UserHeaderForm from './header'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Button from '@/components/elements/button'
import axios from 'axios'
import Link from 'next/link'

export default function RegisterForm() {

    const { executeRecaptcha } = useGoogleReCaptcha()

    async function handleSubmit() {

        if (!executeRecaptcha) {
            console.log('not available')
            return
        }

        const captchaToken = await executeRecaptcha("inquirySubmit")


        const response = await axios.post("/api/v1/user/register",{ captchaToken },{headers:{
            Accept:"application/json,text/plain, */*",
            "Content-Type":"application/json"
        }})

        console.log('response', response)

}
return (
        <div className='flex justify-center items-center h-full flex-col gap-4 relative'>
            <UserHeaderForm title='Sign Up' info='please create your tree' />
            <br />
            <TextBox placeholder='Tree-Surname' />
            <TextBox placeholder='Password' />
            <TextBox placeholder='Confirm Password' />
            <Button text='Register' onclick={handleSubmit}/>
            <p className=' text-cadetGrey'>
                I have a tree, <Link href={"login"} className=' text-mistBlue underline'><strong>Login</strong></Link>
            </p>
        </div>
        
)
}