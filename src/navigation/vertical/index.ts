// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import TicketOutline from 'mdi-material-ui/TicketOutline'
import Theater from 'mdi-material-ui/Theater'
import MovieFilderOutline from 'mdi-material-ui/MovieFilterOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Management'
    },
    {
      title: 'Sell ticket',
      icon: TicketOutline,
      path: '/sell-ticket'
    },
    {
      title: 'Movies',
      icon: MovieFilderOutline,
      path: '/movies'
    },
    {
      title: 'Showtimes',
      icon: CalendarBlankOutline,
      path: '/schedule'
    },
    {
      title: 'Theaters',
      icon: Theater,
      path: '/theaters'
    },
    {
      sectionTitle: 'Account'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    }
  ]
}

export default navigation
