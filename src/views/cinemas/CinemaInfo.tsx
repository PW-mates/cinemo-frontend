import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

const CinemaDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CinemaInfo = ({ selectedCinema, closeCinemaInfo }: { selectedCinema: any, closeCinemaInfo: any }) => {

  const { name: name } = selectedCinema
  const text = "text text text text text text text text text text text text text text text text text text text text text "
  return (

      
      <CinemaDialog
        onClose={closeCinemaInfo}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogTitle>
          {name}
        </DialogTitle>
        <DialogContent>
          <p>Content</p>
          <Typography>{text}</Typography>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeCinemaInfo}>
            Close
          </Button>
        </DialogActions>
      </CinemaDialog>


  )
}
export default CinemaInfo