'use client';
import { useEffect, useState } from 'react';
import { Avatar, Button, Card, CardHeader, Typography } from '@material-tailwind/react';
import { useGeolocated } from 'react-geolocated';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';
import axios from 'axios';
import { IconDropletHalf2, IconSun, IconTemperature, IconWind } from '@tabler/icons-react';
import moment from 'moment';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const handleAddress = (adr) => {
  console.log('111111111111', adr);
};

console.log(moment('01/01/1999', 'MM/DD/YYYY'));

export default function Weather() {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [currentData, setCurrentData] = useState();
  const [todayForecast, setTodayForecast] = useState();
  const [weekForecast, setWeekForecast] = useState();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords?.latitude !== position.latitude || coords?.longitude !== position.longitude) {
      setPosition({ latitude: coords?.latitude, longitude: coords?.longitude });
    }
  }, [coords]);

  useEffect(() => {
    const fetchData = async () => {
      if (position?.latitude !== 0 && position?.longitude !== 0) {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_WEATHER_API}/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${coords?.latitude},${coords?.longitude}&aqi=yes`
          )
          .then((res) => {
            setCurrentData(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });

        await axios
          .get(
            `${process.env.NEXT_PUBLIC_WEATHER_API}/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${coords?.latitude},${coords?.longitude}&days=1&aqi=yes&alerts=yes`
          )
          .then((res) => {
            setTodayForecast(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });
        //api.weatherapi.com/v1/forecast.json?key=5e81cc9a89754221b8854532231110&q=10.99835602, 77.01502627&days=7&aqi=yes&alerts=yes

        https: await axios
          .get(
            `${process.env.NEXT_PUBLIC_WEATHER_API}/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${coords?.latitude},${coords?.longitude}&days=7&aqi=yes&alerts=yes`
          )
          .then((res) => {
            setWeekForecast(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    fetchData();
  }, [coords, position]);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  console.log('qqqqqqqqqqqqqqqq', weekForecast);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = useState(null);

  return (
    <div>
      {/* <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
        style={{ width: '60%' }}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        options={{
          types: ['(regions)'],
          componentRestrictions: { country: 'ru' },
        }}
        className='border-black border-[1px] text-black'
      /> */}
      <div className='flex gap-9 min-w-[1300px] justify-center'>
        <div className='w-full'>
          <div className='flex gap-9 justify-between px-9 w-full'>
            <div className='flex flex-col justify-around mb-7'>
              <Typography variant='h2'>{currentData?.location.country}</Typography>
              <Typography variant='h1'>{currentData?.current.temp_c}</Typography>
            </div>
            <Avatar src={currentData?.current.condition.icon} className='w-[200px] h-[200px]' />
          </div>
          <div className='bg-[#202b3c] p-[30px] rounded-3xl text-[#8b949f] w-full'>
            <div className=' uppercase'>today's forecast</div>
            <div className='flex gap-3 mt-3'>
              {todayForecast?.forecast.forecastday[0].hour.map((item, index) => {
                if (index % 4 === 0)
                  return (
                    <>
                      <div className='flex flex-col gap-1 items-center w-full'>
                        <Typography className='flex gap-4 font-semibold'>{moment(item?.time).format('h:mm A')}</Typography>
                        <Avatar src={item.condition?.icon} className='w-[80px] h-[80px]' />
                        <Typography variant='h4'>{item.temp_c}</Typography>
                      </div>
                    </>
                  );
              })}
            </div>
          </div>
          <div className='bg-[#202b3c] p-[30px] rounded-3xl text-[#8b949f] mt-6'>
            <div className='flex w-full justify-between items-center'>
              <div className=' uppercase'>air conditions</div>
              <Button color='#c5cad4'>See more</Button>
            </div>
            <div className='grid grid-cols-2 gap-6 mt-4'>
              <div className='col-span-1'>
                <Typography className='flex gap-2 items-center' variant='h4'>
                  <IconTemperature />
                  Real Feel
                </Typography>

                <Typography variant='h4' className='ml-[34px] font-extrabold text-[#c5cad4]'>
                  {currentData?.current.feelslike_c}
                </Typography>
              </div>
              <div className='col-span-1'>
                <Typography className='flex gap-2 items-center' variant='h4'>
                  <IconWind />
                  Wind
                </Typography>
                <Typography variant='h4' className='ml-[34px] font-extrabold text-[#c5cad4]'>
                  {currentData?.current.wind_kph} km/h
                </Typography>
              </div>
              <div className='col-span-1'>
                <Typography className='flex gap-2 items-center' variant='h4'>
                  <IconDropletHalf2 />
                  Change of Rain
                </Typography>
                <Typography variant='h4' className='ml-[34px] font-extrabold text-[#c5cad4]'>
                  {currentData?.current.is_day}%
                </Typography>
              </div>
              <div className='col-span-1'>
                <Typography className='flex gap-2 items-center' variant='h4'>
                  <IconSun />
                  UV Index
                </Typography>
                <Typography variant='h4' className='ml-[34px] font-extrabold text-[#c5cad4]'>
                  {currentData?.current.uv}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[#202b3c] w-[600px] p-[30px] rounded-3xl text-[#8b949f]'>
          <div className=' uppercase'>7-Day forecast</div>
          <div className='flex flex-col gap-3 justify-evenly h-full max-h-[650px]'>
            {weekForecast?.forecast.forecastday[0].hour.map((item, index) => {
              if ((index - 1) % 4 === 0)
                return (
                  <>
                    <div>
                      <div className='flex items-center w-full relative'>
                        <div className='flex gap-4'>{moment(item?.time).format('dddd')}</div>
                        <div className='flex left-28 absolute items-center'>
                          <Avatar src={item.condition?.icon} className='w-[80px] h-[80px]' />
                          <Typography>{item.condition?.text}</Typography>
                        </div>
                        <Typography className=' absolute right-0'>{item.temp_c}</Typography>
                      </div>
                      {index !== 22 && <hr className='mt-4' />}
                    </div>
                  </>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
