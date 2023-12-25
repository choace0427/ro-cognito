'use client'
import React, { useState, useEffect } from 'react'
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export function Header() {
  const [openNav, setOpenNav] = useState(false)
  const [user, setUser] = useState('')
  const router = useRouter()

  const handleSignOut = () => {
    const userData = {
      email: 'jacobkevin0427@gmail.com',
    }
    axios
      .post('http://localhost:4000/development/api/auth/signout', userData)
      .then((res) => {
        if (res.data.statusCode === 500) {
          toast.error(res.data.message)
        } else {
          localStorage.removeItem('user')
          router.push('/signin')
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  useEffect(() => {
    const Data = localStorage.getItem('user')
    if (Data) setUser(JSON.parse(Data))
    else router.push('signin')
  }, [])

  const navList = (
    <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='#' className='flex items-center'>
          Pages
        </a>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='#' className='flex items-center'>
          Account
        </a>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='#' className='flex items-center'>
          Blocks
        </a>
      </Typography>
      <Typography as='li' variant='small' color='blue-gray' className='p-1 font-normal'>
        <a href='#' className='flex items-center'>
          Docs
        </a>
      </Typography>
    </ul>
  )
  return (
    <>
      <ToastContainer />
      <div className='max-h-[768px]'>
        <Navbar className='h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4'>
          <div className='flex items-center justify-between text-blue-gray-900'>
            <Typography as='a' href='#' className='mr-4 cursor-pointer py-1.5 font-medium'>
              Rookie
            </Typography>
            <div className='flex items-center gap-4'>
              <div className='mr-4 hidden lg:block'>{navList}</div>
              <div className='flex items-center gap-x-1'>
                {!user ? (
                  <>
                    <Button
                      variant='outlined'
                      size='sm'
                      className='hidden lg:inline-block'
                      onClick={() => router.push('/signin')}
                    >
                      <span>Log In</span>
                    </Button>
                    <Button variant='gradient' size='sm' className='hidden lg:inline-block'>
                      <span>Sign Up</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant='gradient'
                    size='sm'
                    className='hidden lg:inline-block'
                    onClick={() => handleSignOut()}
                  >
                    <span>Sing Out</span>
                  </Button>
                )}
              </div>
              <IconButton
                variant='text'
                className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    className='h-6 w-6'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            {navList}
            <div className='flex items-center gap-x-1'>
              {!user ? (
                <>
                  <Button
                    variant='outlined'
                    size='sm'
                    className='hidden lg:inline-block'
                    onClick={() => router.push('/signin')}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button variant='gradient' size='sm' className='hidden lg:inline-block'>
                    <span>Sign Up</span>
                  </Button>
                </>
              ) : (
                <Button variant='gradient' size='sm' className='hidden lg:inline-block' onClick={() => handleSignOut()}>
                  <span>Sing Out</span>
                </Button>
              )}
            </div>
          </MobileNav>
        </Navbar>
      </div>
    </>
  )
}
