import { useState, useEffect } from 'react'

import { Box } from "@mui/material";
import { Grid, Typography } from '@mui/material'

import { Screening } from "src/@core/layouts/types";
import { ScreeningListEndpoint } from "src/configs/appConfig";
import useFetch from 'src/@core/utils/use-fetch'

import ScheduleCalendar from "src/views/showtimes/ScheduleCalendar";

const Showtimes = () => {
    const [showtimesData, setShowtimesData] = useState<Screening[] | undefined>(undefined)
    const { fetchData, response, error, loading } = useFetch()
    const fetchShowtimesList = () => {
        fetchData(ScreeningListEndpoint.method, ScreeningListEndpoint.path).then(res => {
        if (res && res.success) {
            setShowtimesData(res.data)
        }
        })
    }
    useEffect(() => {
        if (showtimesData == undefined) {
        fetchShowtimesList()
        }
    }, [showtimesData])

  const updatedShowtimesInfo = () => {
    fetchShowtimesList()
  }
    return (
        <Box>
            <Grid item xs={12} sx={{ paddingBottom: 4 }}>
                <Typography variant='h5'>Showtimes</Typography>
            </Grid>
            {/* <ScheduleCalendar /> */}
            {showtimesData !== undefined ? (
            <ScheduleCalendar showtimesData={showtimesData || []} updatedShowtimesInfo={updatedShowtimesInfo} />
          ) : null}
        </Box>
    )
}

export default Showtimes;
