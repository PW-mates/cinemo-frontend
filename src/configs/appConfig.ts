import { Movie, MovieCategory, Room, Screening, Seat, ShortUser, Theater, User } from 'src/@core/layouts/types'

type AppConfig = {
  endpoint: string
}

const appConfig: AppConfig = {
  endpoint: 'https://api.cinemo.pl'
}

export namespace AccountListEndpoint {
  export const path = '/accounts'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: ShortUser[]
  }
}

export namespace AccountLoginEndpoint {
  export const path = '/account/login'
  export const method = 'POST'

  export type Request = {
    username: string
    password: string
  }
  export type Response = {
    success: boolean
    message: string
    data?: {
      access_token: string
    }
  }
}

export namespace AccountInfoEndpoint {
  export const path = '/account/info'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: User
  }
}

export namespace AccountUpdateEndpoint {
  /**
   * @description
   * This endpoint is used to update user's account data.
   */

  export const path = '/account/info'
  export const method = 'PATCH'

  export type Request = User
  export type Response = {
    success: boolean
    message: string
    data?: User
  }
}

export namespace AccountUpdatePasswordEndpoint {
  /**
   * @description
   * This endpoint is used to update user's password.
   */

  export const path = '/account/password'
  export const method = 'POST'

  export type Request = {
    oldPassword: string
    newPassword: string
  }
  export type Response = {
    success: boolean
    message: string
  }
}

export namespace MovieCategoryListEndpoint {
  /**
   * @description
   * This endpoint is used to get list of movie categories.
   */
  export const path = '/movie-categories'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: MovieCategory[]
  }
}

export namespace MovieCategoryCreateEndpoint {
  /**
   * @description
   * This endpoint is used to create new movie category.
   */
  export const path = '/movie-categories'
  export const method = 'POST'

  export type Request = {
    name: string
    slug: string
  }
  export type Response = {
    success: boolean
    message: string
    data?: MovieCategory
  }
}

export namespace MovieCategoryGetEndpoint {
  /**
   * @description
   * This endpoint is used to get movie category by id, include list of movies in this category.
   */
  export const path = '/movie-categories/:id'
  export const method = 'GET'

  export type Request = {
    id: string
  }
  export type Response = {
    success: boolean
    message: string
    data?: MovieCategory & {
      movies: Movie[]
    }
  }
}

export namespace MovieCategoryUpdateEndpoint {
  /**
   * @description
   * This endpoint is used to update movie category.
   * @param id - movie category id
   */
  export const path = '/movie-categories/:id'
  export const method = 'PATCH'

  export type Request = MovieCategory
  export type Response = {
    success: boolean
    message: string
    data?: MovieCategory
  }
}

export namespace MovieCategoryDeleteEndpoint {
  /**
   * @description
   * This endpoint is used to delete movie category.
   * @param id - movie category id
   * @param force - if true, then movie category will be deleted without checking if it is used in any movie
   * @param force - if false, then movie category will be deleted only if it is not used in any movie
   */
  export const path = '/movie-categories/:id'
  export const method = 'DELETE'
}

export namespace MovieListEndpoint {
  /**
   * @description
   * This endpoint is used to get list of movies.
   */
  export const path = '/movies'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Movie[]
  }
}

export namespace MovieCreateEndpoint {
  /**
   * @description
   * This endpoint is used to create new movie.
   */
  export const path = '/movies'
  export const method = 'POST'

  export type Request = Movie & {
    category: string[] // array of movie category ids
  }
  export type Response = {
    success: boolean
    message: string
    data?: Movie
  }
}

export namespace MovieUpdateEndpoint {
  /**
   * @description
   * This endpoint is used to update movie.
   * @param id - movie id
   */
  export const path = '/movies/:id'
  export const method = 'PATCH'

  export type Request = Movie & {
    category: string[] // array of movie category ids
  }
  export type Response = {
    success: boolean
    message: string
    data?: Movie
  }
}

export namespace MovieDeleteEndpoint {
  /**
   * @description
   * This endpoint is used to delete movie.
   * @param id - movie id
   */
  export const path = '/movies/:id'
  export const method = 'DELETE'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
  }
}

export namespace MovieGetEndpoint {
  /**
   * @description
   * This endpoint is used to get movie.
   * @param id - movie id
   */
  export const path = '/movies/:id'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Movie & {
      category: MovieCategory
    }
  }
}

export namespace MovieUploadPosterEndpoint {
  /**
   * @description
   * This endpoint is used to upload movie poster.
   * @param id - movie id
   */
  export const path = '/movies/:id/poster'
  export const method = 'POST'

  export type Request = {
    poster: string // base64 encoded image
  }
  export type Response = {
    success: boolean
    message: string
    data?: Movie
  }
}

