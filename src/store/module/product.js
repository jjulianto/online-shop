import api from "@/api/api"

const product = {
    namespaced: true,

    state: {
        products: [],
    },

    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products
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
        }
    },

    getters: {

    }
}

export default product