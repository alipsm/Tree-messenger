'use client'
import React from 'react'
import { AnimationControls, AnimationProps, TargetAndTransition, VariantLabels, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type animateType = AnimationControls|VariantLabels|TargetAndTransition
type initialType = VariantLabels
export default function MoveElement({
    refreshKey, duration=1, delay=0,initial , animate , className, children, resetWithNavigate=false
}: {
    refreshKey?: any, duration?: number, delay?: number,initial:object,animate:animateType, className?: string, children?: React.ReactNode, resetWithNavigate?: boolean
}) {

    return (
        <motion.div
            key={choiseKey(refreshKey,resetWithNavigate)}
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

