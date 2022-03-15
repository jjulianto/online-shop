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

                        api.defaults.headers.common['Authorization'] = "Bearer " + token

                        commit('AUTH_SUCCESS', token, user)

                        resolve(response);
                    }).catch(error => {
                        localStorage.removeItem('token')

                        reject(error.response.data)
                    })
            });
        },
        getUser({ commit }) {
            const token = localStorage.getItem('token')

            api.defaults.headers.common['Authorization'] = "Bearer " + token
            api.get('/user')
                .then(response => {
                    commit('GET_USER', response.data.user)
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