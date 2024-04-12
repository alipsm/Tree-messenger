"use client"

import React from 'react'
import { useMutation } from 'react-query';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import useApi from '@/hooks/useApi';
import useToast from '@/hooks/useToast';
import Modal from '@/components/ui/modal';
import useAppStore from '@/hooks/useStore';
import Button from '@/components/elements/button';
import { AiOutlineSecurityScan } from "react-icons/ai";

export default function ChangeQuickIdModal({ onClose }: { onClose: Function }) {

    const { updateUserData } = useAppStore()
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { error, success } = useToast();
    const { put } = useApi();

    const mutation = useMutation({
        mutationFn: async (e: React.FormEvent) => {
            if (!executeRecaptcha) {
                console.warn("captcha is not available");
                return Promise.reject("captcha is not available");
            }

            try {
                const captchaToken = await executeRecaptcha("inquirySubmit");
                const data: any = await put("/user/update", {quick_id:true}, {
                    headers: { "captcha-token": captchaToken },
                });

                if (data.success) {
                    return Promise.resolve(data);
                }
            } catch (error: any) {
                return Promise.reject(error.message);
            }
            return Promise.reject("Please try again later");
        },
        onSuccess: async (data: any) => {
            success("The Quick ID has been changed")
            localStorage.setItem("token", data.token)
            updateUserData({ quick_id: data.quick_id })
            onClose(false);
        },
        onError: async (err: string) => {
            error(err);
        }
    });

    return (
        <Modal open={true} onClose={onClose}>
            <div className=" text-lg">Update Quick-ID </div>
            <br />
            <hr className=' border-cadetGrey w-full' />
            <br />
            <p className=' text-white text-lg'>
                You are changing your Quick ID. <br />
                With this, if someone has your Quick ID, it is not possible to find you. <br />
                This can help your security. <AiOutlineSecurityScan className=' inline-block cursor-pointer w-6 h-6  text-cadetGrey' />
            </p>
            <br />
            <hr className=' border-cadetGrey w-full' />
            <i className=' text-white'>Please change your Quick ID every few days</i>
            <br />

            <Button text="update" onclick={mutation.mutate} loading={mutation.isLoading} parentClassName='w-full' className='m-auto' />
            {/* <form onSubmit={mutation.mutate}>
                <TextBox placeholder='Write your new Username' name='username' />
            <br />
            </form> */}
        </Modal>
    )
}