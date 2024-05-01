import Button from '@/components/ui/elements/button'
import Switcher from '@/components/ui/elements/switcher'
import Modal from '@/components/ui/modal'
import useApi from '@/hooks/useApi'
import useQr from '@/hooks/useQr'
import useToast from '@/hooks/useToast'
import React, { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { TbScan } from 'react-icons/tb'
import { useMutation } from 'react-query'

export default function ScanQrMessage() {

  const [file, setFile] = useState<any>()
  const [modalData, setModalData] = useState({
    show: false,
    message: "",
  });
  const [qrData, setQrData] = useState<string>()


  const { executeRecaptcha } = useGoogleReCaptcha();
  const { error, success } = useToast();
  const { post } = useApi();
  const { scanImage } = useQr()

  const mutation = useMutation({
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const { qr } = Object.fromEntries(formData.entries());

      if (!qr) {
        return Promise.reject("Qr is Empty!")
      }

      if (!executeRecaptcha) {
        console.warn("captcha is not available");
        return Promise.reject("captcha is not available");
      }

      try {
        const qr_data = await scanImage(qr)
        if (!qr_data)
          throw new Error("I can't detected your qr code data")
        const captchaToken = await executeRecaptcha("inquirySubmit");
        const data: any = await post("/encryption/decrypt", { qr_data }, {
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
      setModalData({
        show: true,
        message: data.message
      })
      success("You can see QR code message")
    },
    onError: async (err: string) => {
      error(err);
    },
    onSettled: async () => { },
  });

  return (
    <>
      <form onSubmit={mutation.mutate} className='flex w-full h -full flex-col justify-center items-center'>
        <Switcher items={["File", "Camera"]} defaultItem='File' />
        <br />
        <div className='relative flex justify-center items-center w-96 h-48 border bg-shark border-white border-dashed text-white rounded-xl'>
          <input type='file' accept='.png' name='qr' onChange={e => setFile(e.target.value)} className=' opacity-0 absolute left-0 top-0  w-full h-full ' />
          <div className=' text-center'>
            <strong>Choose or drag and drop your quicker qr pic</strong>
            <br />
            <span>{file}</span>
          </div>
        </div>
        <br />
        <Button text={<>Scan <TbScan className='text-cadetGrey w-6 h-6' /></>} submit loading={mutation.isLoading} />
      </form>

      {modalData.show && (
        <Modal open={true}
          onClose={(e: boolean) => setModalData({ ...modalData, show: e })}>
          <div className=' relative w-full text-white'>
            <h2 className=' text-center text-lg'><strong>QR Data</strong></h2>
            <hr className=' border-cadetGrey' />
            <br />
            <p className=' break-words' dir='auto'>
              {modalData.message || "There isn't any data!"}
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}
