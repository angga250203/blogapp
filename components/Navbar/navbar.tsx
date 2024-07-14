"use client"

import React from 'react'
import FormLogin from './formLogin';
import { useUser } from '@/lib/store/user';
import Profile from './profile';

function Navbar() {

  const user = useUser((state) => state.user)

  return (
    <div className='flex items-center justify-between'>
        <h1>BloggApp</h1>

        {user?<Profile/>:<FormLogin/>}
    </div>
  )
}

export default Navbar