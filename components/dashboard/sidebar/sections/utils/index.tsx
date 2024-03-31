import React from 'react'
import SideBarCard from '../../layouts/card'
import { FaUser } from 'react-icons/fa6';
import Link from 'next/link';
import { GiMailbox } from 'react-icons/gi';
import { BsMailbox2Flag, BsQrCode, BsQrCodeScan } from 'react-icons/bs';
import { LiaParachuteBoxSolid } from 'react-icons/lia';
import { TbScan } from 'react-icons/tb';

export default function Utils() {
    const sampleData = [
        {
            title:"Find User",
            subtitle:"search user with tree ID",
            ico:<FaUser className='text-cadetGrey w-6 h-6' width={20} height={20}/>,
            link:"search-user"
        },
        {
            title:"Post",
            subtitle:"send message in the specific time",
            ico:<LiaParachuteBoxSolid   className='text-cadetGrey w-6 h-6' width={20} height={20}/>,
            link:"post"
        },
        {
            title:"Build QR Message",
            subtitle:"encrypt your message in the QR code",
            ico:<BsQrCode    className='text-cadetGrey w-6 h-6' width={20} height={20}/>,
            link:"build-qr-message"
        },
        {
            title:"Scan QR Message",
            subtitle:"scan and encrypt you QR message",
            ico:<TbScan className='text-cadetGrey w-6 h-6' width={20} height={20}/>,
            link:"encrypt-qr-message"
        }
    ]
  return (
     <div>
        {sampleData.map(item=>(
            <Link href={item.link} key={item.title}>
            <SideBarCard key={item.link} {...item}/>
            </Link>
        ))}
     </div>
  );
}
