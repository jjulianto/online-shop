import Api from "../../api/Api";
import Swal from "sweetalert2";

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
            Api.get('/categories')
                .then(response => {
                    commit('GET_CATEGORIES', response.data.categories);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getProductInCategory({ commit }, slug) {
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
            Api.get(`/category/${slug}`)
                .then(response => {
                    Swal.close()
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