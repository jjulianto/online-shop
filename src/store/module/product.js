import api from "../../api/api"

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
            api.get('/products')
                .then(response => {
                    commit('GET_PRODUCTS', response.data.products)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getDetailProduct({ commit }, slug) {
            api.get(`/product/${slug}`)
                .then(response => {
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