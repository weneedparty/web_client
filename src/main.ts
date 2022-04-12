import { createApp } from 'vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';

import App from './App.vue';

const app = createApp(App);

app
    .use(router)
    .use(Vant)
    .mount('#app');