// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'

// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import router from 'next/router'
import useFetch from 'src/@core/utils/use-fetch'
import { AccountInfoEndpoint } from 'src/configs/appConfig'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const { fetchData, response, error, loading } = useFetch();

  // ** Fetch Account Info
  const [refreshed, setRefreshed] = useState(false);
  
  useEffect(() => {
    if (settings.user && settings.user.access_token && !refreshed) {
      setRefreshed(true);
      fetchData(AccountInfoEndpoint.method, AccountInfoEndpoint.path).then(res => {
        if (res && res.success) {
          saveSettings({ ...settings, user: { ...res.data, access_token: settings?.user?.access_token } })
        } else {
          saveSettings({ ...settings, user: undefined })
          router.push('/pages/login', undefined, { shallow: true })
        }
      })
    }
  }, [refreshed, settings]);

  useEffect(() => {
    if (settings && settings.loaded && !settings.user) {
      router.push('/pages/login', undefined, { shallow: true })
    }
  }, [settings])

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return settings.loaded && settings.user?.access_token ? (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()} // Navigation Items
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
    </VerticalLayout>
  ) : null
}

export default UserLayout
