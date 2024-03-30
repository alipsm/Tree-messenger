import Link from 'next/link';
import React from 'react'

function Footer({text="",link={text:"",href:""}}) {
  return (
     <p className=" text-cadetGrey text-xs tablet:text-base">
        {text}{" "}
        <Link
           href={link.href}
           className="text-mistBlue underline  hover:opacity-80 transition-opacity"
        >
           <strong>{link.text}</strong>
        </Link>
     </p>
  );
}

module.exports = Footer