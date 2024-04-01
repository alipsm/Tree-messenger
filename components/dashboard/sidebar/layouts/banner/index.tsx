import React from "react";

export default function Banner() {
   return (
      <div className="flex justify-center flex-col items-center gap-1 absolute bottom-5 left-0 w-full m-auto text-white ">
         <div className="bg-mistBlue px-7 py-3 rounded-lg w-max m-auto cursor-pointer hover:opacity-80 transition-opacity">
            <span className="opacity-80">quick-5436</span>
         </div>
         <span className=" opacity-60 text-xs">version&nbsp;{process.env.APP_VERSION}</span>
      </div>
   );
}
