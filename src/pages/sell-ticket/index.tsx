import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import PaymentsIcon from '@mui/icons-material/Payments'
import PrintIcon from '@mui/icons-material/Print'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import { Button, Card, CardHeader, Grid } from '@mui/material'
import ShowTime from 'src/views/sell-ticket/ShowTime'
import { Payment as PaymentObj, Screening, Seat, Ticket } from 'src/@core/layouts/types'
import SeatMap from 'src/views/sell-ticket/SeatMap'
import Payment from 'src/views/sell-ticket/Payment'
import useFetch from 'src/@core/utils/use-fetch'
import { TicketCreateEndpoint } from 'src/configs/appConfig'
import { useSettings } from 'src/@core/hooks/useSettings'
import PrintableTicket from 'src/views/sell-ticket/PrintableTicket'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
  })
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <LocalMoviesIcon />,
    2: <EventSeatIcon />,
    3: <PaymentsIcon />,
    4: <PrintIcon />
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = ['Select show time', 'Select seats', 'Payment', 'Print ticket']

const SellTicket = () => {
  const { settings } = useSettings()
  const [activeStep, setActiveStep] = React.useState(0)
  const [showtime, setShowtime] = React.useState<Screening | undefined>(undefined)
  const [, setSeats] = React.useState<Seat[] | undefined>([])
  const [ticket, setTicket] = React.useState<Ticket | undefined>()
  const [, setPayment] = React.useState<PaymentObj | undefined>(undefined)
  const { fetchData } = useFetch()
  const selectedShowtime = (showtime: Screening) => {
    setShowtime(showtime)
    setActiveStep(1)
  }
  const selectedSeats = (seats: Seat[]) => {
    setSeats(seats)
    console.log(seats)
    console.log(
      seats.map(seat => {
        return {
          id: seat.id
        }
      })
    )
    fetchData(
      TicketCreateEndpoint.method,
      TicketCreateEndpoint.path,
      {},
      {
        screening: {
          id: showtime?.id
        },
        seats: seats.map(seat => {
          return {
            id: seat.id
          }
        }),
        seller: {
          id: settings.user?.id
        },
        status: 'new'
      }
    ).then(res => {
      if (res && res.data) {
        setTicket(res.data)
        setActiveStep(2)
        console.log(res.data)
      }
    })
  }

  const paidTicket = (payment: PaymentObj) => {
    setPayment(payment)
    setActiveStep(3)
  }

  const cancelledTicket = () => {
    setShowtime(undefined)
    setSeats([])
    setTicket(undefined)
    setPayment(undefined)
    setActiveStep(0)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={16} spacing={6}>
        <Card>
          <CardHeader title='Sell ticket' titleTypographyProps={{ variant: 'h6' }}></CardHeader>
          <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          <Grid item spacing={6} xs={12}>
            {activeStep === 0 ? <ShowTime selectedShowtime={selectedShowtime} /> : null}
            {activeStep === 1 && showtime ? (
              <SeatMap selectedShowtime={showtime} selectedSeats={selectedSeats} />
            ) : null}
            {activeStep === 2 && ticket ? (
              <Payment ticket={ticket} paidTicket={paidTicket} cancelledTicket={cancelledTicket} />
            ) : null}
          </Grid>
        </Card>
      </Grid>
      {activeStep === 3 && ticket ? (
        <Grid item xs={12} spacing={6}>
          <PrintableTicket ticket={ticket} />
          <Grid xs={12} spacing={6} style={{ textAlign: 'center' }}>
            <Button variant='contained' onClick={handlePrint}>
              Print ticket
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default SellTicket
