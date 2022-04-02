<template>
    <div class="container-fluid mb-5 mt-4" v-if="products.length >= 1">
        <div class="row gy-2">
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
    <div class="container mb-5 mt-4" v-else>
        <div class="row gy-2">
            <div class="col-12">
                <div class="card border-0 rounded-3 shadow">
                    <div class="p-4 text-center">
                        <img src="../../assets/empty-products.svg" style="width: 250px" />
                        <p class="fs-4 mt-3 fw-bold">Produk tidak ditemukan di dalam kategori ini.</p>
                        <router-link
                            :to="{ name: 'home' }"
                            class="btn btn-primary btn-lg shadow-md"
                        >
                            <i class="fa fa-long-arrow-alt-left"></i> Beranda
                        </router-link>
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