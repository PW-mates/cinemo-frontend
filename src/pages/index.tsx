// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import Theater from 'mdi-material-ui/Theater'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import TicketOutline from 'mdi-material-ui/TicketOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import { useSettings } from 'src/@core/hooks/useSettings'
import useFetch from 'src/@core/utils/use-fetch'
import { StatisticsEndpoint } from 'src/configs/appConfig'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const { settings } = useSettings()
  const { fetchData } = useFetch()
  const [ statistics, setStatistics ] = useState<undefined | null | StatisticsEndpoint.Statistics>(undefined)

  useEffect(() => {
    if (statistics === undefined) {
      fetchData(StatisticsEndpoint.method, StatisticsEndpoint.path).then((res) => {
        setStatistics(res.data)
      }).catch((err) => {
        console.log(err)
        setStatistics(null);
      });
    }
  }, [statistics]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          {settings.user && statistics ? <StatisticsCard user={settings.user} statistics={statistics} /> : null}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={3}>
              <CardStatisticsVerticalComponent
                icon={<Poll />}
                color='success'
                title='Sell ticket'
                href='/sell-ticket'
              />
            </Grid>
            <Grid item xs={3}>
              <CardStatisticsVerticalComponent
                title='Movies'
                color='secondary'
                icon={<TicketOutline />}
                href='/movies'
              />
            </Grid>
            <Grid item xs={3}>
              <CardStatisticsVerticalComponent title='Showtimes' icon={<CalendarBlankOutline />} href='/schedule' />
            </Grid>
            <Grid item xs={3}>
              <CardStatisticsVerticalComponent color='warning' title='Theaters' icon={<Theater />} href='/theaters' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
