import { useUser } from '@/lib/store/user'
import Image from 'next/image';
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '../ui/button';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
  

function Profile() {

    const user = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser)

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogout = async() => {
      await supabase.auth.signOut();
      setUser(undefined)
    }

    const isAdmin = user?.user_metadata?.role === "admin";

  return (
    <Popover>
        <PopoverTrigger>
            <Image 
            className='rounded-full ring-2 ring-green-500'
            src={user?.user_metadata.avatar_url} 
            alt={user?.user_metadata.user_name}
            width={50}
            height={50}
            />  
        </PopoverTrigger>
        <PopoverContent >
            <div className='py-3 px-4 space-y-2'>
                <p>{user?.user_metadata.user_name}</p>
                <p className='text-gray-500'>{user?.user_metadata.email}</p>
            </div>

    {isAdmin && (
         <Link href="/dashboard">
            <Button variant={'outline'} className='w-full mt-2'>
                Dasboard
            </Button>
         </Link>  )}

            <Button onClick={handleLogout} className='w-full mt-2'>
                logout
            </Button>
        </PopoverContent>
    </Popover>

 )
}

export default Profile