<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu />
            </div>
            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="fw-bold"><i class="fas fa-file"></i> Detail Invoice</h5>                    
                        <hr>
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                <td style="width: 25%">
                                    No. Invoice
                                </td>
                                <td style="width: 1%">:</td>
                                <td>
                                    {{ detailOrder.invoice }}
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        Nama Lengkap
                                    </td>
                                    <td>:</td>
                                    <td>
                                        {{ detailOrder.name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        No. Telp / WA
                                    </td>
                                    <td>:</td>
                                    <td>
                                        {{ detailOrder.phone }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Kurir / Service / Cost
                                    </td>
                                    <td>:</td>
                                    <td>
                                        {{ detailOrder.courier?.toUpperCase() || '' }} / {{ detailOrder.service }} / Rp.
                                        {{ moneyFormat(detailOrder.cost_courier) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Alamat Lengkap
                                    </td>
                                    <td>:</td>
                                    <td>
                                        {{ detailOrder.address }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Total Pembelian
                                    </td>
                                    <td>:</td>
                                    <td>
                                        Rp. {{ moneyFormat(detailOrder.grand_total) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Status
                                    </td>
                                    <td>:</td>
                                    <td>
                                        <button @click="payment(detailOrder.snap_token)"
                                            v-if="detailOrder.status == 'pending'" class="btn btn-primary">Bayar Sekarang</button>
                                        <button v-else-if="detailOrder.status == 'success'"
                                            class="btn btn-success">{{ detailOrder.status.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}</button>
                                        <button v-else-if="detailOrder.status == 'expired'"
                                            class="btn btn-warning">{{ detailOrder.status.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}</button>
                                        <button v-else-if="detailOrder.status == 'failed'"
                                            class="btn btn-danger">{{ detailOrder.status.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) }}</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>                        
                    </div>
                </div>
                <div class="card border-0 rounded shadow mt-4">
                    <div class="card-body">
                        <h5><i class="fa fa-shopping-cart"></i> Detail Order</h5>
                        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem">                        
                        <table class="table">
                            <tbody>
                                <tr v-for="product in productInOrder" :key="product.id">
                                    <td class="b-none" width="25%">
                                        <div class="wrapper-image-cart">
                                            <img :src="product.image" style="width: 100%;border-radius: .5rem">
                                        </div>
                                    </td>
                                    <td class="b-none" width="50%">
                                        <h5><b>{{ product.product_name }}</b></h5>
                                        <table class="table-borderless" style="font-size: 14px">
                                            <tr>
                                                <td style="padding: .20rem">Qty</td>
                                                <td style="padding: .20rem">:</td>
                                                <td style="padding: .20rem"><b>{{ product.qty }}</b></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td class="b-none text-right">
                                        <p class="m-0 fw-bold">Rp. {{ moneyFormat(product.price) }}</p>                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomerMenu from '../../components/CustomerMenu'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

    export default {
        components: {            
            CustomerMenu
        },

        setup() {            
            const store = useStore()
            
            const route  = useRoute()
            const router = useRouter()
            
            onMounted(() => {                
                store.dispatch('order/detailOrder', route.params.snap_token)
            })
            
            const detailOrder = computed(() => {                
                return store.getters['order/detailOrder']            
            })
            
            const productInOrder = computed(() => {                
                return store.getters['order/productInOrder']
            })
            
            const payment = (snap_token) => {
                window.snap.pay(snap_token, {
                    onSuccess: function () {
                        router.push({name: 'detail_order', params:{snap_token: snap_token}})  
                    },
                    onPending: function () {
                        router.push({name: 'detail_order', params:{snap_token: snap_token}})
                    },
                    onError: function () {
                        router.push({name: 'detail_order', params:{snap_token: snap_token}})  
                    }
                })
            }

            return {
                store,
                route,
                router,
                detailOrder,
                productInOrder,
                payment
            }
        }
    }
</script>