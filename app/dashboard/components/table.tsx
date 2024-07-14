import { Button } from '@/components/ui/button'
import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { Switch } from '@/components/ui/switch';

function Table() {
  return (
    <div className='overflow-x-auto'>
    <div className='mt-12 border-2 p-5 rounded-xl bg-gray-100 w-[900px] md:w-full'>
        <div className='grid grid-cols-5 border-b-2 pb-3'>
            <h1 className='col-span-2'>Title</h1>
            <h1>Premium</h1>
            <h1>Publish</h1>
        </div>

        <div className='grid items-center grid-cols-5 border-b-2 p-2'>
            <h1 className='col-span-2'>Blog Title</h1>
            <Switch checked={false}/>
            <Switch checked={true}/>
            <Actions/>
        </div>

      
    </div>
    </div>
  )
}

const Actions = () => {
    return(
        <div className='flex items-center gap-2 flex-wrap'>
            <Button variant={'outline'} className='flex items-center gap-1'>
                View
                <FaRegEye/>
            </Button>
            <Button variant={'outline'} className='flex items-center gap-1'>
                Delete
                <CiTrash/>
            </Button>
            <Button variant={'outline'} className='flex items-center gap-1'>
                Edit
                <FaEdit/>
            </Button>
        </div>
    )
}  

export default Table