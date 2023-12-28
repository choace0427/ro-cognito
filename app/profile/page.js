'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Avatar,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Button,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

export default function Home() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [infoState, setInfoState] = useState(false);
  const [passState, setPassState] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    address: '',
    phone: '',
    birthday: '',
    avatar: '',
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'));
    if (token) {
      setUser(decodeToken(token?.IdToken));
    }
  }, []);

  const handleUpdateInfo = () => {
    setLoading(true);
    const userInfo = {
      email: user.email,
      info,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/users/create`, userInfo)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className='flex gap-9'>
      <Card className='w-96'>
        <CardHeader floated={false} className='h-80 flex justify-center align-center'>
          <Avatar src='avatar.png' className='w-[300px] h-[300px]' />
        </CardHeader>
        <CardBody className='text-center'>
          <Typography variant='h4' color='blue-gray' className='mb-2'>
            {user?.email}
          </Typography>
          <Typography color='blue-gray' className='font-medium' textGradient>
            CEO / Co-Founder
          </Typography>
        </CardBody>
        <CardFooter className='flex justify-center gap-7 pt-2'>
          <Tooltip content='Like'>
            <Typography as='a' href='#facebook' variant='lead' color='blue' textGradient>
              <i className='fab fa-facebook' />
            </Typography>
          </Tooltip>
          <Tooltip content='Follow'>
            <Typography as='a' href='#twitter' variant='lead' color='light-blue' textGradient>
              <i className='fab fa-twitter' />
            </Typography>
          </Tooltip>
          <Tooltip content='Follow'>
            <Typography as='a' href='#instagram' variant='lead' color='purple' textGradient>
              <i className='fab fa-instagram' />
            </Typography>
          </Tooltip>
        </CardFooter>
      </Card>
      <Card className=' w-[500px] h-fit'>
        <Tabs value='person_info'>
          <TabsHeader>
            <Tab value='person_info'>
              <div className='flex items-center gap-2'>General Info</div>
            </Tab>
            <Tab value='setting'>
              <div className='flex items-center gap-2'>Setting</div>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value='person_info'>
              <div className='flex flex-col gap-4'>
                <Input
                  label='Full Name'
                  size='lg'
                  value={info.name}
                  onChange={(e) => {
                    setInfo({ ...info, name: e.target.value });
                    // setInfoState(true);
                  }}
                />
                <Input
                  label='Phone'
                  size='lg'
                  value={info.phone}
                  onChange={(e) => {
                    setInfo({ ...info, phone: e.target.value });
                    // setInfoState(true);
                  }}
                />
                <Input
                  label='Birthday'
                  type='date'
                  size='lg'
                  value={info.phone}
                  onChange={(e) => {
                    setInfo({ ...info, birthday: e.target.value });
                    // setInfoState(true);
                  }}
                />
                <Input
                  label='Address'
                  size='lg'
                  value={info.address}
                  onChange={(e) => {
                    setInfo({ ...info, address: e.target.value });
                    // setInfoState(true);
                  }}
                />
                <div className='flex gap-4 w-full'>
                  <Button variant='outlined' className='w-full' loading={false} onClick={() => handleUpdateInfo()}>
                    Update
                  </Button>
                  {infoState && (
                    <Button
                      variant='gradient'
                      color='red'
                      className='w-full'
                      onClick={() => {
                        setInfo({ name: '', address: '', phone: '', birthday: '', avatar: '' });
                        setInfoState(false);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value='setting'>
              <div className='flex flex-col gap-4'>
                <Input type='password' label='Old Password' size='lg' />
                <Input type='password' label='New Password' size='lg' />
                <Input type='password' label='Confirm Password' size='lg' />
                <div className='flex gap-4 w-full'>
                  <Button variant='outlined' className='w-full' loading={true}>
                    Change Password
                  </Button>
                  {passState && (
                    <Button
                      variant='gradient'
                      color='red'
                      className='w-full'
                      onClick={() => {
                        setPassState(false);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </Card>
    </div>
  );
}
