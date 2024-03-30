"use client"

interface TextBoxInterface {
    onclick?: Function,
    text?: string
}

export default function Button(props: TextBoxInterface) {
    return (
        <div className=' max-w-80'>
            <input
                type={"button"}
                onClick={()=>props.onclick?.()}
                className='text-white bg-mistBlue py-2 px-4 rounded cursor-pointer hover:opacity-90 transition-opacity text-xs tablet:text-base'
                value={props.text}
            />
        </div>
    )
}