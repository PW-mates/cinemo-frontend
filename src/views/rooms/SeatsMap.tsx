import { Button, Card, CardContent, DialogContent, Grid, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { Room, Seat, SeatType } from 'src/@core/layouts/types'
import useFetch from 'src/@core/utils/use-fetch'
import { SeatListEndpoint, SeatTypeListEndpoint } from 'src/configs/appConfig'
import { Seat as SeatIcon } from 'mdi-material-ui'
import SeatInfo from './SeatInfo'

const SeatsMap = ({ selectedRoom, closedSeatsMap }: { selectedRoom: Room; closedSeatsMap: any }) => {
  const [seats, setSeats] = useState<Seat[]>()
  const [seatTypes, setSeatTypes] = useState<SeatType[]>()
  const [selectedSeat, setSelectedSeat] = useState<Seat>()
  const { fetchData, response, error, loading } = useFetch()
  const fetchSeats = () => {
    const path = SeatListEndpoint.path.replace(':roomId', selectedRoom.id.toString())
    const method = SeatListEndpoint.method
    fetchData(method, path).then((res: SeatListEndpoint.Response) => {
      if (res && res.success) {
        setSeats(res.data)
      }
    })
  }
  const fetchSeatTypes = () => {
    fetchData(SeatTypeListEndpoint.method, SeatTypeListEndpoint.path).then((res: SeatTypeListEndpoint.Response) => {
      if (res && res.success) {
        setSeatTypes(res.data)
      }
    })
  }

  const updatedSeatInfo = () => {
    fetchSeats()
    setSelectedSeat(undefined)
  }

  useEffect(() => {
    if (seats == undefined) {
      fetchSeats()
    }
  }, [seats])

  useEffect(() => {
    if (seatTypes == undefined) {
      fetchSeatTypes()
    }
  }, [seatTypes])

  const seatMap: { [key: number]: { [key: number]: Seat } } = {}
  if (seats && seatTypes) {
    for (const seat of seats) {
      if (seatMap[seat.row] == undefined) {
        seatMap[seat.row] = {}
      }
      seatMap[seat.row][seat.column] = seat
    }
  }

  return (
    <DialogContent>
      <Grid container spacing={5}>
        <Grid item xs={8} style={{overflow: 'auto'}}>
          {seatMap
            ? Object.keys(seatMap).map(rowId => (
                <div key={rowId} style={{width: 'max-content'}}>
                  {Object.keys(seatMap[parseInt(rowId)]).map(columnId => {
                    const seat = seatMap[parseInt(rowId)][parseInt(columnId)]

                    return (
                      <Button key={seat.id} onClick={() => {
                        setSelectedSeat(seat)
                      }}>
                        <Tooltip arrow title={`Seat ${seat.id}`} placement='top'>
                          <Card>
                            <CardContent sx={{ display: 'flex' }}>
                              <SeatIcon style={{ color: `#${seatTypes?.find(st => st.id == seat.type.id)?.color}` }} />
                            </CardContent>
                          </Card>
                        </Tooltip>
                      </Button>
                    )
                  })}
                </div>
              ))
            : null}
        </Grid>
        <Grid item xs={4}>
            {selectedSeat && (
               <SeatInfo selectedSeat={selectedSeat} seatTypes={seatTypes || []} updatedSeatInfo={updatedSeatInfo} />
            )}
        </Grid>
        <Grid item xs={12}>
          {seatTypes &&
            seatTypes.map(seatType => (
              <div
                style={{ display: 'flex', alignItems: 'center', float: 'left', margin: '10px', marginLeft: '20px' }}
                key={seatType.id}
              >
                <SeatIcon style={{ color: `#${seatType.color}` }} />
                <div style={{ marginLeft: '5px' }}>{seatType.name}</div>
              </div>
            ))}
        </Grid>
      </Grid>
    </DialogContent>
  )
}

export default SeatsMap
