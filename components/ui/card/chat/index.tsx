import React from "react";

export default function ChatCard({
   position,
   text,
   date,
}: {
   position: "right" | "left";
   text: string;
   date?: string;
}) {
   return (
      <div
         className={`px-4 py-3 text-white w-max max-w-[50%] rounded-xl my-1 box-content
         ${
            position === "right" ? "bg-mistBlue rounde d-br-none ml-auto" : "bg-cadetGrey round ed-bl-none mr-auto"
         }`}
      >
         {text}
      </div>
   );
}
