// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, CardHeader, IconButton, Menu, MenuItem, Rating } from '@mui/material'
import { DotsVertical } from 'mdi-material-ui'
import { SyntheticEvent, useState } from 'react'
import { Movie } from 'src/@core/layouts/types'
import MovieInfo from './MovieInfo'

const CardMovie = ({ movie, movieEdit, movieDelete }: { movie: Movie; movieEdit: any; movieDelete: any }) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardMedia sx={{ height: '9.375rem' }} image={movie.posterPhoto} />
      <CardHeader
        title={movie.title}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          movieEdit &&
          movieDelete && (
            <IconButton
              onClick={handleDropdownOpen}
              size='small'
              aria-label='settings'
              className='card-more-options'
              sx={{ color: 'text.secondary' }}
            >
              <DotsVertical />
            </IconButton>
          )
        }
      />
      {movieEdit && movieDelete && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleDropdownClose}>
          <MenuItem
            onClick={() => {
              handleDropdownClose()
              movieEdit(movie)
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDropdownClose()
              movieDelete(movie)
            }}
            color='error'
          >
            Delete
          </MenuItem>
        </Menu>
      )}
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Rating readOnly value={movie.rating} name='read-only' sx={{ marginRight: 2 }} />
          <Typography variant='body2'>
            {movie.rating || 0} Star | {movie.duration || 'undefined'} minutes
          </Typography>
        </Box>
        <Typography variant='body2'>{movie.description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardMovie
