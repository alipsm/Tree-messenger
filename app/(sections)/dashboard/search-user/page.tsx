import Button from '@/components/elements/button'
import TextBox from '@/components/elements/textbox'
import React from 'react'

export default function page() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col gap-4'>
      <TextBox placeholder='quick-ID:(xxxx)'/>
      <Button text='Search'/>
    </div>
  )
}
