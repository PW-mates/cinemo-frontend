import { useContext, useEffect } from 'react'
import { SettingsContext, SettingsContextValue } from 'src/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => {
    const { settings, saveSettings } = useContext(SettingsContext)
    useEffect(() => {
        const localSettings = localStorage.getItem('settings')
        if (localSettings) {
          saveSettings(JSON.parse(localSettings))
        }
      }, [])

    return { settings, saveSettings }
}
