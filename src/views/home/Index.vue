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
                    <h4 class="fw-bold">
                        <i class="fa fa-shopping-bag"></i> Produk Terbaru
                    </h4>
                    <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem" />
                </div>
            </div>
            <div class="row gy-2" v-if="isLoading">
                <div v-for="(number, index) in products" :key="index" class="col-12 col-md-3 mb-3">
                    <div class="card border-0 shadow rounded-md">
                        <content-loader
                            viewBox="0 0 450 570"
                            :speed="2"
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="5" ry="5" width="450" height="290" />
                            <rect x="125" y="316" rx="5" ry="5" width="200" height="35" />
                            <rect x="70" y="375" rx="5" ry="5" width="150" height="25" />
                            <rect x="235" y="375" rx="5" ry="5" width="150" height="25" />
                            <rect x="125" y="425" rx="5" ry="5" width="200" height="40" />
                            <rect x="15" y="500" rx="5" ry="5" width="420" height="50" />
                        </content-loader>
                    </div>
                </div>
            </div>
            <div class="row gy-2" v-else>
                <div
                    v-for="product in products"
                    :key="product.id"
                    class="col-md-4 col-lg-3 col-12 mb-3"
                >
                    <div class="card border-0 shadow rounded-md">
                        <div class="card-img">
                            <img
                                v-lazy="{ src: product.image }"
                                class="w-100"
                                style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;"
                            />
                        </div>
                        <div class="card-body text-center">
                            <p class="card-title" style="font-weight: bold;">{{ product.title }}</p>
                            <div
                                class="discount mt-2 text-danger d-flex align-items-center justify-content-center"
                                v-if="product.discount > 0"
                            >
                                <s>Rp. {{ moneyFormat(product.price) }}</s>
                                <span
                                    style="background-color: darkorange"
                                    class="badge badge-pill badge-success text-white ms-2"
                                >
                                    Diskon
                                    {{ product.discount }} %
                                </span>
                            </div>
                            <div
                                class="price fw-bold mt-3"
                                style="color: #47b04b;font-size:20px"
                            >Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                            <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem" />
                            <router-link
                                :to="{ name: 'detail_product', params: { slug: product.slug } }"
                                class="btn btn-primary btn-md w-100 shadow-md"
                            >Lihat Produk</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Category from '../../components/Category'
import Slider from '../../components/Slider'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ContentLoader } from "vue-content-loader"

export default {
    components: {
        Category,
        Slider,
        ContentLoader
    },

    setup() {
        const store = useStore()

        onMounted(() => {
            store.dispatch('product/getProducts')
        })

        const products = computed(() => {
            return store.state.product.products
        })

        const isLoading = computed(() => {
            return store.state.product.isLoading
        })

        return {
            products,
            isLoading
        }
    }
}
</script>