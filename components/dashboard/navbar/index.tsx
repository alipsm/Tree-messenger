"use client"

import Image from 'next/image'
import React from 'react'
import tree_log from '@/public/static/img/tree-logo.png'
import FadeIn from '@/components/auth/animations/FadeIn'

export default function NavBar() {
  return (
     <nav className="flex justify-center items-center w-full bg-shark h-10 tablet:h-14 text-white">
        <FadeIn className="flex justify-center items-center gap-2">
           <Image
              src={tree_log}
              className="w-4 tablet:w-5"
              alt="tree logo"
           />
           <h1 className=" text-xs tablet:text-lg">
              <strong>Tree-Messanger</strong>
           </h1>
        </FadeIn>
     </nav>
  );
}
