import { HTMLInputTypeAttribute } from "react";

interface TextBoxInterface {
    type?: HTMLInputTypeAttribute,
    getValue?: Function,
    placeholder?: string,
    name?: string,
    error?:string,
    success?:string,
    className?:string,
    parentClassName?:string
}

export default TextBoxInterface