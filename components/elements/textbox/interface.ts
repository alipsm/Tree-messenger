import { HTMLInputTypeAttribute } from "react";

interface TextBoxInterface {
    type?: HTMLInputTypeAttribute,
    getValue?: Function,
    placeholder?: string,
    name?: string,
    error?:string,
    success?:string
}

export default TextBoxInterface