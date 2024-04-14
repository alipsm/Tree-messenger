"use client"

import React from 'react'
import { useMutation } from 'react-query';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import useApi from '@/hooks/useApi';
import useToast from '@/hooks/useToast';
import Modal from '@/components/ui/modal';
import useAppStore from '@/hooks/useStore';
import Button from '@/components/ui/elements/button';
import TextBox from '@/components/ui/elements/textbox';

export default function UpdateUsernameModal({onClose}:{onClose:Function}) {

    const {updateUserData} = useAppStore()
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { error, success } = useToast();
    const { put } = useApi();

    const mutation = useMutation({
        mutationFn: async (e: React.FormEvent) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const objFormData = Object.fromEntries(formData.entries());
            if (!executeRecaptcha) {
                console.warn("captcha is not available");
                return Promise.reject("captcha is not available");
            }

            try {
                const captchaToken = await executeRecaptcha("inquirySubmit");
                const data: any = await put("/user/update", objFormData, {
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
            success("The Username has been changed")
            localStorage.setItem("token",data.token)
            updateUserData({username:data.username})
            onClose(false);
        },
        onError: async (err: string) => {
            error(err);
        }
    });

    return (
        <Modal open={true} onClose={onClose}>
            <div className=" text-lg">Update Username</div>
            <br />
            <form onSubmit={mutation.mutate}>
                <TextBox placeholder='Write your new Username' name='username' />
            <br />
                <Button text="update" loading={mutation.isLoading} submit parentClassName='w-full' className='m-auto'/>
            </form>
        </Modal>
    )
}