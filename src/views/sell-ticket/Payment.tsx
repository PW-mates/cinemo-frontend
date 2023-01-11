import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Ticket, Payment } from 'src/@core/layouts/types'
import useFetch from 'src/@core/utils/use-fetch'
import { PaymentCreateEndpoint, TicketUpdateEndpoint } from 'src/configs/appConfig'
import Bill from './Bill'

const Payment = ({ ticket, paidTicket, cancelledTicket }: { ticket: Ticket; paidTicket: any, cancelledTicket: any }) => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [currency, setCurrency] = useState('USD')
  const [payment, setPayment] = useState<Payment | undefined>(undefined)
  const { fetchData } = useFetch()

  const handlePaid = () => {
    fetchData(PaymentCreateEndpoint.method, PaymentCreateEndpoint.path, undefined, {
      amount: ticket.totalPrice,
      paymentMethod: paymentMethod,
      currency: currency,
      status: 'paid'
    }).then(res => {
      if (res.success) {
        setPayment(res.data)
      }
    })
  }

  useEffect(() => {
    if (payment && payment.status == 'paid' && !ticket.payment) {
      ticket.payment = payment
      const path = TicketUpdateEndpoint.path.replace(':id', ticket.id)
      fetchData(TicketUpdateEndpoint.method, path, undefined, ticket).then(res => {
        if (res.success) {
          paidTicket(res.data)
        }
      })
    }
  })

  const handleCancel = () => {
    ticket.status = 'cancelled'
    const path = TicketUpdateEndpoint.path.replace(':id', ticket.id)
    delete ticket.payment
    fetchData(TicketUpdateEndpoint.method, path, undefined, ticket).then(res => {
      if (res.success) {
        cancelledTicket(res.data)
      }
    })
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={6} style={{ overflow: 'auto' }} spacing={5}>
        <Grid xs={12}>
          <FormControl fullWidth>
            <FormLabel sx={{ fontSize: '1.3rem' }}>Payment method</FormLabel>
            <RadioGroup
              row
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value == 'card' ? 'card' : 'cash')}
              aria-label='gender'
              name='account-settings-info-radio'
            >
              <FormControlLabel value='card' label='Card' control={<Radio />} />
              <FormControlLabel value='cash' label='Cash' control={<Radio />} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth>
            <FormLabel sx={{ fontSize: '1.3rem' }}>Amount to pay</FormLabel>
            <TextField fullWidth InputProps={{ readOnly: true }} value={ticket.totalPrice} />
          </FormControl>
        </Grid>
        <Grid container xs={12}>
          <Grid xs={6}>
            <Button size='large' fullWidth type='submit' sx={{ mr: 2 }} variant='contained' onClick={handlePaid}>
              Paid
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button size='large' fullWidth color='secondary' variant='outlined' onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Bill seats={ticket?.seats || []}></Bill>
      </Grid>
    </Grid>
  )
}

export default Payment
