"use client"

import React from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useMutation } from 'react-query';

import Button from '@/components/elements/button';
import TextBox from '@/components/elements/textbox';
import Modal from '@/components/ui/modal'
import useApi from '@/hooks/useApi';
import useToast from '@/hooks/useToast';
import useFormValidation from '@/hooks/useValidation';
import { encryptText } from '@/utils/encryptText';

export default function UpdatePasswordModal({ onClose }: { onClose: Function }) {

    const { getValidation } = useFormValidation()
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

            const validationResult = getValidation(objFormData)
            if (!validationResult.status) {
                return Promise.reject(validationResult.message)
            }

            try {
                let new_pass = objFormData.password as string
                let old_pass = objFormData.old_password as string
                objFormData.password = encryptText(new_pass)
                objFormData.old_password = encryptText(old_pass)
                delete objFormData["confirm-password"]
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
            success("The Password has been changed")
            localStorage.setItem("token", data?.token)
            onClose(false);
        },
        onError: async (err: string) => {
            error(err);
        }
    });

    return (
        <Modal open={true} onClose={onClose}>
            <div className=" text-lg">Update Password</div>
            <br />
            <form onSubmit={mutation.mutate}>
                <TextBox name='old_password' placeholder='Old password' />
                <br />
                <hr className=' border-cadetGrey' />
                <br />
                <TextBox name="password" placeholder="New Password" parentClassName='mb-1' />
                <TextBox name="confirm-password" placeholder="Confirm Password" />
                <br />
                <Button text="update" loading={mutation.isLoading} submit parentClassName='w-full' className='m-auto' />
            </form>
        </Modal>
    )
}