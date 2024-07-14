import { cn } from '@/lib/utils'
import React, { Children } from 'react'
import Markdown from 'react-markdown'
import rehypehighlight from 'rehype-highlight'
import {PiTerminalThin} from 'react-icons/pi'

import "highlight.js/styles/atom-one-dark.min.css"
import CopyButton from './copyButton'
import { icons } from '@/lib/icons'

export default function MarkdownPriview({content,className}:{content:string,className?:string}) {
  return (
    <Markdown 
    rehypePlugins={[rehypehighlight]}
    className={cn("space-y-6",className)}
    components={{
        h1:({node,...props})=>{
            return <h1 {...props} className='text-3xl font-bold'/>
        },
        h2:({node,...props})=>{
            return <h1 {...props} className='text-2xl font-semibold'/>
        },
        h3:({node,...props})=>{
            return <h1 {...props} className='text-xl font-bold'/>
        },

        code:({node, className , children , ...props}) => {

            const match = /language-(\w+)/.exec(className || "");

            if (match?.length) {

                let Icon = PiTerminalThin;
                const id = (Math.floor(Math.random()*100)+1).toString();

                const isMatch = icons.hasOwnProperty(match[1]);
                if(isMatch){
                    Icon = icons[match[1] as keyof typeof icons];
                }

                return <div className='bg-[#151a2a]  text-gray-300 border rounded-xl'>
                    <div className='px-5 py-2 flex justify-between items-center shadow-2xl bg-[#0f1320] rounded-xl'>
                       <div className='flex items-center gap-3'>
                            <Icon className='text-white'/>
                            <span>{node?.data?.meta}</span>
                       </div>
                       <CopyButton id={id}/>
                    </div>
                    <div className='overflow-x-auto w-full'>
                            <div className='p-5 m-5' id={id}>
                                {children}
                            </div>
                    </div>
                </div>
            }else{
                return <code className='bg-zinc-700 rounded-md p-2'>{children}</code>;
            }

           
        }
    }}
    
    >{content}</Markdown>
  )
}
