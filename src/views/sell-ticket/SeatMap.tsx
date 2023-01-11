import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Tooltip,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Screening, Seat, SeatType, Ticket } from 'src/@core/layouts/types'
import useFetch from 'src/@core/utils/use-fetch'
import { SeatListEndpoint, SeatTypeListEndpoint, TicketListEndpoint } from 'src/configs/appConfig'
import { Seat as SeatIcon, Table, TableRow } from 'mdi-material-ui'
import Bill from './Bill'

const SeatMap = ({ selectedShowtime, selectedSeats }: { selectedShowtime: Screening; selectedSeats: any }) => {
  const roomId = selectedShowtime.room.id
  const [seats, setSeats] = useState<Seat[] | undefined>()
  const [unavailableSeats, setUnavailableSeats] = useState<Seat[] | undefined>([])
  const [seatTypes, setSeatTypes] = useState<SeatType[] | undefined>()
  const [listTickets, setListTickets] = useState<Ticket[] | undefined>(undefined)
  const [choosenSeats, setChoosenSeats] = useState<Seat[]>([])

  const { fetchData } = useFetch()
  const fetchSeats = () => {
    const path = SeatListEndpoint.path.replace(':roomId', roomId.toString())
    const method = SeatListEndpoint.method
    fetchData(method, path).then((res: SeatListEndpoint.Response) => {
      if (res && res.success) {
        setSeats(res.data)
      }
    })
  }

  useEffect(() => {
    if (seats == undefined) {
      fetchSeats()
    }
  }, [seats])

  const fetchSeatTypes = () => {
    fetchData(SeatTypeListEndpoint.method, SeatTypeListEndpoint.path).then((res: SeatTypeListEndpoint.Response) => {
      if (res && res.success) {
        setSeatTypes(res.data)
      }
    })
  }

  useEffect(() => {
    if (seatTypes == undefined) {
      fetchSeatTypes()
    }
  }, [seatTypes])

  const fetchTickets = () => {
    fetchData(TicketListEndpoint.method, TicketListEndpoint.path).then((res: TicketListEndpoint.Response) => {
      if (res && res.success) {
        setListTickets(res.data?.filter(ticket => ticket.screening.id == selectedShowtime.id))
        if (listTickets) {
          
        }
      }
    })
  }

  useEffect(() => {
    if (listTickets == undefined) {
      fetchTickets()
    }
  }, [listTickets])

  useEffect(() => {
    if (listTickets) {
        const unavailableSeats: Seat[] = listTickets
        .map(ticket => ticket.seats)
        .flatMap(seat => seat)
        .filter((seat): seat is Seat => seat !== undefined)
      setUnavailableSeats(unavailableSeats)
      console.log("unavailableSeats", unavailableSeats)
    }
}, [listTickets])

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
    <Grid container spacing={5}>
      <Grid item xs={8} style={{ overflow: 'auto' }}>
        {seatMap
          ? Object.keys(seatMap).map(rowId => (
              <div key={rowId} style={{ width: 'max-content' }}>
                {Object.keys(seatMap[parseInt(rowId)]).map(columnId => {
                  const seat = seatMap[parseInt(rowId)][parseInt(columnId)]

                  return (
                    <Button key={seat.id}>
                      <Tooltip
                        arrow
                        title={
                          <div>
                            Type: {seat.type.name}
                            <br />
                            row {seat.row}, column {seat.column}
                          </div>
                        }
                        placement='top'
                        onClick={() => {
                          if (unavailableSeats && unavailableSeats.find(s => s.id == seat.id)) {
                            return
                          }
                          if (choosenSeats.find(s => s.id == seat.id)) {
                            setChoosenSeats(choosenSeats.filter(s => s.id != seat.id))
                          } else {
                            setChoosenSeats([...choosenSeats, seat])
                            console.log(choosenSeats)
                          }
                        }}
                      >
                        <Card>
                          <CardContent sx={{ display: 'flex' }}>
                            <SeatIcon style={{ color: (choosenSeats.find(s => s.id == seat.id)) ? 'red' : unavailableSeats?.find(s=> s.id == seat.id) ? 'grey' : `#${seatTypes?.find(st => st.id == seat.type.id)?.color}` }} />
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
        <Bill seats={choosenSeats}></Bill>
        { choosenSeats.length > 0 && <Button fullWidth variant='contained' onClick={() => {
            if (choosenSeats.length == 0) {
              alert('Please choose seats')
            } else {
                selectedSeats(choosenSeats)
            }
        }}>Finish</Button>}
      </Grid>
      <Grid item xs={12}>
        {seatTypes && [
          ...seatTypes.map(seatType => (
            <div
              style={{ display: 'flex', alignItems: 'center', float: 'left', margin: '10px', marginLeft: '20px' }}
              key={seatType.id}
            >
              <SeatIcon style={{ color: `#${seatType.color}` }} />
              <div style={{ marginLeft: '5px' }}>{seatType.name}</div>
            </div>
          )),
          <div
            style={{ display: 'flex', alignItems: 'center', float: 'left', margin: '10px', marginLeft: '20px' }}
            key={'unavailable'}
          >
            <SeatIcon style={{ color: `grey` }} />
            <div style={{ marginLeft: '5px' }}>Unavailable</div>
          </div>,
          <div
            style={{ display: 'flex', alignItems: 'center', float: 'left', margin: '10px', marginLeft: '20px' }}
            key={'Selected'}
          >
            <SeatIcon style={{ color: `red` }} />
            <div style={{ marginLeft: '5px' }}>Selected</div>
          </div>
        ]}
      </Grid>
    </Grid>
  )
}

export default SeatMap
