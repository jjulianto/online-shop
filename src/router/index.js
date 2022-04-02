import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

const routes = [{
    path: '/register',
    name: 'register',
    component: () =>
        import( /* webpackChunkName: "register" */ '../views/auth/Register.vue'),
    meta: {
        hideForAuth: true
    }
},
{
    path: '/login',
    name: 'login',
    component: () =>
        import( /* webpackChunkName: "login" */ '../views/auth/Login.vue'),
    meta: {
        hideForAuth: true
    }
},
{
    path: '/customer/dashboard',
    name: 'dashboard',
    component: () =>
        import( /* webpackChunkName: "dashboard" */ '../views/dashboard/Index.vue'),
    meta: {
        requiresAuth: true
    }
},
{
    path: '/customer/order',
    name: 'order',
    component: () =>
        import( /* webpackChunkName: "order" */ '../views/order/Index.vue'),
    meta: {
        requiresAuth: true
    }
},
{
    path: '/customer/order/:snap_token',
    name: 'detail_order',
    component: () =>
        import( /* webpackChunkName: "detail_order" */ '../views/order/Show.vue'),
    meta: {
        requiresAuth: true
    }
},
{
    path: '/',
    name: 'home',
    component: () =>
        import( /* webpackChunkName: "home" */ '../views/home/Index.vue')
},
{
    path: '/product/:slug',
    name: 'detail_product',
    component: () =>
        import( /* webpackChunkName: "detail_product" */ '../views/product/Show.vue')
},
{
    path: '/categories',
    name: 'categories',
    component: () =>
        import( /* webpackChunkName: "category" */ '../views/category/Index.vue')
},
{
    path: '/category/:slug',
    name: 'detail_category',
    component: () =>
        import( /* webpackChunkName: "detail_category" */ '../views/category/Show.vue')
},
{
    path: '/cart',
    name: 'cart',
    component: () =>
        import( /* webpackChunkName: "cart" */ '../views/cart/Index.vue'),
    meta: {
        requiresAuth: true
    }
}
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
    } else if (to.matched.some(record => record.meta.hideForAuth)) {
        if (!store.getters['auth/isLoggedIn']) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

export default router