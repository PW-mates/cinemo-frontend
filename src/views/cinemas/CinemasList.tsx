import { useState, ChangeEvent } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Link from "@mui/material/Link"
import { Theater } from "src/@core/layouts/types"

import CinemaInfo from "./CinemaInfo"


interface Column {
  id: 'id' | 'name' | 'address' | 'phone' | 'email' | 'website'
  label: string
  minWidth?: number
  align?: 'right'
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
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'address', label: 'Address', minWidth: 170 },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 100,
    align: 'right'
  },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'website',
    label: 'Website',
    minWidth: 170,
    align: 'right'
  }
]

const CinemasList = ({ cinemasData }: { cinemasData: Theater[] }) => {

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [showCinemaInfo, setShowCinemaInfo] = useState(false)
  const [selectedCinema, setSelectedCinema] = useState<Theater>()

  const selectCinema = (id: Theater["id"], event: ChangeEvent<any>) => {
    if (!event.target.href) {
      let cinema;
      cinema = cinemasData.find((cinema) => cinema.id === id)

      setSelectedCinema(cinema)
      setShowCinemaInfo(true)
    }
  }

  const closeCinemaInfo = () => {
    setShowCinemaInfo(false)
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
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cinemasData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(cinema => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={cinema.id} onClick={(e) => selectCinema(cinema.id, e)}>
                  {columns.map(column => {
                    const value = cinema[column.id]
                    return (
                      <TableCell key={column.id} align={column.align} >
                        {column.format && typeof value === 'number'
                          ? column.format(value) : column.id === "website"
                            ? <Link href={value.toLocaleString()} target="_blank" >{value}</Link> : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={cinemasData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showCinemaInfo && <CinemaInfo selectedCinema={selectedCinema} closeCinemaInfo={closeCinemaInfo} />}
    </Paper>
  )
}

export default CinemasList
