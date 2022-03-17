import api from "@/api/api";

const auth = {
    namespaced: true,

    state: {
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {},
    },

    mutations: {
        AUTH_SUCCESS(state, token, user) {
            state.token = token
            state.user = user
        },
        GET_USER(state, user) {
            state.user = user
        },
        AUTH_LOGOUT(state) {
            state.token = ''
            state.user = {}
        }
    },

    actions: {
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                api.post('/register', {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        password_confirmation: user.password_confirmation
                    })
                    .then(response => {
                        const token = response.data.token
                        const user = response.data.user

                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))

                        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                        commit('AUTH_SUCCESS', token, user)

                        commit('GET_USER', user)

                        api.get('/cart')
                            .then(response => {
                                commit('cart/GET_CART', response.data.cart, { root: true })
                            })

                        api.get('/cart/total')
                            .then(response => {
                                commit('cart/TOTAL_CART', response.data.total, { root: true })
                            })

                        resolve(response);
                    }).catch(error => {
                        localStorage.removeItem('token')

                        reject(error.response.data)
                    })
            });
        },
        getUser({ commit }) {
            const token = localStorage.getItem('token')

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            api.get('/user')
                .then(response => {
                    commit('GET_USER', response.data.user)
                })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT')

                localStorage.removeItem('token')
                localStorage.removeItem('user')

                commit('cart/GET_CART', 0, { root: true })
                commit('cart/TOTAL_CART', 0, { root: true })

                delete api.defaults.headers.common['Authorization']

                resolve()
            })
        },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                api.post('/login', {
                        email: user.email,
                        password: user.password,
                    })
                    .then(response => {
                        const token = response.data.token
                        const user = response.data.user

                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))

                        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                        commit('AUTH_SUCCESS', token, user)

                        commit('GET_USER', user)

                        api.get('/cart')
                            .then(response => {
                                commit('cart/GET_CART', response.data.cart, { root: true })
                            })

                        api.get('/cart/total')
                            .then(response => {
                                commit('cart/TOTAL_CART', response.data.total, { root: true })
                            })

                        resolve(response)
                    }).catch(error => {
                        localStorage.removeItem('token')

                        reject(error.response.data)
                    })
            })
        },
    },

    getters: {
        currentUser(state) {
            return state.user
        },

        isLoggedIn(state) {
            return state.token
        },
    }
}

export default auth