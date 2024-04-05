"use client";
import React, { useEffect, useState } from "react";

export default function Switcher({
   items,
   defaultItem,
   onChange,
}: {
   items: string[];
   defaultItem: string;
   onChange?: Function;
}) {
   const [position, setPosition] = useState(defaultItem);

   useEffect(() => {
      onChange?.(position);
   }, [position]);

   return (
      <div className=" relative flex justify-around h-max items-center bg-shark p-2 rounded-md text-white">
         {items.map((item) => (
            <div
               key={item}
               onClick={() => setPosition(item)}
               className={`${
                  position === item && " bg-mistBlue"
               } rounded-md py-1 px-3 relative z-10 cursor-pointer transition-all`}
            >
               {item}
            </div>
         ))}
      </div>
   );
}
