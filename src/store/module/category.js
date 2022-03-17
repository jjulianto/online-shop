import api from "@/api/api";

const category = {
    namespaced: true,

    state: {
        categories: [],
    },

    mutations: {
        GET_CATEGORIES(state, categories) {
            state.categories = categories;
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
        }
    },

    getters: {

    }
}

export default category