import React from 'react'

function Header({title="",info=""}) {
  return (
     <div>
        <h2 className=" text-white text-lg tablet:text-2xl text-center opacity-90">
           <b>{title}</b>
        </h2>
        <i className=" text-white text-xs tablet:text-base opacity-50 mx-auto">
           {info}
        </i>
     </div>
  );
}

module.exports = Header