import { ReactNode } from 'react'
import { Settings } from 'src/@core/context/settingsContext'

export type ContentWidth = 'full' | 'boxed'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type NavLink = {
  path?: string
  title: string
  action?: string
  subject?: string
  disabled?: boolean
  badgeContent?: string
  externalLink?: boolean
  openInNewTab?: boolean
  icon?: string | string[] | ReactNode
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavSectionTitle = {
  sectionTitle: string
  action?: string
  subject?: string
}

export type VerticalNavItemsType = (NavLink | NavSectionTitle)[]

export type LayoutProps = {
  hidden: boolean
  settings: Settings
  children: ReactNode
  verticalNavItems?: VerticalNavItemsType
  scrollToTop?: (props?: any) => ReactNode
  saveSettings: (values: Settings) => void
  footerContent?: (props?: any) => ReactNode
  verticalAppBarContent?: (props?: any) => ReactNode
  verticalNavMenuContent?: (props?: any) => ReactNode
  verticalNavMenuBranding?: (props?: any) => ReactNode
  afterVerticalNavMenuContent?: (props?: any) => ReactNode
  beforeVerticalNavMenuContent?: (props?: any) => ReactNode
}

export type BlankLayoutProps = {
  children: ReactNode
}

export type UserRole = {
  id: number,
  name?: string,
}

export type User = {
  id: string
  access_token?: string
  birthDate?: number
  country?: string
  gender: 'male' | 'female' | 'other'
  bio?: string
  personalWebsite?: string
  language?: string
  createdAt: Date
  email: string
  firstName: string
  lastName: string
  updatedAt: Date
  username: string
  phone?: string
  profilePicture?: string
  cinema?: any
  status: 'active' | 'inactive'
  roles?: UserRole[]
}

export type ShortUser = {
  id: string
  firstName: string
  lastName: string
  username: string
  profilePicture?: string
}

export type MovieCategory = {
  id: string
  name: string
  slug: string
  movies?: Movie[]
}

export type Movie = {
  id: string
  title: string
  description?: string
  director?: string
  distributor?: string
  releaseDate?: number
  duration?: number
  rating?: number
  posterPhoto?: string
  trailerUrl?: string
  showingFrom?: number
  showingTo?: number
  categories?: MovieCategory[]
}

export type Theater = {
  id: string
  name: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  phone: string
  email: string
  website: string
  manager: ShortUser
}
export type LatLngLiteral = google.maps.LatLngLiteral;

export type Room = {
  id: string
  name: string
  seatsCount: number
  theater: Theater
  numberOfRows: number
  seatsPerRow: number
}

export type SeatType = {
  id: string
  name: string
  color: string
  price: number
}

export type Seat = {
  id: string
  row: number
  column: number
  room: Room
  type: SeatType
}

export type Screening = {
  id: string
  movie: Movie
  room: Room
  theater: Theater
  openSale: Date
  date: Date
}

export type Ticket = {
  id: string
  code: string // Random generated code when ticket is created
  screening: Screening
  seat?: Seat[]
  seller: User
  totalPrice: number // Need to be calculated from seat type price
  createdAt: Date
  paymentMethod: 'cash' | 'card'
  paymentId: string
  status: 'new' | 'paid' | 'cancelled' | 'used' | 'expired'
  payment: Payment
}

export type Payment = {
  id: string
  amount: number
  currency: string
  status: 'unpaid' | 'paid' | 'cancelled' // if status changed to 'paid', ticket status need to change to paid
  paymentMethod: 'cash' | 'card'
  reference: string
}
