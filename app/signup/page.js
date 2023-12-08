'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'

export default function LoginCard() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailvaild, setEmailvalid] = useState()

  const [verification, setVerification] = useState(false)
  const [verifycode, setVerifyCode] = useState()
  const [finishsignup, setFinishSignUp] = useState(false)

  const validateEmail = (email) => {
    const pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return pattern.test(String(email).toLowerCase())
  }

  const handleVerifyCode = (code) => {
    const input = code
    if (input.length <= 6) {
      setVerifyCode(input)
    }
  }

  const handleRegister = async () => {
    if (email && validateEmail(email)) setEmailvalid(false)
    else setEmailvalid(true)
    if (password.length > 5) {
      const registerData = {
        email: email,
        password: password,
      }
      const data = await axios
        .post('http://localhost:4000/development/api/auth/signup', registerData)
        .then((res) => {
          console.log(res)
          if (res.data.statusCode === 500) {
            toast.error(res.data.message)
          } else {
            toast.success('Register Successfull!')
            setVerification(true)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
      console.log(data)
    }
  }

  const handleVerification = async () => {
    if (verifycode) {
      const verifyData = {
        email: email,
        code: verifycode,
      }
      const data = await axios
        .post('http://localhost:4000/development/api/auth/verify', verifyData)
        .then((res) => {
          console.log(res)
          if (res.data.statusCode === 500) {
            toast.error(res.data.message)
          } else {
            toast.success(res.data.message)
            setFinishSignUp(true)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }

  return (
    <>
      {!verification ? (
        <Card className='w-96'>
          <ToastContainer />
          <CardHeader variant='gradient' color='gray' className='mb-4 grid h-28 place-items-center'>
            <Typography variant='h3' color='white'>
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className='flex flex-col gap-4'>
            <Input label='Email' size='lg' onChange={(e) => setEmail(e.target.value)} error={emailvaild} />
            <Input
              label='Password'
              size='lg'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              //   error={passwordvalid}
            />
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' />
            </div>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button variant='gradient' fullWidth onClick={handleRegister}>
              Sign Up
            </Button>
            <Typography variant='small' className='mt-6 flex justify-center'>
              Don&apos;t have an account?
              <Typography as='a' href='/signin' variant='small' color='blue-gray' className='ml-1 font-bold'>
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      ) : (
        <>
          {!finishsignup ? (
            <Card className='w-96'>
              <ToastContainer />
              <CardHeader variant='gradient' color='gray' className='mb-4 grid h-28 place-items-center'>
                <Typography variant='h3' color='white'>
                  Email Verification
                </Typography>
              </CardHeader>
              <CardBody className='flex flex-col gap-4'>
                <Input
                  label='Verification Code'
                  type='number'
                  size='lg'
                  onChange={(e) => handleVerifyCode(e.target.value)}
                  value={verifycode}
                  inputMode='numeric'
                />
              </CardBody>
              <CardFooter className='pt-0'>
                <Button variant='gradient' fullWidth onClick={handleVerification}>
                  Verification
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className='w-96'>
              <ToastContainer />
              <CardHeader variant='gradient' color='green' className='mb-4 grid h-28 place-items-center'>
                <Typography variant='h3' color='white'>
                  Success
                </Typography>
              </CardHeader>
              <CardFooter className='pt-0'>
                <Button variant='gradient' fullWidth onClick={() => router.push('/signin')}>
                  Go To Dashboard
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
    </>
  )
}
