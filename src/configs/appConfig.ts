import { User } from 'src/@core/layouts/types'

type AppConfig = {
  endpoint: string
}

const appConfig: AppConfig = {
  endpoint: 'http://localhost:8080'
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

export default appConfig
