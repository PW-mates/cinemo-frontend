import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Theater } from 'src/@core/layouts/types'
import { User } from 'src/@core/layouts/types'

import { useLoadScript } from '@react-google-maps/api'

import CinemasList from 'src/views/cinemas/CinemasList'
import Map from 'src/views/cinemas/Map'

const Cinemas = () => {
  const [cinemasData, setCinemasData] = useState<Theater[]>([])

  // ToDo tmp function
  function createData(
    id: Theater['id'],
    name: Theater['name'],
    address: Theater['address'],
    phone: Theater['phone'],
    email: Theater['email'],
    website: Theater['website'],
    latitude: Theater['latitude'],
    longitude: Theater['longitude'],
    city: Theater['city'],
    country: Theater['country'],
    manager: Theater['manager']
  ): Theater {
    return { id, name, address, phone, email, website, latitude, longitude, city, country, manager }
  }

  // tmp
  const manager: User = {
    id: '1',
    access_token: '001',
    gender: 'male',
    createdAt: new Date(2022, 10),
    email: 'test@gmail',
    firstName: 'T',
    lastName: 'est',
    updatedAt: new Date(2022, 11),
    username: 'username',
    status: 'inactive',
    role: 'user'
  }
  // ToDo tmp
  const rows: Theater[] = [
    createData(
      '1',
      'test1',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      52.5,
      21.5,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '2',
      'test2',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      40,
      20,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '3',
      'test3',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      57,
      23,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '4',
      'test4',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      50,
      20,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '5',
      'test5',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      51,
      20.5,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '6',
      'test6',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      60,
      60,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '7',
      'test7',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      60,
      60,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '8',
      'test8',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      60,
      60,
      'Warsaw',
      'Poland',
      manager
    ),
    createData(
      '9',
      'test9',
      'addres string',
      'phone string',
      'email string',
      'https://www.cinema-city.pl/kina/arkadia/1074#/',
      60,
      60,
      'Warsaw',
      'Poland',
      manager
    )
  ]

  const fetchCinemaData = async () => {
    try {
      // ToDo
      const data = await rows

      if (data) {
        setCinemasData(data)
      } else {
        setCinemasData([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCinemaData()
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY == undefined ? '' : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={16}>
        <Card>
          <CardHeader title='Cinemas' titleTypographyProps={{ variant: 'h6' }} />
          <CinemasList cinemasData={cinemasData} />
        </Card>
      </Grid>
      <Grid item xs={16}>
        {!isLoaded ? <div>Loading...</div> : <Map cinemaData={cinemasData} />}
      </Grid>
    </Grid>
  )
}

export default Cinemas
