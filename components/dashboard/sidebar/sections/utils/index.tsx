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
            link:"/dashboard/search-user"
        },
        {
            title:"Post",
            subtitle:"send message in the specific time",
            ico:<LiaParachuteBoxSolid   className='text-cadetGrey w-6 h-6' width={20} height={20}/>,
            link:"/dashboard/post"
        },
        {
            title:"Build QR Message",
            subtitle:"encrypt your message in the QR code",
            ico:<BsQrCode    className='text-cadetGrey w-6 h-6' width={20} height={20}/>,
            link:"/dashboard/build-qr"
        },
        {
            title:"Scan QR Message",
            subtitle:"scan your QR message",
            ico:<TbScan className='text-cadetGrey w-6 h-6' width={20} height={20}/>,
            link:"/dashboard/scan-qr"
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
