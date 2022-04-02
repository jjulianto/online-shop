import Api from '../../api/Api'
import Swal from "sweetalert2";

const order = {
    namespaced: true,

    state: {
        orders: [],
        detailOrder: {},
        productInOrder: [],
    },

    mutations: {
        GET_ORDER(state, orders) {
            state.orders = orders
        },
        DETAIL_ORDER(state, detailOrder) {
            state.detailOrder = detailOrder
        },
        PRODUCT_IN_ORDER(state, product) {
            state.productInOrder = product
        }
    },

    actions: {
        getOrder({ commit }) {
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
            Api.get('/order')
                .then(response => {
                    Swal.close()
                    commit('GET_ORDER', response.data.data)
                })
        },
        detailOrder({ commit }, snap_token) {
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
            Api.get(`order/${snap_token}`)
                .then(response => {
                    Swal.close()
                    commit('DETAIL_ORDER', response.data.data)
                    commit('PRODUCT_IN_ORDER', response.data.product)
                })
        }
    },

    getters: {
        getOrder(state) {
            return state.orders
        },
        detailOrder(state) {
            return state.detailOrder
        },
        productInOrder(state) {
            return state.productInOrder
        }
    }
}

export default order