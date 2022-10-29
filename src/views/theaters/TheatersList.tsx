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

interface Data {
  id: number
  name: string
  address: string
  phone: string
  email: string
  website: string
}

function createData(  id: number, name: string, address: string, phone: string, email: string, website: string): Data {

  return { id, name, address, phone, email, website }
}

const rows = [
  createData(1, "test1", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(2, "test2", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(3, "test3", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(4, "test4", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(5, "test5", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(6, "test6", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(7, "test7", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(8, "test8", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
  createData(9, "test9", "addres string", "phone string", "email string", "https://www.cinema-city.pl/kina/arkadia/1074#/"),
]

const TheatersList = () => {
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TheatersList
