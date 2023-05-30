"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import EarthIcon from "../../public/MainPageImages/EarthIcon.svg"
import FireIcon from "../../public/MainPageImages/FireIcon.svg";
import WaterIcon from "../../public/MainPageImages/WaterIcon.svg"
import WindIcon from "../../public/MainPageImages/WindIcon.svg"
import MainPageImage from "../../public/MainPageImage.svg"
import Link from 'next/link'
export default function Home() {
  return (
    <>
    <div className='flex flex-col'>
      <Header />
      <div className='self-center flex flex-col justify-center h-[90vh]' >
        <h1 className='text-4xl text-center font-bold'>Gaming NFT-s</h1>
        <h3 className='text-md italic text-center p-3'>Mint once, use everywhere</h3>
          <Image src={MainPageImage} alt='Something' />
         <button className='bg-blue-500 self-center text-wheat p-1 rounded-lg m-2 font-bold w-40'><Link href="/mint">Continue</Link></button>
      </div>
    </div>
    </>
  )
}
