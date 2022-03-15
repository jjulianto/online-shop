import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "register" */ '@/views/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '@/views/auth/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router