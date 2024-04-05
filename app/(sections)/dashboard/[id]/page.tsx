"use client"
import ChatTextBox from '@/components/elements/chatTextBox'
import ChatCard from '@/components/ui/card/chat'
import { useParams } from 'next/navigation'

import React from 'react'

export default function Page() {
  const params =  useParams()
  const chatID = params?.id

  const sampleData=[
    {
      text:"Hi!",
      role:"user",
      date:"12:35"
    },
    {
      text:"Hi...",
      role:"contact",
      date:"12:45"
    },
    {
      text:"How are you?",
      role:"user",
      date:"12:50"
    },
    {
      text:"Thanks.... ,and you?",
      role:"conact",
      date:"13:03"
    },
    {
      text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      role:"user",
      date:"13:15"
    },    {
      text:"Nisl suscipit adipiscing bibendum est ultricies. Sed enim ut sem viverra aliquet.",
      role:"contact",
      date:"13:30"
    },
    {
      text:"Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut.",
      role:"user",
      date:"13:37"
    },
    {
      text:"Eros in cursus turpis massa tincidunt dui ut. Tempus egestas sed sed risus pretium quam. Amet consectetur adipiscing elit ut. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus.",
      role:"contact",
      date:"13:50"
    },
    {
      text:"Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit.",
      role:"user",
      date:"14:00"
    },
    {
      text:"Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut.",
      role:"user",
      date:"13:37"
    },
    {
      text:"Eros in cursus turpis massa tincidunt dui ut. Tempus egestas sed sed risus pretium quam. Amet consectetur adipiscing elit ut. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus.",
      role:"contact",
      date:"13:50"
    },
    {
      text:"Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit.",
      role:"user",
      date:"14:00"
    },
    {
      text:"Mauris nunc congue nisi vitae suscipit tellus mauris.",
      role:"user",
      date:"14:15"
    },{
      text:"Integer vitae justo eget magna fermentum iaculis eu non. Faucibus purus in massa tempor nec feugiat nisl pretium.",
      role:"user",
      date:"14:23"
    },{
      text:"Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut.",
      role:"user",
      date:"13:37"
    },
    {
      text:"Eros in cursus turpis massa tincidunt dui ut. Tempus egestas sed sed risus pretium quam. Amet consectetur adipiscing elit ut. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus.",
      role:"contact",
      date:"13:50"
    },
    {
      text:"Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit.",
      role:"user",
      date:"14:00"
    },
    {
      text:"Mauris nunc congue nisi vitae suscipit tellus mauris.",
      role:"user",
      date:"14:19"
    },{
      text:"Integer vitae justo eget magna fermentum iaculis eu non. Faucibus purus in massa tempor nec feugiat nisl pretium.",
      role:"contact",
      date:"14:18"
    },{
      text:"Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut.",
      role:"user",
      date:"13:37"
    },
    {
      text:"Eros in cursus turpis massa tincidunt dui ut. Tempus egestas sed sed risus pretium quam. Amet consectetur adipiscing elit ut. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus.",
      role:"contact",
      date:"13:50"
    },
    {
      text:"Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit.",
      role:"user",
      date:"14:00"
    },
    {
      text:"Mauris nunc congue nisi vitae suscipit tellus mauris.",
      role:"user",
      date:"14:05"
    },{
      text:"Integer vitae justo eget magna fermentum iaculis eu non. Faucibus purus in massa tempor nec feugiat nisl pretium.",
      role:"contact",
      date:"14:17"
    }

  ]

  return (
    <div className=' relative flex justify-center w-full h-full py-4 px-4 overflow-y-auto'>
      <div className=' h-full w-full overflow-scroll px-6 pb-16 tablet:pb-24'>
      {sampleData.map((item,i)=>(
        <ChatCard key={`${item.date + i} `} position={item.role==="user"?"right":"left"} {...item}/>
      ))}
      </div>
      <ChatTextBox className=' m-auto absolute bottom-4'/>
    </div>
  )
}
