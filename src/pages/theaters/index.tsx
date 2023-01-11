import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Theater } from 'src/@core/layouts/types'
import { User } from 'src/@core/layouts/types'

import { useLoadScript } from '@react-google-maps/api'

import CinemasList from 'src/views/cinemas/CinemasList'
import Map from 'src/views/cinemas/Map'
import useFetch from 'src/@core/utils/use-fetch'
import { TheaterListEndpoint } from 'src/configs/appConfig'
import { Button, CardActions, Dialog, DialogContent, DialogTitle } from '@mui/material'
import CinemaInfo from 'src/views/cinemas/CinemaInfo'

const Cinemas = () => {
  const [cinemasData, setCinemasData] = useState<Theater[] | undefined>(undefined)
  const [dialogMap, setDialogMap] = useState<boolean>(false)
  const [dialogNewCinema, setDialogNewCinema] = useState<boolean>(false)
  const [newCinema, setNewCinema] = useState<Theater | undefined>(undefined)
  const { fetchData, response, error, loading } = useFetch()
  const fetchCinemaList = () => {
    fetchData(TheaterListEndpoint.method, TheaterListEndpoint.path).then(res => {
      if (res && res.success) {
        setCinemasData(res.data)
      }
    })
  }
  useEffect(() => {
    if (cinemasData == undefined) {
      fetchCinemaList()
    }
  }, [cinemasData])

  const updatedCinemaInfo = () => {
    fetchCinemaList()
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY == undefined ? '' : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  const newCinemaDialog = () => {
    setNewCinema({} as Theater)
    setDialogNewCinema(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={16}>
        <Card>
          <CardHeader title='Cinemas' titleTypographyProps={{ variant: 'h6' }}></CardHeader>
          <CardActions className='card-action-dense' sx={{ width: '100%' }}>
            <Button onClick={newCinemaDialog}>Add new</Button>
            <Button
              onClick={() => {
                setDialogMap(true)
              }}
            >
              Show in map
            </Button>
          </CardActions>

          {cinemasData !== undefined ? (
            <CinemasList cinemasData={cinemasData || []} updatedCinemaInfo={updatedCinemaInfo} />
          ) : null}
        </Card>
      </Grid>
      {dialogNewCinema && newCinema ? (
        <CinemaInfo
          selectedCinema={newCinema}
          closeCinemaInfo={() => setDialogNewCinema(false)}
          updatedCinemaInfo={updatedCinemaInfo}
        ></CinemaInfo>
      ) : null}
      <Dialog
        open={dialogMap}
        fullWidth
        maxWidth='lg'
        onClose={() => {
          setDialogMap(false)
        }}
      >
        <DialogTitle>Cinema Map</DialogTitle>
        <DialogContent>
          {cinemasData == undefined ? <div>Loading...</div> : <Map cinemaData={cinemasData || []} />}
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default Cinemas
