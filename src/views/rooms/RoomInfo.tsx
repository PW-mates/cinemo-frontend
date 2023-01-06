import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Grid, MenuItem, Select, TextField } from '@mui/material'
import { Room, ShortUser, Theater } from 'src/@core/layouts/types'
import { useEffect, useState } from 'react'
import useFetch from 'src/@core/utils/use-fetch'
import {
  AccountListEndpoint,
  RoomCreateEndpoint,
  RoomDeleteEndpoint,
  RoomUpdateEndpoint,
  TheaterCreateEndpoint,
  TheaterDeleteEndpoint,
  TheaterListEndpoint,
  TheaterUpdateEndpoint
} from 'src/configs/appConfig'

const RoomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const RoomInfo = ({
  selectedRoom,
  closeRoomInfo,
  updatedRoomInfo
}: {
  selectedRoom: Room
  closeRoomInfo: any
  updatedRoomInfo: any
}) => {
  const { name: name } = selectedRoom
  const [roomInfo, setRoomInfo] = useState<Room>(selectedRoom)
  const [cinemas, setCinemas] = useState<Theater[]>([])
  const { fetchData, response, error, loading } = useFetch()
  const saveRoomInfo = () => {
    const path = selectedRoom.id
      ? RoomUpdateEndpoint.path.replace(':id', roomInfo.id.toString())
      : RoomCreateEndpoint.path
    const method = selectedRoom.id ? RoomUpdateEndpoint.method : RoomCreateEndpoint.method
    fetchData(method, path, undefined, roomInfo).then(res => {
      if (res && res.success) {
        updatedRoomInfo()
        closeRoomInfo()
      }
    })
  }

  const deleteRoomInfo = () => {
    const path = RoomDeleteEndpoint.path.replace(':id', roomInfo.id.toString())
    const method = RoomDeleteEndpoint.method
    fetchData(method, path, undefined, roomInfo).then(res => {
      if (res && res.success) {
        updatedRoomInfo()
        closeRoomInfo()
      }
    })
  }

  const getCinemas = async () => {
    const response = await fetchData(TheaterListEndpoint.method, TheaterListEndpoint.path)
    if (response && response.success) {
      return response.data
    }
  }

  useEffect(() => {
    if (!cinemas.length) {
      getCinemas().then(data => {
        setCinemas(data)
      })
    }
  }, [cinemas])

  return (
    <RoomDialog onClose={closeRoomInfo} aria-labelledby='customized-dialog-title' open={true}>
      <DialogTitle>{selectedRoom.id ? name : 'New Room'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Name'
              value={roomInfo.name}
              onChange={e =>
                setRoomInfo({
                  ...roomInfo,
                  name: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              fullWidth
              label='Manager ID'
              value={roomInfo.theater?.id || ''}
              onChange={e =>
                setRoomInfo({
                  ...roomInfo,
                  theater: {
                    ...roomInfo.theater,
                    id: e.target.value
                  }
                })
              }
            >
              {cinemas.map(cinema => (
                <MenuItem key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Number of rows'
              value={roomInfo.numberOfRows}
              type='number'
              InputProps={{ readOnly: !!roomInfo.id }}
              onChange={e =>
                roomInfo.id
                  ? false
                  : setRoomInfo({
                      ...roomInfo,
                      numberOfRows: parseInt(e.target.value),
                      seatsCount: roomInfo.seatsPerRow ? parseInt(e.target.value) * roomInfo.numberOfRows : 0
                    })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Seats per row'
              value={roomInfo.seatsPerRow}
              type='number'
              InputProps={{ readOnly: !!roomInfo.id }}
              onChange={e =>
                roomInfo.id
                  ? false
                  : setRoomInfo({
                      ...roomInfo,
                      seatsPerRow: parseInt(e.target.value),
                      seatsCount: roomInfo.numberOfRows ? parseInt(e.target.value) * roomInfo.numberOfRows : 0
                    })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type='submit' variant='outlined' color='error' size='medium' onClick={deleteRoomInfo}>
          Delete
        </Button>
        <Button autoFocus type='submit' variant='contained' size='large' onClick={saveRoomInfo}>
          Save
        </Button>
      </DialogActions>
    </RoomDialog>
  )
}
export default RoomInfo
