import { Movie, User } from 'src/@core/layouts/types'

type AppConfig = {
  endpoint: string
}

const appConfig: AppConfig = {
  endpoint: 'https://api.cinemo.pl'
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

  export type Request = Movie
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

  export type Request = Movie
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
    data?: Movie
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

export default appConfig
