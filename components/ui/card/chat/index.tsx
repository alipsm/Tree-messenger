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
            position === "right" ? "bg-mistBlue rounded-br-none ml-auto" : "bg-cadetGrey rounded-bl-none mr-auto"
         }`}
      >
         {text}
      </div>
   );
}
