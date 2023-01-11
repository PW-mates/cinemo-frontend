import { Box, BoxProps, Button, Card, CardContent, Divider, Grid, styled, Typography } from '@mui/material'
import { Ticket } from 'src/@core/layouts/types'
import DirectionsIcon from '@mui/icons-material/Directions'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import QRCode from 'react-qr-code'

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const PrintableTicket = ({ ticket }: { ticket: Ticket }) => {
  return (
    <Card className='print'>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              {ticket.screening.movie.title}
            </Typography>
            <Typography variant='body2'>
              Thank you for choosing our cinema. We hope you enjoy the movie.
              <br />
              Please show this ticket at the entrance.
              <br />
              <br />
              Please give us feedback about your experience at our cinema.
              <br />
            </Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <DirectionsIcon sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>
                      <b>{ticket.screening.room.theater.name}</b>
                      <br />
                      {ticket.screening.room.theater.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CameraIndoorIcon sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>
                      <b>{ticket.screening.room.name}</b>
                    </Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <EventSeatIcon sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>
                    <b>{ticket.seats?.map(seat => `row ${seat.row} - column ${seat.column}`).join('<br/>')}</b>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>
                    <b>{ticket.screening.movie.duration || 0} minutes</b>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid
          item
          sm={5}
          xs={12}
          sx={{
            paddingTop: ['0 !important', '1.5rem !important'],
            paddingLeft: ['1.5rem !important', '0 !important']
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              padding: theme => `${theme.spacing(18, 5, 16)} !important`
            }}
          >
            <Box>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <QRCode value={ticket.code} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} />
              </Box>
              <span>{ticket.code.toUpperCase()}</span>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PrintableTicket
