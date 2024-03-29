'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

FadeIn.defaultProps = {
    className: "",
    duration: 1,
    delay: 0,
    resetWithNavigate: false
}

export default function FadeIn({
    key, duration, delay, className, children, resetWithNavigate
}: {
    key?: any, duration?: number, delay?: number, className?: string, children: React.ReactNode, resetWithNavigate: boolean
}) {

    return (
        <motion.div
            key={choiseKey(key,resetWithNavigate)}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1] }}
            transition={{ duration, delay }}
            defaultValue={delay=5}
            className={`${className}`}
        >
            {children}
        </motion.div>
    )
}

// pure function
const getSubdirectory=()=>{
    let GetPathName = usePathname()
    const subdirectory = GetPathName?.split("/").slice(-1)[0]
    return subdirectory
}

const choiseKey = (key:any,reset:boolean)=>key || reset && getSubdirectory()

