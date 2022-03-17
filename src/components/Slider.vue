<template>
    <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(slider, id) in sliders" :class="{ active: id==0 }" :key='slider.id'>
                <img :src="slider.image" class="d-block w-100 rounded-lg">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

    export default {
        setup() {            
            const store = useStore()
            
            onMounted(() => {
                store.dispatch('slider/getSliders')
            })
             
            const sliders = computed(() => {
                return store.state.slider.sliders
            })

            return {                
                sliders
            }
        }
    }
</script>