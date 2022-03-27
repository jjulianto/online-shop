import Api from "../../api/Api"
import Swal from "sweetalert2"

const product = {
    namespaced: true,

    state: {
        products: [],
        product: {}
    },

    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products
        },
        DETAIL_PRODUCT(state, product) {
            state.product = product
        }
    },

    actions: {
        getProducts({ commit }) {
            Api.get('/products')
                .then(response => {
                    commit('GET_PRODUCTS', response.data.products)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getDetailProduct({ commit }, slug) {
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
            Api.get(`/product/${slug}`)
                .then(response => {
                    Swal.close()
                    commit('DETAIL_PRODUCT', response.data.product)
                }).catch(error => {
                    console.log(error)
                })
        }
    },

    getters: {

    }
}

export default product