<template>
    <div v-if="isLoading">
        <content-loader
            viewBox="0 0 500 250"
            :speed="2"
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect x="0" y="0" rx="5" ry="5" width="500" height="250" />
        </content-loader>
    </div>
    <div
        id="carouselExampleControls"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
        v-else
    >
        <div class="carousel-inner">
            <div
                class="carousel-item"
                v-for="(slider, id) in sliders"
                :class="{ active: id == 0 }"
                :key="slider.id"
            >
                <img :src="slider.image" class="d-block w-100 rounded" />
            </div>
        </div>
        <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ContentLoader } from "vue-content-loader"

export default {
    components: {
        ContentLoader
    },
    setup() {
        const store = useStore()

        onMounted(() => {
            store.dispatch('slider/getSliders')
        })

        const sliders = computed(() => {
            return store.state.slider.sliders
        })

        const isLoading = computed(() => {
            return store.state.slider.isLoading
        })

        return {
            sliders,
            isLoading
        }
    }
}
</script>