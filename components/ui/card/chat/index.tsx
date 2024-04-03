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
         className={` py-2 px-3 tablet:px-4 tablet:py-3 text-white w-max max-w-[70%] tablet:max-w-[50%]  rounded-lg tablet:rounded-xl my-1 box-content  text-xs tablet:text-base
         ${
            position === "right" ? "bg-cadetGrey ml-auto" : "bg-mistBlue mr-auto"
         }`}
      >
         {text}
      </div>
   );
}
