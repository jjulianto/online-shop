import api from "@/api/api"
import Swal from 'sweetalert2'

const cart = {
    namespaced: true,

    state: {
        cart: [],
        cartTotal: 0,
        cartWeight: 0,
    },

    mutations: {
        GET_CART(state, product) {
            state.cart = product
        },
        TOTAL_CART(state, total) {
            state.cartTotal = total
        },
        CART_WEIGHT(state, weight) {
            state.cartWeight = weight
        },
    },

    actions: {
        addToCart({ commit }, { product_id, price, quantity, weight }) {
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))

            api.defaults.headers.common['Authorization'] = "Bearer " + token

            api.post('/cart', {
                    product_id: product_id,
                    price: price,
                    quantity: quantity,
                    weight: weight,
                    customer_id: user.id
                })
                .then(() => {
                    api.get('/cart')
                        .then(response => {
                            commit('GET_CART', response.data.cart)
                        })

                    api.get('/cart/total')
                        .then(response => {
                            commit('TOTAL_CART', response.data.total)
                        })

                    Swal.fire({
                        title: "Success",
                        text: "Produk ditambahkan ke keranjang.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        },
        cartCount({ commit }) {
            const token = localStorage.getItem('token')

            api.defaults.headers.common['Authorization'] = "Bearer " + token

            api.get('/cart')
                .then(response => {
                    commit('GET_CART', response.data.cart)
                })
        },
        cartTotal({ commit }) {
            const token = localStorage.getItem('token')

            api.defaults.headers.common['Authorization'] = "Bearer " + token

            api.get('/cart/total')
                .then(response => {
                    commit('TOTAL_CART', response.data.total)
                })
        },
        cartWeight({ commit }) {
            const token = localStorage.getItem('token')

            api.defaults.headers.common['Authorization'] = "Bearer " + token

            api.get('/cart/totalWeight')
                .then(response => {
                    commit('CART_WEIGHT', response.data.total)
                })
        },
        removeCart({ commit }, cart_id) {
            const token = localStorage.getItem('token')

            api.defaults.headers.common['Authorization'] = "Bearer " + token

            api.post('/cart/remove', {
                    cart_id: cart_id
                })
                .then(() => {
                    api.get('/cart')
                        .then(response => {
                            commit('GET_CART', response.data.cart)
                        })

                    api.get('/cart/total')
                        .then(response => {
                            commit('TOTAL_CART', response.data.total)
                        })

                    api.get('/cart/totalWeight')
                        .then(response => {
                            commit('CART_WEIGHT', response.data.total)
                        })
                })
        },
    },

    getters: {
        getCart(state) {
            return state.cart
        },
        cartCount(state) {
            return state.cart.length
        },
        cartTotal(state) {
            return state.cartTotal
        }
    }
}

export default cart