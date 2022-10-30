import { useState, ChangeEvent } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'


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

const TheatersList = ({cinemaData}) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

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
            {cinemaData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(cinemaData => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={cinemaData.id}>
                  {columns.map(column => {
                    const value = cinemaData[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value) : column.id === "website"
                            ? <a href={value.toLocaleString()} target="_blank">{value}</a> : value}
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
        count={cinemaData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TheatersList
