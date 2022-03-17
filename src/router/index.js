import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

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
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order',
        name: 'order',
        component: () =>
            import ( /* webpackChunkName: "order" */ '../views/order/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: () =>
            import ( /* webpackChunkName: "detail_order" */ '../views/order/Show.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'home',
        component: () =>
            import ( /* webpackChunkName: "home" */ '@/views/home/Index.vue')
    },
    {
        path: '/product/:slug',
        name: 'detail_product',
        component: () =>
            import ( /* webpackChunkName: "detail_product" */ '../views/product/Show.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        component: () =>
            import ( /* webpackChunkName: "category" */ '../views/category/Index.vue')
    },
    {
        path: '/category/:slug',
        name: 'detail_category',
        component: () =>
            import ( /* webpackChunkName: "detail_category" */ '../views/category/Show.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/isLoggedIn']) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router