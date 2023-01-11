import Button from '@mui/material/Button'
import { Grid, MenuItem, Select, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

import { ScreeningCreateEndpoint } from 'src/configs/appConfig'

import { RoomListEndpoint } from 'src/configs/appConfig'
import { Room } from 'src/@core/layouts/types'
import { MovieListEndpoint } from 'src/configs/appConfig'
import { Movie } from 'src/@core/layouts/types'

import useFetch from 'src/@core/utils/use-fetch'
import { useState, useEffect, forwardRef } from 'react'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Time' fullWidth {...props} />
})

const CustomInputTo = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Finish' fullWidth {...props} />
})

const ShowtimeDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const CalendarAddEvent = ({
  newEvent,
  closeDialogAddEvent,
  updatedShowtimesInfo
}: {
  newEvent: any
  closeDialogAddEvent: any
  updatedShowtimesInfo: any
}) => {
  const { fetchData, response, error, loading } = useFetch()
  const [eventData, setEventData] = useState({
    movieId: 1,
    roomId: 1,
    date: new Date(newEvent.startStr).getTime(),
    endDate: new Date(newEvent.startStr).getTime()
  })
  const [roomsData, setRoomsData] = useState<Room[] | undefined>(undefined)
  const [moviesData, setMoviesData] = useState<Movie[] | undefined>(undefined)

  const fetchRoomData = () => {
    fetchData(RoomListEndpoint.method, RoomListEndpoint.path).then(res => {
      if (res && res.success) {
        setRoomsData(res.data)
      }
    })
  }
  useEffect(() => {
    if (roomsData == undefined) {
      fetchRoomData()
    }
  }, [roomsData])

  const fetchMovieData = () => {
    fetchData(MovieListEndpoint.method, MovieListEndpoint.path).then(res => {
      if (res && res.success) {
        setMoviesData(res.data)
      }
    })
  }
  useEffect(() => {
    if (moviesData == undefined) {
      fetchMovieData()
    }
  }, [moviesData])

  useEffect(() => {
    setEventData({
      ...eventData,
      endDate: getDateEnd(eventData.date, eventData.movieId)
    })
  }, [eventData.movieId]);

  const getDateEnd = (startDate: number, movieId: any) => {
    const movie = moviesData !== undefined ? moviesData.find(x => parseInt(x.id) === movieId) : undefined
    const duration = movie !== undefined ? movie.duration : 60

    return startDate + (duration || 0) * 60000
  }

  const saveShowtime = () => {
    const calendarApi = newEvent.view.calendar
    calendarApi.unselect()
    const path = ScreeningCreateEndpoint.path
    const method = ScreeningCreateEndpoint.method

    const movie = moviesData !== undefined ? moviesData.find(x => parseInt(x.id) === eventData.movieId) : undefined
    const title = movie !== undefined ? movie.title : 'title'
    const duration = movie !== undefined ? movie.duration : 60

    fetchData(method, path, undefined, eventData).then(res => {
      if (res && res.success) {
        updatedShowtimesInfo()
        const eventToshow = {
          id: res.data.id,
          title,
          start: eventData.date,
          end: eventData.date + (duration || 0) * 60000
        }
        calendarApi.addEvent(eventToshow)
      }
    })
  }

  return (
    <ShowtimeDialog onClose={closeDialogAddEvent} aria-labelledby='customized-dialog-title' open={true}>
      <DialogTitle>{'New Showtime'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Select
              fullWidth
              label='Room'
              value={eventData.roomId}
              onChange={e =>
                setEventData({
                  ...eventData,
                  roomId: e.target.value as number
                })
              }
            >
              {roomsData !== undefined
                ? roomsData.map(room => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.theater.name} - {room.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Select
              fullWidth
              label='Movie'
              value={eventData.movieId}
              onChange={e => {
                setEventData({
                  ...eventData,
                  movieId: e.target.value as number,
                  endDate: getDateEnd(eventData.date, e.target.value)
                })
              }}
            >
              {moviesData !== undefined
                ? moviesData.map(movie => (
                    <MenuItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <DatePickerWrapper>
              <DatePicker
                selected={new Date(eventData.date)}
                showYearDropdown
                showMonthDropdown
                showTimeSelect
                timeFormat='HH:mm'
                dateFormat='MM-dd-yyyy HH:mm'
                id='account-settings-date'
                placeholderText='MM-DD-YYYY HH:mm'
                customInput={<CustomInput />}
                onChange={(date: Date) => {
                  setEventData({
                    ...eventData,
                    date: Math.floor(date.getTime()),
                    endDate: getDateEnd(Math.floor(date.getTime()), eventData.movieId)
                  })
                }}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12}>
            <DatePickerWrapper>
              <DatePicker
                selected={new Date(eventData.endDate)}
                showYearDropdown
                showMonthDropdown
                showTimeSelect
                timeFormat='HH:mm'
                dateFormat='MM-dd-yyyy HH:mm'
                id='account-settings-date'
                placeholderText='MM-DD-YYYY HH:mm'
                readOnly={true}
                customInput={<CustomInputTo />}
                onChange={(date: Date) => {
                  return false
                }}
              />
            </DatePickerWrapper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type='submit' variant='outlined' color='error' size='medium' onClick={closeDialogAddEvent}>
          Close
        </Button>
        <Button autoFocus type='submit' variant='contained' size='large' onClick={() => saveShowtime()}>
          Save
        </Button>
      </DialogActions>
    </ShowtimeDialog>
  )
}
export default CalendarAddEvent
