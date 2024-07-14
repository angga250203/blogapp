"use client"

import React from 'react'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Navlink() {

    const pathname = usePathname();


     const links = [
        {
            href:"/dashboard",
            text:"dashboard",
            icon:<MdDashboard/>,
        },
        {
            href:"/dashboard/user",
            text:"user",
            icon:<FaUser/>,
        }
     ]

  return (
    <div className='flex gap-5 border-b-2 pb-2'>
        {links.map(({href,text,icon},index) => {
            return <Link href={href} key={index} className={cn("flex gap-2 items-center hover:underline transition-all",{"text-blue-500 umderline" :pathname === href})}>
                    {text}
                    / 
                    {icon}
            </Link>
        })}
    </div>
  )
}
