'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'


export default function MoveElement({
    key, duration=1, delay=0,initial , animate , className, children, resetWithNavigate=false
}: {
    key?: any, duration?: number, delay?: number,initial:object,animate:object, className?: string, children: React.ReactNode, resetWithNavigate?: boolean
}) {

    return (
        <motion.div
            key={choiseKey(key,resetWithNavigate)}
            initial={initial}
            animate={animate}
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

const choiseKey = (key:any,reset:boolean|undefined)=>key || reset && getSubdirectory()

