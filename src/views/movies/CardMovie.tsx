// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Box, CardHeader, IconButton, Menu, MenuItem, Rating } from '@mui/material'
import { DotsVertical } from 'mdi-material-ui'
import { SyntheticEvent, useState } from 'react'

const CardMovie = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardMedia
        sx={{ height: '9.375rem' }}
        image='https://sztukmix.pl/wp-content/uploads/2021/12/spider-man-no-way-home-recenzja.jpg'
      />
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton
            onClick={handleDropdownOpen}
            size='small'
            aria-label='settings'
            className='card-more-options'
            sx={{ color: 'text.secondary' }}
          >
            <DotsVertical />
          </IconButton>
        }
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleDropdownClose}>
        <MenuItem onClick={handleDropdownClose}>Action</MenuItem>
        <MenuItem onClick={handleDropdownClose}>Another action</MenuItem>
        <MenuItem onClick={handleDropdownClose}>Something else here</MenuItem>
      </Menu>
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Rating readOnly value={4} name='read-only' sx={{ marginRight: 2 }} />
          <Typography variant='body2'>4 Star | 73,301 votes</Typography>
        </Box>
        <Typography variant='body2'>
          Spider-Man seeks the help of Doctor Strange to forget his exposed secret identity as Peter Parker. However,
          Strange's spell goes horribly wrong, leading to unwanted guests entering their universe.
        </Typography>
      </CardContent>
      <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        Add To Cart
      </Button>
    </Card>
  )
}

export default CardMovie
