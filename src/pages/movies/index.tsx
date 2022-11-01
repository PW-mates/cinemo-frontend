import { Grid, Typography } from '@mui/material'
import CardMovie from 'src/views/movies/CardMovie'

const Movies = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Movies</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardMovie />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardMovie />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardMovie />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardMovie />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardMovie />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardMovie />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardMovie />
      </Grid>
    </Grid>
  )
}

export default Movies
