import {createRouter, createWebHistory, RouterOptions} from "vue-router";
import {getCookie} from "../lib/utils";

const Login = () => import("../pages/auth/Login.vue");
const Register = () => import("../pages/auth/Register.vue");
const TasksList = () => import("../pages/tasks/TasksList.vue");

const routes= [
    {
        path: "/",
        component: Login
    },{
        path:"/register",
        component: Register
    },{
        path:"/tasks",
        component: TasksList,
        beforeEnter:(to, from)=>{
            //TODO: Secure it more
            const token = getCookie("auth_token");

        }
    }
];

const router = createRouter({
    history:createWebHistory(),
    routes
} as RouterOptions);

export default router;