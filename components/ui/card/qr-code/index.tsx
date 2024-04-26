import React from 'react'
import { BsShieldShaded } from 'react-icons/bs'
import { GiQuickSlash } from "react-icons/gi";

export default function QrCodeCard() {
    return (
        <div className='qr-code-card h-80 w-52 box-border relative  bg-mirage rounded-2xl border border-white py-7 px-6'>
            <div className="flex justify-cneter items-center gap-1 text-cadetGrey absolute top-2 right-5">
                <small></small>
                <BsShieldShaded />
            </div>

            <div className='flex flex-col justify-start items-center h-full w-full'>
                <div className=' flex flex-col  justify-between h-max items-start'>
                    <div className=' text-white relative flex gap-2 justify-start items-center'>
                        <GiQuickSlash className='w-7 h-7  absolute  -left-8 text-white' />
                        <span>
                            quicker.ir
                        </span>
                    </div>
                </div>
            </div>
            <div className=' absolute w-full h-full left-0 top-0 flex justify-center items-center'>

                <div className='qr-canvas-container relative z-50 rounded-lg' />
            </div>
            <p className='absolute bottom-2 left-0 w-full text-cadetGrey text-xs text-center m-auto'>Scan on the Quicker site</p>
        </div>
    )
}
