"use client"

import React from 'react'
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import useApi from '@/hooks/useApi';
import useToast from '@/hooks/useToast';
import Modal from '@/components/ui/modal';
import Button from '@/components/ui/elements/button';
import TextBox from '@/components/ui/elements/textbox';
import { encryptText } from '@/utils/encryptText';

export default function DeleteUserModal({ onClose }: { onClose: Function }) {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const { error, success } = useToast();
    const { delete_ } = useApi();

    const router = useRouter()

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

                let password = objFormData.password as string
                const encryptedPassword = encryptText(password)

                // const token = localStorage.getItem("token")
                // if (!token) { throw new Error("Token isn't exsit, please relogin") }
                const captchaToken = await executeRecaptcha("inquirySubmit");
                const data: any = await delete_(`/user/delete`, {
                    headers: { "captcha-token": captchaToken , "auth-data":encryptedPassword},
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
            success("You and all your information have been removed from Quicker")
            router.replace("/dashboard/logout")
            onClose(false);
        },
        onError: async (err: string) => {
            error(err);
        }
    });

    return (
        <Modal open={true} onClose={onClose}>
            <div className=" text-lg text-red">Delete Account</div>
            <br />
            <form onSubmit={mutation.mutate}>
                <TextBox placeholder='Write your password' name='password' />
                <br />
                <Button text="Delete" loading={mutation.isLoading} submit parentClassName='w-full' className='m-auto' />
            </form>
        </Modal>
    )
}