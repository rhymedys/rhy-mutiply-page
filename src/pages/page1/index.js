import Vue from "vue";
import App from "./index.vue";
import router from "./router";
import './index.css'
new Vue({
    render: h => h(App),
    router,
    el: "#root"
});