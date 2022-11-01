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

export type User = {
  id: string
  access_token: string
  birthDate?: Date
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
  role: 'admin' | 'user'
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
  releaseDate?: Date
  duration?: number
  rating?: number
  posterPhoto?: string
  trailerUrl?: string
  showingFrom?: Date
  showingTo?: Date
  category?: MovieCategory[]
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
  manager: User
}

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
  totalPrice: number
  createdAt: Date
  paymentMethod: 'cash' | 'card'
  paymentId: string
  status: 'new' | 'paid' | 'cancelled' | 'used' | 'expired'
}

export type TicketType = {
  id: string
  name: string
  seatType: SeatType
  price: number
  description?: string
}

export type Payment = {
  id: string
  amount: number
  currency: string
  status: 'unpaid' | 'paid' | 'cancelled'
  paymentMethod: 'cash' | 'card'
  reference: string
}
