import React from "react";
import ChatTextBoxInterface from "./interface";
import TextBox from "../textbox";
import Button from "../button";
import { TbSend } from "react-icons/tb";

export default function ChatTextBox(props: ChatTextBoxInterface) {
   return (
      <div
         className={`${props.className} min-w-[40%] h-14 flex items-center border border-cadetGrey rounded-xl overflow-hidden`}
      >
         <TextBox
            className={`opacity-70 focus:opacity-100  transition-opacity w-full`}
            parentClassName="w-full"
            placeholder={"Write a message..."}
         />
         <Button
            className={`  transition-opacity border border-cadetGrey rounded-none h-full overflow-hidden`}
            parentClassName="h-full"
            text={<TbSend className=" w-6 h-6 text-white" />}
         />
      </div>
   );
}
