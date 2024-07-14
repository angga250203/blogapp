import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Table from './components/table'

function Dashboard() {


  return (
    <div className='my-12 '>
        <div className='flex justify-between items-center'>
        <h1 className='text-2xl'>Blogs</h1>
        <Link href="/dashboard/blog/create">
            <Button>Create Blogs</Button>
        </Link>
        </div>
        <Table/>
    </div>
  )
}

export default Dashboard