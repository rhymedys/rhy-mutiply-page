import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const Test = () => import(/* webpackChunkName: "./page1/components/_PayResult" */ "./test");
export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "test"
            },
        },
        {
            path: "/test",
            component: Test,
            name: "test"
        }
    ]
});