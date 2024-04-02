"use client"

interface ButtonInterface {
    onclick?: Function,
    text?: string,
    submit?: boolean
}

export default function Button(props: ButtonInterface) {
    return (
        <div className=' max-w-80'>
            <input
                type={props.submit?"submit":"button"}
                onClick={()=>props.onclick?.()}
                className='text-white bg-mistBlue py-2 px-4 rounded cursor-pointer hover:opacity-90 transition-opacity text-xs tablet:text-base'
                value={props.text}
                
            />
        </div>
    )
}