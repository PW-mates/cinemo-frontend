import { Button, Card, CardActions, CardHeader, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { Room } from "src/@core/layouts/types"
import useFetch from "src/@core/utils/use-fetch"
import { RoomListEndpoint } from "src/configs/appConfig"
import RoomInfo from "src/views/rooms/RoomInfo"
import RoomsList from "src/views/rooms/RoomsList"

const Rooms = () => {
    const [roomsData, setRoomsData] = useState<Room[] | undefined>(undefined)
    const [dialogNewRoom, setDialogNewRoom] = useState<boolean>(false)
    const [newRoom, setNewRoom] = useState<Room | undefined>(undefined)
    const { fetchData, response, error, loading } = useFetch()
    const fetchRoomData = () => {
      fetchData(RoomListEndpoint.method, RoomListEndpoint.path).then(res => {
        if (res && res.success) {
          setRoomsData(res.data)
        }
      })
    }
    useEffect(() => {
      if (roomsData == undefined) {
        fetchRoomData()
      }
    }, [roomsData])
  
    const updatedRoomInfo = () => {
        fetchRoomData()
    }
    
    const newRoomDialog = () => {
      setNewRoom({} as Room)
      setDialogNewRoom(true)
    }


    return (
      <Grid container spacing={6}>
        <Grid item xs={16}>
          <Card>
            <CardHeader title='Rooms' titleTypographyProps={{ variant: 'h6' }}></CardHeader>
            <CardActions className='card-action-dense' sx={{ width: '100%' }}>
              <Button onClick={newRoomDialog}>Add new</Button>
            </CardActions>
  
            {roomsData !== undefined ? (
              <RoomsList roomsData={roomsData || []} updatedRoomInfo={updatedRoomInfo} />
            ) : null}
          </Card>
        </Grid>
        {dialogNewRoom && newRoom ? (
          <RoomInfo
            selectedRoom={newRoom}
            closeRoomInfo={() => setDialogNewRoom(false)}
            updatedRoomInfo={updatedRoomInfo}
          ></RoomInfo>
        ) : null}
      </Grid>
    )
}

export default Rooms;