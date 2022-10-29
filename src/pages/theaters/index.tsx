// ** MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import TheatersList from 'src/views/theaters/TheatersList'

const TypographyPage = () => {
  return (
    <Grid item xs={12}>
    <Card>
      <CardHeader title='Theaters' titleTypographyProps={{ variant: 'h6' }} />
      <TheatersList />
    </Card>
  </Grid>
  )
}

export default TypographyPage
