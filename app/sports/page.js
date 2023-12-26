'use client';
import { useState, useEffect } from 'react';
import { List, ListItem, Card, Avatar, Typography, Input, Button } from '@material-tailwind/react';
import { useGeolocated } from 'react-geolocated';
import axios from 'axios';
import { IconBallFootball, IconBallFootballOff, IconBuildingStadium } from '@tabler/icons-react';

export default function Home() {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [sportData, setSportsData] = useState();
  const [type, setType] = useState();
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const handleSearch = async () => {
    setLoading(true);
    if (position?.latitude !== 0 && position?.longitude !== 0) {
      await axios
        .get(`${process.env.NEXT_PUBLIC_WEATHER_API}/sports.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${country}`)
        .then((res) => {
          setSportsData(res?.data);
          Object.keys(res?.data).map((item, index) => {
            if (index === 0) setType(item);
          });
          setLoading(false);
          setCountry('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (coords?.latitude !== position.latitude || coords?.longitude !== position.longitude) {
      setPosition({ latitude: coords?.latitude, longitude: coords?.longitude });
    }
  }, [coords]);

  useEffect(() => {
    const fetchData = async () => {
      if (position?.latitude !== 0 && position?.longitude !== 0) {
        await axios
          .get(`${process.env.NEXT_PUBLIC_WEATHER_API}/sports.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=england`)
          .then((res) => {
            setSportsData(res?.data);
            Object.keys(res?.data).map((item, index) => {
              if (index === 0) setType(item);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    fetchData();
  }, [coords, position]);

  if (type !== undefined && sportData) console.log(sportData[type]);
  return (
    <div className='my-10'>
      <div className='flex gap-5'>
        <Input label='City' value={country} onChange={(e) => setCountry(e.target.value)} />
        <Button variant='outlined' onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className='flex gap-10 mt-5'>
        <Card className='w-30 h-fit'>
          <List>
            {sportData &&
              Object.keys(sportData).map((item) => {
                return (
                  <ListItem key={item} onClick={() => setType(item)}>
                    <div className='flex gap-1 items-center'>
                      <Avatar src={`${item}.svg`} className='w-[24px] h-[24px]' />
                      <Typography variant='h5'>{item}</Typography>
                    </div>
                  </ListItem>
                );
              })}
          </List>
        </Card>
        <Card>
          <div className='grid xl:grid-cols-2 gap-5'>
            {sportData && type ? (
              sportData[type].map((item) => {
                return (
                  //   <Card className=' p-6'>
                  //     <div className='flex gap-3 items-center'>
                  //       <Avatar src={`${type}.svg`} className='w-[90px] h-[90px]' />
                  //       <div>
                  //         <div className='flex gap-2 items-center'>
                  //           <Typography variant='h6'> Country:</Typography>
                  //           <Typography variant='h5'>{item.country}</Typography>
                  //         </div>
                  //         <div className='flex gap-2 items-center'>
                  //           <Typography variant='h6'> Tournament:</Typography>
                  //           <Typography variant='h5'>{item.tournament}</Typography>
                  //         </div>
                  //         <div className='flex gap-3 items-center'>
                  //           <Typography variant='h6'>Stadium:</Typography>
                  //           <Typography variant='h5'>{item.stadium}</Typography>
                  //         </div>
                  //       </div>
                  //     </div>
                  //     <div className='flex gap-1 items-center my-3'>
                  //       <Typography variant='h5'>{item.match.split('vs')[0]}</Typography>
                  //       <Avatar src='vs.svg' className='w-[30px] h-[30px]' />
                  //       <Typography variant='h5'>{item.match.split('vs')[1]}</Typography>
                  //     </div>
                  //     <div className='flex gap-1 items-center'>
                  //       <Typography variant='h6'>Start Date:</Typography>
                  //       <Typography variant='h5'>{item.start}</Typography>
                  //     </div>
                  //   </Card>
                  <div className='w-[500px] h-[200px]'>123123</div>
                );
              })
            ) : (
              <div className='w-[500px] h-[200px]'>123123</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
