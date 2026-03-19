import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'
import './assets/main.css'
import './registerServiceWorker'

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('Nueva versión disponible. ¿Recargar?')) {
            updateSW(true)
        }
    },
    onOfflineReady() {
        console.log('Juega y Aprende está lista para funcionar sin internet')
    }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')