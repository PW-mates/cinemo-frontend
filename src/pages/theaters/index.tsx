import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Cinema } from "src/@core/layouts/types"

import { useLoadScript } from "@react-google-maps/api";

import CinemasList from 'src/views/cinemas/CinemasList'
import Map from 'src/views/cinemas/Map'


const Cinemas = () => {

  const [cinemasData, setCinemasData] = useState<Cinema[]>([])

  // ToDo tmp function
  function createData(id: Cinema["id"], name: Cinema["name"], 
  address: Cinema["address"], phone: Cinema["phone"], email: Cinema["email"], 
  website: Cinema["website"], location: Cinema["location"]): Cinema {

    return { id, name, address, phone, email, website, location }
  }

  // ToDo tmp 
  const rows: Cinema[] = [
    createData(1, "test1", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 52.5, lng: 21.5 }),
    createData(2, "test2", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 40, lng: 20 }),
    createData(3, "test3", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 57, lng: 23 }),
    createData(4, "test4", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 50, lng: 20 }),
    createData(5, "test5", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 51, lng: 20.5 }),
    createData(6, "test6", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 60, lng: 60 }),
    createData(7, "test7", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 60, lng: 60 }),
    createData(8, "test8", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 60, lng: 60 }),
    createData(9, "test9", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/", { lat: 60, lng: 60 }),
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
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY == undefined ? "" : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

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
