import './assets/main.css';
import '@fontsource-variable/inter';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { MyPreset } from '@/primevue.preset';
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.p-dark'
        }
    }
});
app.use(ToastService);
app.use(MotionPlugin);
app.mount('#app');
