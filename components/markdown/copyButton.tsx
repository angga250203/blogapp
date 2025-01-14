import { cn } from '@/lib/utils';
import { Scale } from 'lucide-react';
import React, { useState } from 'react'
import { BsCopy } from 'react-icons/bs'
import { IoMdCheckmark } from "react-icons/io";

export default function CopyButton({id}:{id:string}) {

    const [oncopy,setCopy] = useState(false);
    const [onDone,setDone] = useState(false);

    const handleCopy = async () => {
        const text = document.getElementById(id)?.textContent;

        try {
            await navigator.clipboard.writeText(text!);
            setCopy(true)
        } catch {
            console.log("error copy")
        }
    }


  return (
    <div onClick={handleCopy} className='p-2 hover:scale-105 cursor-pointer hover:bg-zinc-700 rounded-md relative '>
        <IoMdCheckmark 
        className={cn("cursor-pointer transition-all w-5 h-5 text-green-500",
        onDone?"scale-100":"scale-0")} 
        onTransitionEnd={() => {
           setTimeout(() => {
                setCopy(false);
                setDone(false);
           },500);
         }}
        
        />
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
            <BsCopy
             className={cn("transition-all", oncopy? "scale-0":"scale-100")} 
             onTransitionEnd={() => {
                if(oncopy) {
                    setDone(true)
                }
             }}
            
            />
        </div>
    </div>
  )
}
