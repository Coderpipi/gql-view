import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/user",
            name: "user",
            component: () => import("@/views/UserView.vue")
        },
        {
            path: "/users",
            name: "users",
            component: () => import("@/views/UsersView.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        }
    ]
})

export default router
