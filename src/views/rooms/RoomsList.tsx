import { useState, ChangeEvent } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from '@mui/material/Link'
import { Room } from 'src/@core/layouts/types'

import { IconButton } from '@mui/material'
import { EyeOutline } from 'mdi-material-ui'
import RoomInfo from './RoomInfo'

interface Column {
  id: 'id' | 'name' | 'cinemaName' | 'seatsCount' | 'numberOfRows' | 'seatsPerRow'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  { id: 'cinemaName', label: 'Cinema', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'seatsCount',
    label: 'Seats count',
    minWidth: 100,
    align: 'center'
  },
  { id: 'numberOfRows', label: 'Rows', minWidth: 30, align: 'center' },
  { id: 'seatsPerRow', label: 'Columns', minWidth: 30, align: 'center' }
]

const RoomsList = ({ roomsData, updatedRoomInfo }: { roomsData: Room[]; updatedRoomInfo: any }) => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const queryParams = new URLSearchParams(window.location.search)
  const [showRoomInfo, setShowRoomInfo] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room>()

  const selectRoom = (id: Room['id'], event: ChangeEvent<any>) => {
    if (!event.target.href) {
      const room = roomsData.find(room => room.id === id)

      setSelectedRoom(room)
      setShowRoomInfo(true)
    }
  }

  const closeRoomInfo = () => {
    setShowRoomInfo(false)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {[
                ...columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                )),
                <TableCell key='actions' align='right' sx={{ minWidth: 100 }}>
                  Seats
                </TableCell>
              ]}
            </TableRow>
          </TableHead>
          <TableBody>
            {roomsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((row) => {
                const cinemaId = queryParams.get('cinemaId')
    
                return cinemaId ? row.theater.id == cinemaId : true
            }).map(room => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={room.id}>
                  {[
                    ...columns.map(column => {
                      const columnId = column.id
                      const value = columnId != 'cinemaName' ? room[columnId] : room.theater.name

                      return (
                        <TableCell key={column.id} align={column.align} onClick={e => selectRoom(room.id, e)}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    }),
                    <TableCell key='actions' align='right'>
                      <Link href={`/seats?roomId=${room.id}`}>
                        <IconButton>
                          <EyeOutline />
                        </IconButton>
                      </Link>
                    </TableCell>
                  ]}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={roomsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showRoomInfo && selectedRoom && (
        <RoomInfo
          selectedRoom={selectedRoom}
          closeRoomInfo={closeRoomInfo}
          updatedRoomInfo={updatedRoomInfo}
        />
      )}
    </Paper>
  )
}

export default RoomsList
