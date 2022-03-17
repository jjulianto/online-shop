import api from "@/api/api";

const category = {
    namespaced: true,

    state: {
        categories: [],
        productInCategory: [],
    },

    mutations: {
        GET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        PRODUCT_IN_CATEGORY(state, products) {
            state.productInCategory = products
        }
    },

    actions: {
        getCategories({ commit }) {
            api.get('/categories')
                .then(response => {
                    commit('GET_CATEGORIES', response.data.categories);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getProductInCategory({ commit }, slug) {
            api.get(`/category/${slug}`)
                .then(response => {
                    commit('PRODUCT_IN_CATEGORY', response.data.product)
                }).catch(error => {
                    console.log(error)
                })
        }
    },

    getters: {

    }
}

export default category