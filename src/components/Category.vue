<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="fw-bold">
                <i class="fa fa-shopping-bag"></i> Kategori
            </h5>
            <hr />
            <ul class="list-group" v-if="isLoading">
                <content-loader
                    viewBox="0 0 200 30"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                    class="list-group-item shadow-sm"
                >
                    <circle cx="15" cy="15" r="15" />
                    <rect x="40" y="8" rx="5" ry="5" width="155" height="15" />
                </content-loader>
                <content-loader
                    viewBox="0 0 200 30"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                    class="list-group-item shadow-sm"
                >
                    <circle cx="15" cy="15" r="15" />
                    <rect x="40" y="8" rx="5" ry="5" width="155" height="15" />
                </content-loader>
                <content-loader
                    viewBox="0 0 200 30"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                    class="list-group-item shadow-sm"
                >
                    <circle cx="15" cy="15" r="15" />
                    <rect x="40" y="8" rx="5" ry="5" width="155" height="15" />
                </content-loader>
                <content-loader
                    viewBox="0 0 200 30"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                    class="list-group-item shadow-sm"
                >
                    <circle cx="15" cy="15" r="15" />
                    <rect x="40" y="8" rx="5" ry="5" width="155" height="15" />
                </content-loader>
                <content-loader
                    viewBox="0 0 200 30"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                    class="list-group-item shadow-sm"
                >
                    <circle cx="15" cy="15" r="15" />
                    <rect x="40" y="8" rx="5" ry="5" width="155" height="15" />
                </content-loader>
            </ul>
            <ul class="list-group" v-else>
                <router-link
                    :to="{ name: 'detail_category', params: { slug: category.slug } }"
                    v-for="category in categories"
                    :key="category.id"
                    class="list-group-item shadow-sm fw-bold text-decoration-none text-dark"
                >
                    <img v-lazy="{ src: category.image }" style="width:35px" />
                    {{ category.name }}
                </router-link>
                <router-link
                    :to="{ name: 'categories' }"
                    class="list-group-item text-center active shadow-sm fw-bold text-decoration-none"
                >
                    Lihat Kategori Lainnya
                    <i class="fa fa-long-arrow-alt-right"></i>
                </router-link>
            </ul>
        </div>
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
            store.dispatch('category/getCategories')
        })

        const categories = computed(() => {
            return store.state.category.categories
        })

        const isLoading = computed(() => {
            return store.state.category.isLoading
        })

        return {
            categories,
            isLoading
        }
    }
}
</script>