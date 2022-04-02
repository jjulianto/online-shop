import Api from "../../api/Api"

const product = {
    namespaced: true,

    state: {
        products: [],
        product: {},
        isLoading: false
    },

    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products
        },
        DETAIL_PRODUCT(state, product) {
            state.product = product
        },
        IS_LOADING(state, isLoading) {
            state.isLoading = isLoading
        }
    },

    actions: {
        getProducts({ commit }) {
            commit('IS_LOADING', true)
            Api.get('/products')
                .then(response => {
                    commit('IS_LOADING', false)
                    commit('GET_PRODUCTS', response.data.products)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getDetailProduct({ commit }, slug) {
            commit('IS_LOADING', true)
            Api.get(`/product/${slug}`)
                .then(response => {
                    commit('IS_LOADING', false)
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