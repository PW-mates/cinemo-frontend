import { useEffect, useState } from 'react'
import appConfig from 'src/configs/appConfig'
import { Settings } from '../context/settingsContext'
import fetch, { RequestInit, HeadersInit } from 'node-fetch'
import { useSettings } from '../hooks/useSettings'

export default function useCustomFetch<T>() {
  const [response, setResponse] = useState<T | null | unknown>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const { settings, saveSettings } = useSettings()
  const fetchData = async (
    method = 'GET',
    pathname: string,
    headers?: Record<string, string>,
    data?: Record<string, string>,
    options?: RequestInit

    // settings?: Settings
  ) => {
    try {
      if (!pathname) {
        throw new Error('No pathname provided')
      }
      const requestOptions: RequestInit = options || {}
      if (method) requestOptions.method = method
      const requestHeaders: HeadersInit = headers || {}
      if (!requestHeaders['Content-Type']) {
        requestHeaders['Content-Type'] = 'application/json'
      }
      if (!requestHeaders['Authorization'] && settings?.user && settings?.user?.access_token) {
        requestHeaders['Authorization'] = `Bearer ${settings.user.access_token}`
      }
      requestOptions.headers = requestHeaders
      if (data) {
        requestOptions.body = JSON.stringify(data)
      }
      setLoading(true)
      const res = await fetch(appConfig.endpoint + pathname, requestOptions)
      const json = await res.json()
      setResponse(json)
      setLoading(false)

      return json
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('An unknown error occurred.'))
      }
    } finally {
      setLoading(false)
    }
  }

  return { fetchData, response, error, loading }
}
