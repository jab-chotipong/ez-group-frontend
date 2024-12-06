import Link from 'next/link'
import React from 'react'
import { BsBox } from 'react-icons/bs'
import { CiBarcode } from 'react-icons/ci'
import { IoReceiptOutline } from 'react-icons/io5'

const NavBar = () => {
  const navigationLists = [
    {
      text: 'Products',
      href: '/products',
      icon: <BsBox />,
    },
    {
      text: 'Orders',
      href: '/orders',
      icon: <IoReceiptOutline />,
    },
    {
      text: 'Redemption Codes',
      href: '/codes',
      icon: <CiBarcode />,
    },
  ]

  return (
    <div className='h-full bg-cyan-600 text-white flex flex-col gap-4 items-center w-[280px] py-4 shadow rounded-r-2xl'>
      <p className='font-bold text-center text-xl'>
        Management <br />
        System
      </p>
      <div className='flex flex-col w-full cursor-pointer'>
        {navigationLists.map((list) => (
          <Link
            key={list.text}
            href={list.href}
            className='h-12 w-full text-center flex gap-4 items-center justify-start px-4 hover:bg-cyan-500'
          >
            {list.icon} {list.text}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavBar
