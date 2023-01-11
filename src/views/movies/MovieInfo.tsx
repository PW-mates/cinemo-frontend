import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { forwardRef, useEffect, useState } from 'react'
import { Movie, MovieCategory } from 'src/@core/layouts/types'
import useFetch from 'src/@core/utils/use-fetch'
import { MovieCategoryListEndpoint, MovieCreateEndpoint, MovieUpdateEndpoint } from 'src/configs/appConfig'
import CardMovie from './CardMovie'
// ** Third Party Imports
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CustomInputReleaseDate = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label="Release Date" fullWidth {...props} />
})

const CustomInputShowingFrom = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label="Showing From" fullWidth {...props} />
})

const CustomInputShowingTo = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label="Showing To" fullWidth {...props} />
})


const MovieInfo = ({
  selectedMovie,
  closeMovieInfo,
  updatedMovieInfo
}: {
  selectedMovie: Movie
  closeMovieInfo: any
  updatedMovieInfo: any
}) => {
  const [movieInfo, setMovieInfo] = useState<Movie>(selectedMovie)
  const { fetchData, response, error, loading } = useFetch()
  const [movieCategories, setMovieCategories] = useState<MovieCategory[] | undefined>(undefined)

  const getMovieCategories = () => {
    fetchData(MovieCategoryListEndpoint.method, MovieCategoryListEndpoint.path).then(res => {
      if (res && res.success) {
        setMovieCategories(res.data)
      }
    })
  }

  useEffect(() => {
    if (movieCategories === undefined) {
      getMovieCategories()
    }
  }, [movieCategories])

  const saveMovieInfo = () => {
    const path = movieInfo.id
      ? MovieUpdateEndpoint.path.replace(':id', movieInfo.id.toString())
      : MovieCreateEndpoint.path
    const method = movieInfo.id ? MovieUpdateEndpoint.method : MovieCreateEndpoint.method
    fetchData(method, path, undefined, movieInfo).then(res => {
      if (res && res.success) {
        updatedMovieInfo()
        closeMovieInfo()
      }
    })
  }

  return (
    <Dialog open={true} onClose={closeMovieInfo} maxWidth='lg'>
      <DialogTitle>{selectedMovie.id ? selectedMovie.title : 'New movie'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item container spacing={5} xs={8}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Title'
                value={movieInfo.title}
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    title: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                label='Category'
                multiple
                value={
                  movieInfo.categories?.map(category => {
                    return category.id
                  }) || []
                }
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    categories: [...e.target.value].map((id: string) => {
                      return {
                        id: id,
                        name: movieCategories?.find(category => category.id === id)?.name || '',
                        slug: movieCategories?.find(category => category.id === id)?.slug || ''
                      } as MovieCategory
                    })
                  })
                }
              >
                {movieCategories &&
                  movieCategories.length > 0 &&
                  movieCategories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
              <Link href={`/movie-categories`} target='_blank'>
                Manage category
              </Link>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 4.8 }}>
              <TextField
                fullWidth
                multiline
                label='Description'
                minRows={2}
                placeholder='Description'
                defaultValue={movieInfo?.description || ''}
                onChange={e => setMovieInfo({ ...movieInfo, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Director'
                value={movieInfo.director}
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    director: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Distributor'
                value={movieInfo.distributor}
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    distributor: e.target.value
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  selected={movieInfo.releaseDate ? new Date(movieInfo.releaseDate * 1000) : new Date()}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInputReleaseDate />}
                  onChange={(date: Date) => {
                    setMovieInfo({ ...movieInfo, releaseDate: Math.floor(date.getTime() / 1000 + 3600) })
                  }}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Duration'
                type={'number'}
                value={movieInfo.duration}
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    duration: parseInt(e.target.value)
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Rating'
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                type={'number'}
                value={movieInfo.rating}
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    rating: parseFloat(e.target.value)
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Poster URL'
                value={movieInfo.posterPhoto}
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    posterPhoto: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Trailer URL'
                value={movieInfo.trailerUrl}
                onChange={e =>
                  setMovieInfo({
                    ...movieInfo,
                    trailerUrl: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
            <DatePickerWrapper>
                <DatePicker
                  selected={movieInfo.showingFrom ? new Date(movieInfo.showingFrom * 1000) : new Date()}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInputShowingFrom />}
                  onChange={(date: Date) => {
                    setMovieInfo({ ...movieInfo, showingFrom: Math.floor(date.getTime() / 1000 + 3600) })
                  }}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12}>
            <DatePickerWrapper>
                <DatePicker
                  selected={movieInfo.showingTo ? new Date(movieInfo.showingTo * 1000) : new Date()}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInputShowingTo />}
                  onChange={(date: Date) => {
                    setMovieInfo({ ...movieInfo, showingTo: Math.floor(date.getTime() / 1000 + 3600) })
                  }}
                />
              </DatePickerWrapper>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <CardMovie movie={movieInfo} movieEdit={undefined} movieDelete={undefined} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type='submit' variant='contained' size='large' onClick={saveMovieInfo}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default MovieInfo
