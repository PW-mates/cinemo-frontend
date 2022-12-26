// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import useFetch from 'src/@core/utils/use-fetch'

import { useSettings } from 'src/@core/hooks/useSettings'
import { AccountUpdateEndpoint } from 'src/configs/appConfig'
import { User } from 'src/@core/layouts/types'
import Snackbar from '@mui/material/Snackbar'

const TabAccount = () => {
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
    }
  }, [settings.user, values])

  return values ? (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              placeholder={settings.user?.username}
              InputProps={{ readOnly: true }}
              value={values.username}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder={settings.user?.email || ''}
              defaultValue={settings.user?.email || ''}
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='First Name'
              placeholder={settings.user?.firstName || ''}
              defaultValue={settings.user?.firstName || ''}
              onChange={e => setValues({ ...values, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Last Name'
              placeholder={settings.user?.lastName || ''}
              defaultValue={settings.user?.lastName || ''}
              onChange={e => setValues({ ...values, lastName: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label='Role'
                value={values.roles?.[0]?.id || 2}
                onChange={e => setValues({ ...values, roles: [{ id: parseInt(e.target.value.toString()), name: '' }] })}
              >
                <MenuItem value='1'>Admin</MenuItem>
                <MenuItem value='2'>User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label='Status'
                value={values.status}
                onChange={e => setValues({ ...values, status: e.target.value == 'active' ? 'active' : 'inactive' })}
              >
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </Select>
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

export default TabAccount
