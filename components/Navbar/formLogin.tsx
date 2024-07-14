"use client"

import React from 'react'
import { Button } from '../ui/button'
import { FaGithub } from 'react-icons/fa6'
import { createBrowserClient } from '@supabase/ssr'
import { usePathname } from 'next/navigation'



function FormLogin() {

    const pathname = usePathname();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider:"github",
            options:{
                redirectTo:location.origin + "/auth/callback?next="+pathname, 
            }
        })
    }

  return (
   
    <Button className='flex items-center gap-3' onClick={handleLogin}>
        Login with github
        <FaGithub className='text-2xl'/>
    </Button>
  )
}

export default FormLogin