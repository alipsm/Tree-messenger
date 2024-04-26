"use client"

import React, { useState } from 'react'
import { BsQrCode } from 'react-icons/bs'

import Header from '@/components/ui/header'
import BuildQrMessage from '@/components/pages/generate-qr'
import GoogleCaptchaWrapper from '@/components/auth/GoogleCaptchaWrapper'

export default function page() {
  const [isLock, setIsLock] = useState(true)
  return (
    <GoogleCaptchaWrapper>
    <Header Ico={BsQrCode} alt='qr code' lockIco={isLock}/>
      <BuildQrMessage getProtect={setIsLock}/>
    </GoogleCaptchaWrapper>
  )
}
