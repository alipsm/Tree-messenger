import React from 'react'

export default function UserHeaderForm({title="",info=""}) {
  return (
    <div>
    <h2 className=' text-white text-2xl text-center opacity-90'>
      <b>
        {title}
      </b>
    </h2>
    <i className=' text-white opacity-50 mx-auto'>
      {info}
    </i>
  </div>
  )
}
