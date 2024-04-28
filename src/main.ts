import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";
createApp(App).use(router).use(VueAwesomePaginate).mount('#app')
