import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Grid, TextField } from '@mui/material'
import { Theater } from 'src/@core/layouts/types'
import { useState } from 'react'
import useFetch from 'src/@core/utils/use-fetch'
import { TheaterCreateEndpoint, TheaterUpdateEndpoint } from 'src/configs/appConfig'

const CinemaDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const CinemaInfo = ({
  selectedCinema,
  closeCinemaInfo,
  updatedCinemaInfo
}: {
  selectedCinema: Theater
  closeCinemaInfo: any
  updatedCinemaInfo: any
}) => {
  const { name: name } = selectedCinema
  const [cinemaInfo, setCinemaInfo] = useState<Theater>(selectedCinema)
  const { fetchData, response, error, loading } = useFetch()
  const saveCinemaInfo = () => {
    const path = selectedCinema.id
      ? TheaterUpdateEndpoint.path.replace(':id', cinemaInfo.id.toString())
      : TheaterCreateEndpoint.path
    const method = selectedCinema.id ? TheaterUpdateEndpoint.method : TheaterCreateEndpoint.method
    fetchData(method, path, undefined, cinemaInfo).then(res => {
      if (res && res.success) {
        updatedCinemaInfo()
        closeCinemaInfo()
      }
    })
  }

  return (
    <CinemaDialog onClose={closeCinemaInfo} aria-labelledby='customized-dialog-title' open={true}>
      <DialogTitle>{selectedCinema.id ? name : 'New Cinema'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Name'
              value={cinemaInfo.name}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  name: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Address'
              value={cinemaInfo.address}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  address: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='City'
              value={cinemaInfo.city}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  city: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Country'
              value={cinemaInfo.country}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  country: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Latitude'
              value={cinemaInfo.latitude}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  latitude: parseFloat(e.target.value)
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Longitude'
              value={cinemaInfo.longitude}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  longitude: parseFloat(e.target.value)
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Phone'
              value={cinemaInfo.phone}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  phone: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Email'
              value={cinemaInfo.email}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  email: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Website'
              value={cinemaInfo.website}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  website: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Manager ID'
              value={cinemaInfo.manager?.id || ''}
              onChange={e =>
                setCinemaInfo({
                  ...cinemaInfo,
                  manager: {
                    ...cinemaInfo.manager,
                    id: e.target.value
                  }
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type='submit' variant='contained' size='large' onClick={saveCinemaInfo}>
          Save
        </Button>
      </DialogActions>
    </CinemaDialog>
  )
}
export default CinemaInfo
