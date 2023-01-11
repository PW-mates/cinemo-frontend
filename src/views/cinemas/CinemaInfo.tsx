import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Grid, MenuItem, Select, TextField } from '@mui/material'
import { ShortUser, Theater } from 'src/@core/layouts/types'
import { useEffect, useState } from 'react'
import useFetch from 'src/@core/utils/use-fetch'
import {
  AccountListEndpoint,
  TheaterCreateEndpoint,
  TheaterDeleteEndpoint,
  TheaterUpdateEndpoint
} from 'src/configs/appConfig'

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
  const [users, setUsers] = useState<ShortUser[]>([])
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

  const deleteCinemaInfo = () => {
    const path = TheaterDeleteEndpoint.path.replace(':id', cinemaInfo.id.toString())
    const method = TheaterDeleteEndpoint.method
    fetchData(method, path, undefined, cinemaInfo).then(res => {
      if (res && res.success) {
        updatedCinemaInfo()
        closeCinemaInfo()
      }
    })
  }

  const getUsers = async () => {
    const response = await fetchData(AccountListEndpoint.method, AccountListEndpoint.path)
    if (response && response.success) {
      return response.data
    }
  }

  useEffect(() => {
    if (!users.length) {
      getUsers().then(data => {
        setUsers(data)
      })
    }
  }, [users])

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
            <Select
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
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type='submit' variant='outlined' color='error' size='medium' onClick={deleteCinemaInfo}>
          Delete
        </Button>
        <Button autoFocus type='submit' variant='contained' size='large' onClick={saveCinemaInfo}>
          Save
        </Button>
      </DialogActions>
    </CinemaDialog>
  )
}
export default CinemaInfo
