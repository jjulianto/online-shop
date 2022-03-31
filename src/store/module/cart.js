import Api from "../../api/Api"
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
        CLEAR_CART(state) {
            state.cart = []
            state.cartTotal = 0
            state.cartWeight = 0
        },
    },

    actions: {
        addToCart({ commit }, { product_id, price, quantity, weight }) {
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Swal.fire({
                title: 'Loading...',
                text: 'Silahkan tunggu beberapa saat!',
                icon: "info",
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            Api.post('/cart', {
                product_id: product_id,
                price: price,
                quantity: quantity,
                weight: weight,
                customer_id: user.id
            })
                .then(() => {
                    Api.get('/cart')
                        .then(response => {
                            commit('GET_CART', response.data.cart)
                        })

                    Api.get('/cart/total')
                        .then(response => {
                            commit('TOTAL_CART', response.data.total)
                        })

                    Swal.close()
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

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.get('/cart')
                .then(response => {
                    commit('GET_CART', response.data.cart)
                })
        },
        cartTotal({ commit }) {
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.get('/cart/total')
                .then(response => {
                    commit('TOTAL_CART', response.data.total)
                })
        },
        cartWeight({ commit }) {
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.get('/cart/totalWeight')
                .then(response => {
                    commit('CART_WEIGHT', response.data.total)
                })
        },
        removeCart({ commit }, cart_id) {
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Swal.fire({
                title: 'Loading...',
                text: 'Silahkan tunggu beberapa saat!',
                icon: "info",
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            Api.post('/cart/remove', {
                cart_id: cart_id
            })
                .then(() => {
                    Api.get('/cart')
                        .then(response => {
                            commit('GET_CART', response.data.cart)
                        })

                    Api.get('/cart/total')
                        .then(response => {
                            commit('TOTAL_CART', response.data.total)
                        })

                    Api.get('/cart/totalWeight')
                        .then(response => {
                            commit('CART_WEIGHT', response.data.total)
                        })

                    Swal.close()
                    Swal.fire({
                        title: "Success",
                        text: "Produk dihapus dari keranjang.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        },
        checkout({ commit }, data) {
            return new Promise((resolve, reject) => {
                Api.post('/checkout', {
                    courier: data.courier_type,
                    service: data.courier_service,
                    cost: data.courier_cost,
                    weight: data.weight,
                    name: data.name,
                    phone: data.phone,
                    province: data.province_id,
                    city: data.city_id,
                    address: data.address,
                    grand_total: data.grandTotal
                })
                    .then(response => {
                        resolve(response.data)

                        Api.post('/cart/removeAll')
                            .then(() => {
                                commit('CLEAR_CART')
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
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