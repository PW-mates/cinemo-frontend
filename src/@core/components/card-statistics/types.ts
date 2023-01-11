// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type CardStatsVerticalProps = {
  title: string
  icon: ReactNode
  color?: ThemeColor
  href: string
}
