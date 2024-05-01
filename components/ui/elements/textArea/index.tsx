"use client";
import React from "react";
import TextAreaInterface from "./interface";

const helpers = require("./helpers");
const { getColor } = helpers;

export default function TextArea(props: TextAreaInterface) {
   const positionType = (() => {
      let getPosition = (success?: string, error?: string) =>
         success ? "success" : error ? "error" : undefined;
      let type: "success" | "error" | undefined = getPosition(
         props.success,
         props.error
      );

      if (type === undefined) return;

      let color = getColor(type);
      let text = props[type];
      return {
         color,
         text,
      };
   })();

   const checkNumberValue = (e: any) => {
      if (/(^(?!\d)(?!Backspace).*$)/.test(e.key)) {
         e.preventDefault();
      }
   };

   return (
      <div className={`${props.parentClassName} relative`}>
         <textarea
            id=""
            cols={10}
            dir="auto"
            rows={10}
            maxLength={props.maxLength}
            onKeyDown={(!!props.number && checkNumberValue) || undefined}
            onChange={(e) => props.getValue?.(e)}
            style={{ outlineColor: positionType?.color }}
            placeholder={props.placeholder}
            className={` w-full text-white outline-none max-h-60 min-h-14 bg-shark py-3 px-4 rounded placeholder-cadetGrey outline-1 text-base tablet:text-lg ${props.className}`}
            name={props.name}
         />

         <p
            style={{ color: positionType?.color }}
            className=" absolute left-0 -bottom-5 pt-1 text-xs opacity-60 transition-opacity "
         >
            {positionType?.text}
         </p>
      </div>
   );
}
