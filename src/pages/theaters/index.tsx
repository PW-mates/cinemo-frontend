// ** MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import { useLoadScript } from "@react-google-maps/api";

import { useState, useEffect } from 'react';

import TheatersList from 'src/views/theaters/TheatersList'
import Map from 'src/views/theaters/Map'

// ToDo 
type Cinema = {
  id: number
  name: string
  address: string
  phone: string
  email: string
  website: string
}


const Theaters = () => {

  const [cinemaData, setCinemaData] = useState<Cinema[]>([])

  // ToDo tmp function
  function createData(id: number, name: string, address: string, phone: string, email: string, website: string): Cinema {
    return { id, name, address, phone, email, website }
  }

  // ToDo tmp 
  const rows: Cinema[] = [
    createData(1, "test1", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(2, "test2", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(3, "test3", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(4, "test4", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(5, "test5", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(6, "test6", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(7, "test7", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(8, "test8", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
    createData(9, "test9", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  ]

  const fetchCinemaData = async () => {
    try {
      // ToDo 
      const data = await rows

      if (data) {
        setCinemaData(data)
      } else {
        setCinemaData([])
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCinemaData()
  }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={16}>
        <Card>
          <CardHeader title='Theaters' titleTypographyProps={{ variant: 'h6' }} />
          <TheatersList cinemaData={cinemaData} />
        </Card>
      </Grid>
      <Grid item xs={16}>
        {!isLoaded ? <div>Loading...</div> : <Map />}
      </Grid>
    </Grid>
  )
}

export default Theaters