export namespace TheaterListEndpoint {
  /**
   * @description
   * This endpoint is used to get list of theaters.
   */
  export const path = '/theaters'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Theater[]
  }
}

export namespace TheaterCreateEndpoint {
  /**
   * @description
   * This endpoint is used to create new theater.
   *
   */
  export const path = '/theaters'
  export const method = 'POST'

  export type Request = Theater & {
    managerId: string
  }
  export type Response = {
    success: boolean
    message: string
    data?: Theater
  }
}

export namespace TheaterGetEndpoint {
  /**
   * @description
   * This endpoint is used to get theater.
   * @param id - theater id
   */
  export const path = '/theaters/:id'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Theater & {
      rooms: Room[]
    }
  }
}

export namespace TheaterUpdateEndpoint {
  /**
   * @description
   * This endpoint is used to update theater.
   * @param id - theater id
   */
  export const path = '/theaters/:id'
  export const method = 'PATCH'

  export type Request = Theater & {
    managerId: string
  }
  export type Response = {
    success: boolean
    message: string
    data?: Theater
  }
}

export namespace TheaterDeleteEndpoint {
  /**
   * @description
   * This endpoint is used to delete theater.
   * @param id - theater id
   */
  export const path = '/theaters/:id'
  export const method = 'DELETE'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
  }
}

export namespace RoomListEndpoint {
  /**
   * @description
   * This endpoint is used to get list of rooms.
   */
  export const path = '/rooms'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Room[]
  }
}

export namespace RoomGetEndpoint {
  /**
   * @description
   * This endpoint is used to get room.
   * @param id - room id
   */
  export const path = '/rooms/:id'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Room & {
      theater: Theater
    }
  }
}

export namespace RoomCreateEndpoint {
  /**
   * @description
   * This endpoint is used to create new room.
   * This also creates new seats for the room and assigns them to the room.
   */
  export const path = '/rooms'
  export const method = 'POST'

  export type Request = Room & {
    theaterId: string
  }
  export type Response = {
    success: boolean
    message: string
    data?: Room
  }
}

export namespace RoomUpdateEndpoint {
  /**
   * @description
   * This endpoint is used to update room.
   * @param id - room id
   *
   * Only name can be updated.
   */
  export const path = '/rooms/:id'
  export const method = 'PATCH'

  export type Request = Room & {
    theaterId: string
  }
  export type Response = {
    success: boolean
    message: string
    data?: Room
  }
}

export namespace RoomDeleteEndpoint {
  /**
   * @description
   * This endpoint is used to delete room.
   * @param id - room id
   */

  export const path = '/rooms/:id'
  export const method = 'DELETE'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
  }
}

export namespace SeatListEndpoint {
  /**
   * @description
   * This endpoint is used to get list of seats for a room.
   * @param roomId - room id
   */
  export const path = '/rooms/:roomId/seats'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Seat[]
  }
}

export namespace SeatUpdateEndpoint {
  /**
   * @description
   * This endpoint is used to update seat.
   * @param seatId - seat id
   */
  export const path = '/seats/:seatId'
  export const method = 'PATCH'

  export type Request = Seat
  export type Response = {
    success: boolean
    message: string
    data?: Seat
  }
}

export namespace ScreeningListEndpoint {
  /**
   * @description
   * This endpoint is used to get list of screenings.
   */
  export const path = '/screenings'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Screening[]
  }
}

export namespace ScreeningCreateEndpoint {
  /**
   * @description
   * This endpoint is used to create new screening.
   */

  export const path = '/screenings'
  export const method = 'POST'

  export type Request = {
    movieId: number
    roomId: number
    date: Date
    openSale?: Date // Default is 7 days before screening date
  }

  export type Response = {
    success: boolean
    message: string
    data?: Screening
  }
}

export namespace ScreeningGetEndpoint {
  /**
   * @description
   * This endpoint is used to get screening.
   * @param id - screening id
   */
  export const path = '/screenings/:id'
  export const method = 'GET'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
    data?: Screening
  }
}

export namespace ScreeningUpdateEndpoint {
  /**
   * @description
   * This endpoint is used to update screening.
   * @param id - screening id
   */
  export const path = '/screenings/:id'
  export const method = 'PATCH'

  export type Request = {
    movieId?: number
    roomId?: number
    date?: Date
    openSale?: Date
  }
  export type Response = {
    success: boolean
    message: string
    data?: Screening
  }
}

export namespace ScreeningDeleteEndpoint {
  /**
   * @description
   * This endpoint is used to delete screening.
   * @param id - screening id
   */
  export const path = '/screenings/:id'
  export const method = 'DELETE'

  export type Request = {}
  export type Response = {
    success: boolean
    message: string
  }
}

export default appConfig
