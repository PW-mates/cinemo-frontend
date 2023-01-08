import { Button, Card, CardActions, CardHeader, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { MovieCategory } from "src/@core/layouts/types"
import useFetch from "src/@core/utils/use-fetch"
import { MovieCategoryListEndpoint } from "src/configs/appConfig"
import MovieCategoryInfo from "src/views/movie-categories/MovieCategoryInfo"
import MovieCategoriesList from "src/views/movie-categories/MovieCategoriesList"

const MovieCategories = () => {
    const [movieCategoriesData, setMovieCategoriesData] = useState<MovieCategory[] | undefined>(undefined)
    const [dialogNewMovieCategory, setDialogNewMovieCategory] = useState<boolean>(false)
    const [newMovieCategory, setNewMovieCategory] = useState<MovieCategory | undefined>(undefined)
    const { fetchData, response, error, loading } = useFetch()
    const fetchMovieCategoryData = () => {
      fetchData(MovieCategoryListEndpoint.method, MovieCategoryListEndpoint.path).then(res => {
        if (res && res.success) {
          setMovieCategoriesData(res.data)
        }
      })
    }
    useEffect(() => {
      if (movieCategoriesData == undefined) {
        fetchMovieCategoryData()
      }
    }, [movieCategoriesData])
  
    const updatedMovieCategoryInfo = () => {
        fetchMovieCategoryData()
    }
    
    const newMovieCategoryDialog = () => {
      setNewMovieCategory({} as MovieCategory)
      setDialogNewMovieCategory(true)
    }


    return (
      <Grid container spacing={6}>
        <Grid item xs={16}>
          <Card>
            <CardHeader title='MovieCategories' titleTypographyProps={{ variant: 'h6' }}></CardHeader>
            <CardActions className='card-action-dense' sx={{ width: '100%' }}>
              <Button onClick={newMovieCategoryDialog}>Add new</Button>
            </CardActions>
  
            {movieCategoriesData !== undefined ? (
              <MovieCategoriesList movieCategoriesData={movieCategoriesData || []} updatedMovieCategoryInfo={updatedMovieCategoryInfo} />
            ) : null}
          </Card>
        </Grid>
        {dialogNewMovieCategory && newMovieCategory ? (
          <MovieCategoryInfo
            selectedMovieCategory={newMovieCategory}
            closeMovieCategoryInfo={() => setDialogNewMovieCategory(false)}
            updatedMovieCategoryInfo={updatedMovieCategoryInfo}
          ></MovieCategoryInfo>
        ) : null}
      </Grid>
    )
}

export default MovieCategories;