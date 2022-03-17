<template>
  <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body p-2">
                        <img :src="product.image" class="w-100 border-0">
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="fw-bold" style="font-size: 20px;"> {{ product.title }} </label>
                        <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem">
                        <div class="discount mt-2 text-danger"><s>Rp. {{ moneyFormat(product.price) }}</s> <span
                                style="background-color: darkorange" class="badge badge-pill badge-success text-white">Diskon
                                {{ product.discount }} %</span>
                        </div>
                        <div class="price fw-bold mt-3" style="color: #47b04b;font-size:18px">
                            Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>
                        <p class="content mt-3">
                            {{ product.content }}
                        </p>
                        <div class="weight my-4">
                            <label class="fw-bold me-5">Berat</label>
                            <label><span class="fw-bold">{{ product.weight }}</span> gram</label>
                        </div>                        
                        <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem">
                        <button class="btn btn-primary btn-lg w-100"><i class="fa fa-shopping-cart"></i> Tambah Ke Keranjang</button>
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

    export default {
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

            return {
                route,
                router,
                store,
                product,
            }
        }
    }
</script>