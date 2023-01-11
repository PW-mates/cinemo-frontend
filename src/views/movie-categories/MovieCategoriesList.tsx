import { useState, ChangeEvent } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { MovieCategory } from 'src/@core/layouts/types'
import MovieCategoryInfo from './MovieCategoryInfo'

interface Column {
  id: 'id' | 'name' | 'slug'
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
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'slug', label: 'Slug', minWidth: 100 },
]

const MovieCategoriesList = ({ movieCategoriesData, updatedMovieCategoryInfo }: { movieCategoriesData: MovieCategory[]; updatedMovieCategoryInfo: any }) => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [showMovieCategoryInfo, setShowMovieCategoryInfo] = useState(false)
  const [selectedMovieCategory, setSelectedMovieCategory] = useState<MovieCategory>()

  const selectMovieCategory = (id: MovieCategory['id'], event: ChangeEvent<any>) => {
    if (!event.target.href) {
      const movieCategory = movieCategoriesData.find(movieCategory => movieCategory.id === id)

      setSelectedMovieCategory(movieCategory)
      setShowMovieCategoryInfo(true)
    }
  }

  const closeMovieCategoryInfo = () => {
    setShowMovieCategoryInfo(false)
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
                ))
              ]}
            </TableRow>
          </TableHead>
          <TableBody>
            {movieCategoriesData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(movieCategory => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={movieCategory.id}>
                    {
                      columns.map(column => {
                        const columnId = column.id
                        const value = movieCategory[columnId]
                        
                        return (
                          <TableCell key={column.id} align={column.align} onClick={e => selectMovieCategory(movieCategory.id, e)}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={movieCategoriesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showMovieCategoryInfo && selectedMovieCategory && (
        <MovieCategoryInfo selectedMovieCategory={selectedMovieCategory} closeMovieCategoryInfo={closeMovieCategoryInfo} updatedMovieCategoryInfo={updatedMovieCategoryInfo} />
      )}
    </Paper>
  )
}

export default MovieCategoriesList
