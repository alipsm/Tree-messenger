"use client"

import Image from 'next/image'
import React from 'react'
import tree_log from '@/public/static/img/tree-logo.png'

export default function NavBar() {
  return (
    <nav className='flex justify-center items-center w-full bg-shark h-14 text-white'>
      <div className='flex justify-center items-center gap-2'>
        <Image src={tree_log}
        alt='tree logo'
        width={20}
        
        />
        <h1 className=' text-xl'>
            <strong>
                Tree-Messanger
            </strong>
        </h1>
      </div>
    </nav>
  )
}
