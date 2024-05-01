"use client"
import GoogleCaptchaWrapper from '@/components/auth/GoogleCaptchaWrapper'
import ScanQrMessage from '@/components/forms/ScanQrMessage'
import Header from '@/components/ui/header'
import React from 'react'
import { BsQrCodeScan } from 'react-icons/bs'

export default function page() {
  return (
    <GoogleCaptchaWrapper>
      <Header Ico={BsQrCodeScan} alt='scan qr code' />
      <ScanQrMessage />
    </GoogleCaptchaWrapper>
  )
}
