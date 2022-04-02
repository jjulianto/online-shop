<template>
    <div class="container mt-5 mb-5">
        <div class="row" v-if="isLoading">
            <div class="col-12 d-none d-md-block">
                <div class="card border-0 rounded shadow">
                    <content-loader
                        viewBox="0 0 420 135"
                        :speed="2"
                        primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb"
                    >
                        <rect x="5" y="7" rx="3" ry="3" width="130" height="120" />
                        <rect x="146" y="7" rx="3" ry="3" width="85" height="13" />
                        <rect x="146" y="34" rx="3" ry="3" width="50" height="7" />
                        <rect x="200" y="34" rx="3" ry="3" width="30" height="7" />
                        <rect x="146" y="52" rx="3" ry="3" width="63" height="7" />
                        <rect x="146" y="69" rx="3" ry="3" width="155" height="7" />
                        <rect x="146" y="88" rx="3" ry="3" width="40" height="7" />
                        <rect x="190" y="88" rx="3" ry="3" width="40" height="7" />
                        <rect x="146" y="109" rx="3" ry="3" width="267" height="18" />
                    </content-loader>
                </div>
            </div>
            <div class="col-12 d-block d-sm-block d-md-none">
                <div class="card border-0 rounded shadow">
                    <content-loader
                        viewBox="0 0 450 700"
                        :speed="2"
                        primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb"
                    >
                        <rect x="15" y="15" rx="5" ry="5" width="420" height="290" />
                        <rect x="15" y="336" rx="5" ry="5" width="350" height="42" />
                        <rect x="15" y="395" rx="5" ry="5" width="150" height="25" />
                        <rect x="180" y="395" rx="5" ry="5" width="100" height="25" />
                        <rect x="15" y="445" rx="5" ry="5" width="200" height="30" />
                        <rect x="15" y="505" rx="5" ry="5" width="400" height="25" />
                        <rect x="15" y="560" rx="5" ry="5" width="110" height="25" />
                        <rect x="140" y="560" rx="5" ry="5" width="110" height="25" />
                        <rect x="15" y="620" rx="5" ry="5" width="420" height="50" />
                    </content-loader>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-md-4">
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body p-2">
                        <img :src="product.image" class="w-100 border-0 rounded" />
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="fw-bold" style="font-size: 20px;">{{ product.title }}</label>
                        <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem" />
                        <div
                            class="discount mt-2 text-danger d-flex align-items-center"
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
                            style="color: #47b04b;font-size:18px"
                        >Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                        <p class="content mt-3" v-html="product.content"></p>
                        <div class="weight">
                            <label class="fw-bold me-5">Berat</label>
                            <label>
                                <span class="fw-bold">{{ product.weight }}</span> gram
                            </label>
                        </div>
                        <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem" />
                        <button
                            @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)"
                            class="btn btn-primary btn-lg w-100"
                        >
                            <i class="fa fa-shopping-cart"></i> Tambah Ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ContentLoader } from "vue-content-loader"

export default {
    components: { ContentLoader },
    setup() {
        const route = useRoute()

        const router = useRouter()

        const store = useStore()

        onMounted(() => {
            store.dispatch('product/getDetailProduct', route.params.slug)
        })

        const product = computed(() => {
            return store.state.product.product
        })

        const isLoading = computed(() => {
            return store.state.product.isLoading
        })

        const addToCart = (product_id, price, weight) => {
            const token = store.state.auth.token

            if (!token) {
                return router.push({ name: 'login' })
            }

            store.dispatch('cart/addToCart', {
                product_id: product_id,
                price: price,
                weight: weight,
                quantity: 1
            })
        }

        return {
            route,
            router,
            store,
            product,
            isLoading,
            addToCart,
        }
    }
}
</script>