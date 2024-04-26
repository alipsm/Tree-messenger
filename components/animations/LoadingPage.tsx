"use client"
import React from 'react'
import Header from '../ui/header'
import { IoIosTimer } from 'react-icons/io'

export default function LoadingPage() {
  return (
      <div className='w-full h-full flex flex-col justify-start items-center b g-mistBlue opacit y -80 animate-pulse'>
      <Header Ico={IoIosTimer} alt='loading'/>
      <h1 className=' text-lg text-white'><strong>Loading...</strong></h1>
    </div>
  )
}
