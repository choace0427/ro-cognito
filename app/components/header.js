'use client';
import React, { useState, useEffect } from 'react';
import { Navbar, MobileNav, Typography, Button, IconButton, Card, Menu, MenuHandler, MenuList, MenuItem, Avatar } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

export function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [user, setUser] = useState('');
  const router = useRouter();

  const handleSignOut = () => {
    console.log('sdddd');
    const userData = {
      email: 'jacobkevin0427@gmail.com',
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/auth/signout`, userData)
      .then((res) => {
        if (res.data.statusCode === 500) {
          toast.error(res.data.message);
        } else {
          localStorage.removeItem('user');
          router.push('/signin');
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  useEffect(() => {
    const Data = localStorage.getItem('user');
    if (Data) setUser(JSON.parse(Data));
    else router.push('signin');
  }, []);

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
              <div className='mr-4 hidden lg:block'>
                <Menu placement='bottom-end'>
                  <MenuHandler>
                    <Typography>Service</Typography>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <Link href='weather'>Today's weather</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <div className='flex items-center gap-x-1'>
                {!user ? (
                  <>
                    <Button variant='outlined' size='sm' className='hidden lg:inline-block' onClick={() => router.push('/signin')}>
                      <span>Log In</span>
                    </Button>
                    <Button variant='gradient' size='sm' className='hidden lg:inline-block'>
                      <span>Sign Up</span>
                    </Button>
                  </>
                ) : (
                  // <Button
                  //   variant='gradient'
                  //   size='sm'
                  //   className='hidden lg:inline-block'
                  //   onClick={() => handleSignOut()}
                  // >
                  //   <span>Sing Out</span>
                  // </Button>
                  <Menu placement='bottom-end'>
                    <MenuHandler>
                      <div className='flex gap-3'>
                        <Avatar src='avatar.png' />
                        <Typography />
                      </div>
                    </MenuHandler>
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem className='text-red' onClick={() => handleSignOut()}>
                        Log out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </div>
              <IconButton
                variant='text'
                className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' className='h-6 w-6' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            <div className='flex items-center gap-x-1'>
              {!user ? (
                <>
                  <Button variant='outlined' size='sm' className='hidden lg:inline-block' onClick={() => router.push('/signin')}>
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
  );
}
