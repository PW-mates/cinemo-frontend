// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { AccountUpdateEndpoint } from 'src/configs/appConfig'
import { useSettings } from 'src/@core/hooks/useSettings'
import useFetch from 'src/@core/utils/use-fetch'
import { User } from 'src/@core/layouts/types'
import Snackbar from '@mui/material/Snackbar'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = () => {
  // ** State
  const [date, setDate] = useState<Date | null | undefined>(null)
  // ** State
  const { fetchData, response, error, loading } = useFetch()
  const [values, setValues] = useState<User>()
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  })

  const saveUserInfo = () => {
    console.log('saveUserInfo', values)
    fetchData(AccountUpdateEndpoint.method, AccountUpdateEndpoint.path, undefined, values).then(res => {
      setSnackbar({ open: true, message: res?.message })
      if (res && res.success) {
        saveSettings({ ...settings, user: { ...res.data, access_token: settings?.user?.access_token } })
      }
    })
  }

  const { settings, saveSettings } = useSettings()
  useEffect(() => {
    if (settings.user && !values) {
      setValues({
        ...settings.user,
        access_token: undefined
      })
      setDate(settings.user.birthDate ? new Date(settings.user.birthDate * 1000) : new Date())
    }
  }, [settings.user, values])

  return values ? (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8 }}>
            <TextField
              fullWidth
              multiline
              label='Bio'
              minRows={2}
              placeholder='Bio'
              defaultValue={values?.bio}
              onChange={e => setValues({ ...values, bio: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={(date: Date) => {
                  setDate(date)
                  setValues({ ...values, birthDate: Math.floor(date.getTime() / 1000 + 3600) })
                }}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone'
              placeholder='(123) 456-7890'
              defaultValue={values?.phone}
              onChange={e => setValues({ ...values, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Website'
              placeholder='https://example.com/'
              defaultValue={values?.personalWebsite}
              onChange={e => setValues({ ...values, personalWebsite: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                label='Country'
                value={values?.country}
                onChange={e => setValues({ ...values, country: e.target.value })}
              >
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-multiple-select-label'>Languages</InputLabel>
              <Select
                multiple
                defaultValue={(values?.language || '').split(',')}
                onChange={e => setValues({ ...values, language: [...e.target.value].join(',') })}
                id='account-settings-multiple-select'
                labelId='account-settings-multiple-select-label'
                input={<OutlinedInput label='Languages' id='select-multiple-language' />}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Italian'>Italian</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Arabic'>Arabic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup
                row
                value={values?.gender}
                onChange={e =>
                  setValues({
                    ...values,
                    gender: e.target.value == 'male' ? 'male' : e.target.value == 'female' ? 'female' : 'other'
                  })
                }
                aria-label='gender'
                name='account-settings-info-radio'
              >
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => saveUserInfo()}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbar.open}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          autoHideDuration={6000}
          message={snackbar.message}
          onClose={() => setSnackbar({ open: false, message: '' })}
        />
      </form>
    </CardContent>
  ) : null
}

export default TabInfo
