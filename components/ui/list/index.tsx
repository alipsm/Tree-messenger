import React, { ReactNode } from "react";

export default function ListItems({
   title = "",
   node,
}: {
   title: string;
   node?: ReactNode[];
}) {
   return (
      <ul className="flex flex-col justify-start  border border-shark  rounded-lg w-full">
         <li className=" text-lg bg-shark text-cadetGrey py-1 px-3">
            {title}
         </li>
         {node?.map(item=>(
            <>
            <li key={item?.toString()} className=' flex justify-between items-center px-3 py-4'>
                {item}
                
            </li>
            <hr className=' border-shark'/>
            </>
         ))}
      </ul>
   );
}
