import {createRouter, createWebHistory, RouterOptions} from "vue-router";
import {getCookie} from "../lib/utils";

const Login = () => import("../pages/auth/Login.vue");
const Register = () => import("../pages/auth/Register.vue");
const TasksList = () => import("../pages/tasks/TasksList.vue");
const CreateTask = () => import("../pages/tasks/CreateTask.vue");
const EditTask = () => import("../pages/tasks/EditTask.vue");

const routes= [
    {
        path: "/",
        name:"login",
        component: Login,
        beforeEnter: checkIsAuthenticated
    },{
        path:"/register",
        name:"register",
        component: Register
    },{
        path:"/tasks",
        name:"tasks",
        component: TasksList,
        beforeEnter:checkIsNotAuthenticated
    },{
        path:"/tasks/create",
        name:"create-task",
        component: CreateTask,
        beforeEnter:checkIsNotAuthenticated
    },{
        path:"/tasks/:id/edit",
        name:"edit-task",
        component: EditTask,
        beforeEnter:checkIsNotAuthenticated
    },
];

function checkIsNotAuthenticated(to, from , next){
    //TODO: Secure it more
    const token = getCookie("auth_token");
    if(!token){
        return typeof next === "function" && next({
            name : "login"
        })
    }
    typeof next === "function" && next();
}

function checkIsAuthenticated(to, from, next){
    //TODO: Secure it more
    const token = getCookie("auth_token");
    if(!token){
        return typeof next === "function" && next();
    }
    return typeof next === "function" && next({
        name : "tasks"
    })
}

const router = createRouter({
    history:createWebHistory(),
    routes
} as RouterOptions);

export default router;