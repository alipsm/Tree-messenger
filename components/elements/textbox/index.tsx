"use client"
import React from 'react'
import TextBoxInterface from './interface'

const helpers = require("./helpers")
const {getColor} = helpers

TextBox.defaultProps = {
    type: "text",
    placeholder: ""
}

export default function TextBox(props: TextBoxInterface) {

    const positionType = (()=>{
        let getPosition = (success?:string,error?:string)=>success ? "success" : error ? "error" : undefined
        let type:("success"|"error"|undefined) = getPosition(props.success,props.error)

        if (type === undefined) 
            return;

        let color = getColor(type)
        let text = props[type]
        return {
            color,
            text
        }
    })() 

    return (
        <div className='max-w-80 relative'>
            <input
                type={props.type}
                onChange={e => props.getValue?.(e)}
                style={{outlineColor:positionType?.color}}
                placeholder={props.placeholder}
                className='text-white outline-none bg-shark py-3 px-4 rounded placeholder-cadetGrey outline-1 ou tline-[#19C18F]'
                name={props.name}
            />

            <p style={{color:positionType?.color}} className=' absolute left-0 -bottom-5 pt-1 text-xs opacity-60 transition-opacity '>{positionType?.text}</p>
        </div>
    )
}
