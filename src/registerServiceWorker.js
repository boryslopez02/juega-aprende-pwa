import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('Nueva versión disponible. ¿Recargar?')) {
            updateSW(true)
        }
    },
    onOfflineReady() {
        console.log('App lista para funcionar offline')
    },
})