import React from "react";
import ChatTextBoxInterface from "./interface";

export default function ChatTextBox(props: ChatTextBoxInterface) {
   return (
      <div
         className={`${props.className} rounded-xl border border-cadetGrey flex flex-col  min-w-[40%]  overflow-hidden`}
      >
         <input
            type="text"
            name=""
            id=""
            className=" bg-shark outline-none p-3 text-white opacity-70 focus:opacity-100 transition-opacity"
         />
         <hr className=" border border-cadetGrey" />
         <button className=" bg-mistBlue p-3 text-white hover:opacity-80 transition-opacity">
            Send
         </button>
      </div>
   );
}
