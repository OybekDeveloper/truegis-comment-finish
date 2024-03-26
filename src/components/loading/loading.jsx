import React from 'react'
import logo from './logo 2 1 (1).png'
import {motion} from 'framer-motion'
export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center gap-[24px]'>
<motion.img 
    initial={{ opacity: 0.7, scale: 0.9 }} // Initial position
    animate={{ opacity: 1, scale: 1.2, }} // Animation in
    exit={{ opacity: 0.7, scale: 0.9,  }} // Animation out
    transition={{repeat: Infinity, duration: 0.7, repeatType: "reverse" }} // Repeats and reverses
    className='w-[200px]' 
    src={logo} 
    alt="logo" 
/>

    <h1 className='text-[24px] font-[500]'>Comments</h1>
</div>
  )
}
