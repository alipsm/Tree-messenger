"use client"

import { useMutation } from 'react-query'
import React, { useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { toPng } from 'html-to-image';

import { encryptText } from '@/utils/encryptText'
import useFormValidation from '@/hooks/useValidation'
import TextArea from '@/components/ui/elements/textArea'
import Switcher from '@/components/ui/elements/switcher'
import QrCodeCard from '@/components/ui/card/qr-code'
import Button from '@/components/ui/elements/button'
import Modal from '@/components/ui/modal'
import useToast from '@/hooks/useToast'
import useApi from '@/hooks/useApi'
import useQr from '@/hooks/useQr'
import FadeIn from '@/components/animations/FadeIn'

export default function BuildQrMessage({ getProtect }: { getProtect?: Function }) {


  const [qrModal, setQrModal] = useState({ show: false, card: true });
  const [protectQr, setProtectQr] = useState(true)

  const { executeRecaptcha } = useGoogleReCaptcha();
  const { buildQr, drawQr } = useQr()
  const { error } = useToast();
  const { post } = useApi();

  useEffect(() => {
    qrModal && drawQr("qr-canvas-container")
  }, [qrModal])


  const mutation = useMutation({
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const { message } = Object.fromEntries(formData.entries());

      if (!message) {
        return Promise.reject("Message is Empty!")
      }

      if (!executeRecaptcha) {
        console.warn("captcha is not available");
        return Promise.reject("captcha is not available");
      }

      try {
        const encryptedMessage = encryptText(message as string)

        const captchaToken = await executeRecaptcha("inquirySubmit");
        const data: any = await post("/encryption/encrypt", { message: encryptedMessage }, {
          headers: { "captcha-token": captchaToken },
        });

        if (data.status) {
          return Promise.resolve(data);
        }
      } catch (error: any) {
        return Promise.reject(error.message);
      }
      return Promise.reject("Please try again later");
    },
    onSuccess: async (data: any) => {
      buildQr(data.message)
      setQrModal({ ...qrModal, show: true });
    },
    onError: async (err: string) => {
      error(err);
    },
    onSettled: async () => { },
  });


  function handleProtectStatus(target: string) {
    const status = target === "Encryption" ? true : false
    getProtect?.(status)
    setProtectQr(status)
  }



  const onButtonClick = () => {
    const node = document.getElementsByClassName("qr-code-card")[0] as HTMLElement
    if (node)
      toPng(node, { pixelRatio: 3 })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'quicker-qr.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <div className='flex w-full h -full flex-col justify-center items-center' id='hiiiii'>
      <form onSubmit={mutation.mutate} className=' flex flex-col justify-start items-center gap-4'>
        <TextArea placeholder='Message' name='message' parentClassName='w-full' />
        <Switcher items={["Encryption", "non-Encryption"]} onChange={handleProtectStatus} defaultItem='Encryption' />
        {/* <div className='flex relative justify-end items-center gap-2'>
          <Switcher items={["Password", "non-Password"]} onChange={handleProtectStatus} defaultItem='Password' />
          <AiOutlineFileProtect className=' absolute -right-10 text-cadetGrey w-8 h-8' />
        </div> */}
        {/* <TextBox placeholder='Qr Password' name='password' type='' disabled={!protectQr} /> */}
        <Button text="Generate QR" submit />
      </form>
      <div className=" absolute left-0 top-0" id='container'>
      </div>
      <Modal open={qrModal.show} onClose={setQrModal}>
        <Switcher items={["Card", "Original"]} onChange={(e: string) => setQrModal({ ...qrModal, card: e === "Card" || false })} defaultItem='Card' />
        <hr className='w-full border-cadetGrey' />
        <br />
        <FadeIn duration={2} refreshKey={qrModal.card}>
          {qrModal.card ? (
            <QrCodeCard />
          ) : (
            <div className='qr-code-card qr-canvas-container'></div>
          )}
        </FadeIn>
        <div className=' flex w-full justify-evenly items-center mt-4'>
          <Button text="Download" type='Text' onclick={onButtonClick} />
          <Button text="Send" type='Text' />
        </div>
      </Modal>
    </div>
  )
}