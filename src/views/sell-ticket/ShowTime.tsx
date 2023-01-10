import { Button, Grid, TextField } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { forwardRef, useEffect, useState } from 'react'
import { Screening } from 'src/@core/layouts/types'
import useCustomFetch from 'src/@core/utils/use-fetch'
import { ScreeningListEndpoint } from 'src/configs/appConfig'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Select date' fullWidth {...props} />
})

const ShowTime = ({ selectedShowtime }: { selectedShowtime: (showtime: Screening) => void }) => {
  const [date, setDate] = useState(new Date())
  const [showTimes, setShowTimes] = useState<Screening[] | undefined>(undefined)
  const { fetchData } = useCustomFetch()
  const [showTimesByDate, setShowTimesByDate] = useState<Screening[] | undefined>(undefined)

  const getShowTimes = () => {
    fetchData(ScreeningListEndpoint.method, ScreeningListEndpoint.path).then(res => {
      if (res && res.success) {
        setShowTimes(res.data)
      }
    })
  }

  useEffect(() => {
    if (showTimes === undefined) {
      getShowTimes()
    }
  }, [showTimes])

  useEffect(() => {
    if (showTimes !== undefined) {
      setShowTimesByDate(showTimes.filter(showTime => new Date(showTime.date).toDateString() === date.toDateString()))
    }
  }, [date, showTimes])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DatePickerWrapper>
          <DatePicker
            selected={date}
            showYearDropdown
            showMonthDropdown
            id='account-settings-date'
            placeholderText='MM-DD-YYYY'
            customInput={<CustomInput />}
            onChange={(date: Date) => {
              setDate(date)
            }}
          />
        </DatePickerWrapper>
      </Grid>
      <Grid container item xs={12} spacing={6}>
        {showTimesByDate?.map((showTime, index) => (
          <Grid item key={index} xs={3}>
            <Button variant='contained' fullWidth color='primary' onClick={() => {
                selectedShowtime(showTime)
            }}>
              {showTime.movie.title} - {new Date(showTime.date).toLocaleTimeString()}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default ShowTime
