import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Seat, SeatType } from 'src/@core/layouts/types'
import useFetch from 'src/@core/utils/use-fetch'
import { SeatUpdateEndpoint } from 'src/configs/appConfig'

const SeatInfo = ({
  selectedSeat,
  seatTypes,
  updatedSeatInfo
}: {
  selectedSeat: Seat
  seatTypes: SeatType[]
  updatedSeatInfo: any
}) => {
  const [seat, setSeat] = useState<Seat>(selectedSeat)
  const { fetchData } = useFetch()
  const saveSeatInfo = () => {
    console.log(seat)
    const path = SeatUpdateEndpoint.path.replace(':seatId', selectedSeat.id.toString())
    const method = SeatUpdateEndpoint.method
    fetchData(method, path, {}, seat).then((res: SeatUpdateEndpoint.Response) => {
      if (res && res.success) {
        console.log(res)
        updatedSeatInfo()
      }
    })
  }
  useEffect(() => {
    if (selectedSeat.id != seat.id) {
      setSeat(selectedSeat)
    }
  }, [seat, selectedSeat])

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant='h6'>Seat {seat.id}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label='Row' value={seat.row} InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label='Column' value={seat.column} InputProps={{ readOnly: true }} />
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            label='Type'
            value={seat.type?.id || ''}
            onChange={e =>
              setSeat({
                ...seat,
                type: {
                  ...seat.type,
                  id: e.target.value
                }
              })
            }
          >
            {seatTypes.map(seatType => (
              <MenuItem key={seatType.id} value={seatType.id}>
                {seatType.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant='contained' color='primary' onClick={saveSeatInfo}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default SeatInfo
