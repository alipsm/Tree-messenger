"use client"
import ScanQrMessage from '@/components/forms/ScanQrMessage'
import Header from '@/components/ui/header'
import React from 'react'
import { BsQrCodeScan } from 'react-icons/bs'

export default function page() {
  return (
    <>
      <Header Ico={BsQrCodeScan} alt='scan qr code' />
      <ScanQrMessage />
    </>
  )
}
