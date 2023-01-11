// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const CardStatsVertical = (props: CardStatsVerticalProps) => {
  // ** Props
  const { title, color, icon, href } = props

  const router = useRouter()

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'common.white', backgroundColor: `${color}.main` }}>
            {icon}
          </Avatar>
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{title}</Typography>
        </Box>
        <Button variant='contained' fullWidth onClick={() => {
          router.push(href)
        }}>
          Open Page
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical

CardStatsVertical.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
