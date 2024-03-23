"use client"
import React, { HTMLInputTypeAttribute } from 'react'

interface TextBoxInterface {
    type?: HTMLInputTypeAttribute,
    getValue?: Function,
    placeholder?: string,
    name?: string
}

TextBox.defaultProps = {
    type: "text",
    placeholder: ""
}

export default function TextBox(props: TextBoxInterface) {
    return (
        <div className='  max-w-80'>
            <input
                type={props.type}
                onChange={e => props.getValue?.(e)}
                placeholder={props.placeholder}
                className=' text-white outline-none bg-shark py-3 px-4 rounded placeholder-cadetGrey'
                name={props.name}
            />
        </div>
    )
}
