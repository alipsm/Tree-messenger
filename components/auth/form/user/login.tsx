"use client"
import TextBox from '@/components/elements/textbox'
import React from 'react'
import UserHeaderForm from './header'
import {  useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Button from '@/components/elements/button'
import axios from 'axios'
import Link from 'next/link'

export default function LoginForm() {

    const { executeRecaptcha } = useGoogleReCaptcha()

    async function handleSubmit() {

        if (!executeRecaptcha) {
            console.log('not available')
            return
        }

        const captchaToken = await executeRecaptcha("inquirySubmit")


        const response = await axios.post("/api/v1/user/login",{ captchaToken },{headers:{
            Accept:"application/json,text/plain, */*",
            "Content-Type":"application/json"
        }})

        console.log('response', response)

}
return (
        <div className='flex justify-center items-center h-full flex-col gap-4 relative'>
            <UserHeaderForm title='Login' info='please enter your tree data ' />
            <br />
            <TextBox placeholder='Tree-Surname' />
            <TextBox placeholder='Password' />
            <Button text='Login' onclick={handleSubmit}/>
            <p className=' text-cadetGrey'>
                I don't hove any tree, <Link href={"signup"} className=' text-mistBlue underline'><strong>SignUp</strong></Link>
            </p>
        </div>
)
}