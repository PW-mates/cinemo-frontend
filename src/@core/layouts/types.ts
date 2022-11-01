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
