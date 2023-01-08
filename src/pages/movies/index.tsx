import { Button, Grid, Typography } from '@mui/material'
import { margin } from '@mui/system'
import { useEffect, useState } from 'react'
import { Movie } from 'src/@core/layouts/types'
import useFetch from 'src/@core/utils/use-fetch'
import { MovieDeleteEndpoint, MovieListEndpoint } from 'src/configs/appConfig'
import CardMovie from 'src/views/movies/CardMovie'
import MovieInfo from 'src/views/movies/MovieInfo'

const Movies = () => {
  const [moviesData, setMoviesData] = useState<Movie[] | undefined>(undefined)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined)

  const { fetchData } = useFetch()
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

  const closeMovieInfo = () => {
    setShowDialog(false)
    setSelectedMovie(undefined)
  }

  const updatedMovieInfo = () => {
    closeMovieInfo()
    fetchMovieData()
  }

  const movieDelete = (movie: Movie) => {
    const path = MovieDeleteEndpoint.path.replace(':id', movie.id.toString());
    fetchData(MovieDeleteEndpoint.method, path).then(res => {
      if (res && res.success) {
        fetchMovieData()
      }
    });
  }

  const movieEdit = (movie: Movie) => {
    setSelectedMovie(movie)
    setShowDialog(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Movies</Typography>
        <Button
          onClick={() => {
            setSelectedMovie({} as Movie)
            setShowDialog(true)
          }}
          style={{ margin: '20px 0px' }}
        >
          Add new
        </Button>
      </Grid>
      {moviesData !== undefined
        ? moviesData.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <CardMovie movie={movie} movieDelete={movieDelete} movieEdit={movieEdit} />
            </Grid>
          ))
        : null}
      {showDialog && selectedMovie ? (
        <MovieInfo
          selectedMovie={selectedMovie}
          closeMovieInfo={closeMovieInfo}
          updatedMovieInfo={updatedMovieInfo}
        ></MovieInfo>
      ) : null}
    </Grid>
  )
}

export default Movies
