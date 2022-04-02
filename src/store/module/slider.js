import Api from "../../api/Api";

const slider = {
    namespaced: true,

    state: {
        sliders: [],
        isLoading: false
    },

    mutations: {
        GET_SLIDERS(state, sliders) {
            state.sliders = sliders;
        },
        IS_LOADING(state, isLoading) {
            state.isLoading = isLoading
        }
    },

    actions: {
        getSliders({ commit }) {
            commit('IS_LOADING', true)
            Api.get('/sliders')
                .then(response => {
                    commit('IS_LOADING', false)
                    commit('GET_SLIDERS', response.data.sliders);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },

    getters: {

    }
}

export default slider