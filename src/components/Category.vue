<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> Kategori</h5>
            <hr>
            <ul class="list-group">            
                <a href="#" v-for="category in categories" :key="category.id" class="list-group-item shadow-sm font-weight-bold text-decoration-none text-dark">
                    <img :src="category.image" style="width:35px"> {{ category.name }}
                </a>            
                <a href="#" class="list-group-item text-center active shadow-sm font-weight-bold text-decoration-none">Lihat Kategori Lainnya <i class="fa fa-long-arrow-alt-right"></i></a>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

    export default {
        setup() {
            const store = useStore()
            
            onMounted(() => {
                store.dispatch('category/getCategories')
            })

            const categories = computed(() => {
                return store.state.category.categories
            })

            return {
                categories
            }
        }
    }
</script>