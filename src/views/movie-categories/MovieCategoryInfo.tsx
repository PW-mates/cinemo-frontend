import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Grid, TextField } from '@mui/material'
import { MovieCategory } from 'src/@core/layouts/types'
import { useState } from 'react'
import useFetch from 'src/@core/utils/use-fetch'
import {
  MovieCategoryCreateEndpoint,
  MovieCategoryDeleteEndpoint,
  MovieCategoryUpdateEndpoint,
} from 'src/configs/appConfig'

const MovieCategoryDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const MovieCategoryInfo = ({
  selectedMovieCategory,
  closeMovieCategoryInfo,
  updatedMovieCategoryInfo
}: {
  selectedMovieCategory: MovieCategory
  closeMovieCategoryInfo: any
  updatedMovieCategoryInfo: any
}) => {
  const { name: name } = selectedMovieCategory
  const [movieCategoryInfo, setMovieCategoryInfo] = useState<MovieCategory>(selectedMovieCategory)
  const { fetchData } = useFetch()
  const saveMovieCategoryInfo = () => {
    const path = selectedMovieCategory.id
      ? MovieCategoryUpdateEndpoint.path.replace(':id', movieCategoryInfo.id.toString())
      : MovieCategoryCreateEndpoint.path
    const method = selectedMovieCategory.id ? MovieCategoryUpdateEndpoint.method : MovieCategoryCreateEndpoint.method
    fetchData(method, path, undefined, movieCategoryInfo).then(res => {
      if (res && res.success) {
        updatedMovieCategoryInfo()
        closeMovieCategoryInfo()
      }
    })
  }

  const deleteMovieCategoryInfo = () => {
    const path = MovieCategoryDeleteEndpoint.path.replace(':id', movieCategoryInfo.id.toString())
    const method = MovieCategoryDeleteEndpoint.method
    fetchData(method, path, undefined, movieCategoryInfo).then(res => {
      if (res && res.success) {
        updatedMovieCategoryInfo()
        closeMovieCategoryInfo()
      }
    })
  }

  return (
    <MovieCategoryDialog onClose={closeMovieCategoryInfo} aria-labelledby='customized-dialog-title' open={true}>
      <DialogTitle>{selectedMovieCategory.id ? name : 'New MovieCategory'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Name'
              value={movieCategoryInfo.name}
              onChange={e =>
                setMovieCategoryInfo({
                  ...movieCategoryInfo,
                  name: e.target.value
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Slug'
              value={movieCategoryInfo.slug}
              onChange={e =>
                setMovieCategoryInfo({
                  ...movieCategoryInfo,
                  slug: e.target.value
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type='submit' variant='outlined' color='error' size='medium' onClick={deleteMovieCategoryInfo}>
          Delete
        </Button>
        <Button autoFocus type='submit' variant='contained' size='large' onClick={saveMovieCategoryInfo}>
          Save
        </Button>
      </DialogActions>
    </MovieCategoryDialog>
  )
}
export default MovieCategoryInfo
