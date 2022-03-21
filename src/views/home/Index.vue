<template>
    <div>
        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col-md-3 mb-4">
                    <Category />
                </div>
                <div class="col-md-9 mb-4">
                    <Slider />
                </div>
            </div>
        </div>
        <div class="container-fluid mb-5 mt-4">
            <div class="row">
                <div class="col-md-12">
                    <h4 class="fw-bold"><i class="fa fa-shopping-bag"></i> Produk Terbaru</h4>
                    <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem">
                </div>
            </div>
            <div class="row gy-2">
                <div v-for="product in products" :key="product.id" class="col-md-4 col-lg-3 col-12 mb-3">
                    <div class="card border-0 shadow rounded-md">
                        <div class="card-img">
                            <img v-lazy="{ src: product.image }"
                                class="w-100"
                                style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                        </div>
                        <div class="card-body text-center">
                            <p class="card-title" style="font-weight: bold;">
                                {{ product.title }}
                            </p>                        
                            <div class="discount mt-2 text-danger d-flex align-items-center justify-content-center" v-if="product.discount >= 1">
                                <s>Rp. {{ moneyFormat(product.price) }}</s> 
                                <span style="background-color: darkorange" class="badge badge-pill badge-success text-white ms-2">Diskon
                                    {{ product.discount }} %</span>
                            </div>                    
                            <div class="price fw-bold mt-3" style="color: #47b04b;font-size:20px">
                                Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                            <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem">
                            <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="btn btn-primary btn-md w-100 shadow-md">Lihat Produk</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Category from '@/components/Category'
import Slider from '@/components/Slider'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

    export default {
        components: {
            Category,
            Slider
        },

        setup() {            
            const store = useStore()

            onMounted(() => {
                store.dispatch('product/getProducts')
            })

            const products = computed(() => {
                return store.state.product.products
            })

            return {            
                products
            }
        }
}
</script>