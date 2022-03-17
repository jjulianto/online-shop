<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div v-for="product in products" :key="product.id" class="col-md-3 col-12 mb-3">
                <div class="card h-100 border-0 shadow rounded-md">
                    <div class="card-img">
                        <img :src="product.image"
                            class="w-100"
                            style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                    </div>
                    <div class="card-body text-center">
                        <p class="card-title" style="font-weight: bold;">
                            {{ product.title }}
                        </p>
                        <div class="discount mt-2 text-danger"><s>Rp. {{ moneyFormat(product.price) }}</s> <span
                                style="background-color: darkorange" class="badge badge-pill badge-success text-white">Diskon
                                {{ product.discount }} %</span>
                        </div>                    
                        <div class="price font-weight-bold mt-3" style="color: #47b04b;font-size:20px">
                            Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                        <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem">
                        <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="btn btn-primary btn-md w-100 shadow-md">Lihat Produk</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

    export default {
        setup() {            
            const store = useStore()
            
            const route = useRoute()
            
            onMounted(() => {
                store.dispatch('category/getProductInCategory', route.params.slug)
            })
            
            const products = computed(() => {
                return store.state.category.productInCategory
            })

            return {
                store,
                route,
                products
            }
        }
    }
</script>