'use client'
import { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from '@material-tailwind/react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [forget, setForget] = useState(false)
  const [reset, setReset] = useState(false)
  const [resetcode, setResetCode] = useState('')
  const [resetpassword, setResetPassword] = useState('')
  const [email, setEmail] = useState('')

  const [signEmail, setSignEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    if (signEmail && password) {
      const signinData = {
        email: signEmail,
        password: password,
      }

      await axios
        .post('http://localhost:4000/development/api/auth/signin', signinData)
        .then((res) => {
          if (res.data.statusCode === 500) {
            toast.error(res.data.message)
          } else {
            if (res.data.AuthenticationResult) {
              localStorage.setItem('user', JSON.stringify(res.data.AuthenticationResult))
              toast.success('Sign In successfully')
              router.push('/dashboard')
            }
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }

  const handleForgetPassword = async () => {
    if (email) {
      const forgetData = {
        email: email,
      }
      await axios
        .post('http://localhost:4000/development/api/auth/forgetpassword', forgetData)
        .then((res) => {
          if (res.data.statusCode === 500) {
            toast.error(res.data.message)
          } else {
            toast.success('Register Successfull!')
            setReset(true)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }

  const handleVerify = async () => {
    if (resetcode) {
      const verificationData = {
        email: email,
        code: resetcode,
        password: resetpassword,
      }
      await axios
        .post('http://localhost:4000/development/api/auth/resetpassword', verificationData)
        .then((res) => {
          if (res.data.statusCode === 500) {
            toast.error(res.data.message)
          } else {
            toast.success(res.data.message)
            setForget(true)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }

  return (
    <>
      <ToastContainer />
      {!forget ? (
        <Card className='w-96'>
          <CardHeader variant='gradient' color='gray' className='mb-4 grid h-28 place-items-center'>
            <Typography variant='h3' color='white'>
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className='flex flex-col gap-4'>
            <Input label='Email' size='lg' value={signEmail} onChange={(e) => setSignEmail(e.target.value)} />
            <Input
              label='Password'
              type='password'
              size='lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='w-full flex justify-between items-center'>
              <div className='-ml-2.5'>
                <Checkbox label='Remember Me' />
              </div>
              <Typography className=' cursor-pointer underline' onClick={() => setForget(true)}>
                Forgot Password
              </Typography>
            </div>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button variant='gradient' fullWidth onClick={() => handleSignIn()}>
              Sign In
            </Button>
            <Typography variant='small' className='mt-6 flex justify-center'>
              Don&apos;t have an account?
              <Typography as='a' href='/signup' variant='small' color='blue-gray' className='ml-1 font-bold'>
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      ) : (
        <>
          {!reset ? (
            <Card className='w-96'>
              <ToastContainer />
              <CardHeader variant='gradient' color='gray' className='mb-4 grid h-28 place-items-center'>
                <Typography variant='h3' color='white'>
                  Email
                </Typography>
              </CardHeader>
              <CardBody className='flex flex-col gap-4'>
                <Input label='Email' type='text' size='lg' onChange={(e) => setEmail(e.target.value)} value={email} />
              </CardBody>
              <CardFooter className='pt-0'>
                <Button variant='gradient' fullWidth onClick={() => handleForgetPassword()}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className='w-96'>
              <ToastContainer />
              <CardHeader variant='gradient' color='gray' className='mb-4 grid h-28 place-items-center'>
                <Typography variant='h3' color='white'>
                  Reset Password
                </Typography>
              </CardHeader>
              <CardBody className='flex flex-col gap-4'>
                <Input
                  label='Verification Code'
                  type='number'
                  size='lg'
                  onChange={(e) => setResetCode(e.target.value)}
                  value={resetcode}
                  inputMode='numeric'
                />
                <Input
                  label='Reset Password'
                  type='password'
                  size='lg'
                  onChange={(e) => setResetPassword(e.target.value)}
                  value={resetpassword}
                />
              </CardBody>
              <CardFooter className='pt-0'>
                <Button variant='gradient' fullWidth onClick={() => handleVerify()}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
    </>
  )
}
