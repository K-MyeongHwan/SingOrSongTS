import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/route";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App);

app.component('EasyDataTable', Vue3EasyDataTable);
app.use(router).mount('#app');