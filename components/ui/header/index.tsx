"use client"
import MoveElement from '@/components/animations/MoveElement'
import Image, { StaticImageData } from 'next/image'
import React, { ReactElement, useEffect, useState } from 'react'
import { IconType } from 'react-icons/lib'
import lock_ico from './img/lock.png'
import FadeIn from '@/components/animations/FadeIn'

export default function Header({ src,Ico, alt , lockIco }: { src?:StaticImageData,Ico?:IconType, alt: string ,lockIco?:boolean}) {
    const [refresh, setRefresh] = useState(true)

    const getRandomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

    useEffect(() => {
        setTimeout(() => {
            setRefresh(!refresh)
        }, 6000)
    }, [refresh])


    return (
        <div className=' relative flex justify-center items-center w-full text-center h-[20vw]  box-content'>
                <FadeIn delay={.3} className='relative flex justify-center items-center w-48 h-48 z-20'>

            {src && <Image src={src} alt={alt} className=' absolute w-full h-full  z-20'/>}
            {<Image src={lock_ico} alt={"lock"} className={`absolute w-1/2 h-1/2 z-40 ${lockIco?"opacity-80":"opacity-0"} transition-opacity `} />}
            {Ico && <Ico className=' relative w-full h-full text-[#474E61] z-20 p-4'/> }
                </FadeIn>
            <div  className=' absolute after:content-none after:relative    flex justify-center items-center w-48 h-48  box-content'>
                <div  className="  z-10 w-48 h-48  rounded-full bg-[#2A2E37]">
                </div>
                {[0, 1, 2, 3, 4,5].map(item => (
                    <MoveElement
                        key={item}
                        refreshKey={refresh}
                        initial={{ y: 0, x: 0, width: 70, height: 70, opacity: 1 }}
                        animate={{ y: getRandomNum(-170, 170), x: getRandomNum(-170, 170), width: [60,50,20], height: [60,50,20], opacity: [1, 1, 0] }}
                        duration={getRandomNum(2, 4)}
                        delay={getRandomNum(0,2)}
                        className=' absolute bg-[#2A2E37] w-7 h-7 rounded-full'
                    />
                ))}
            </div>
        </div>
    )
}
