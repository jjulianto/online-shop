<template>
  <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5><i class="fa fa-shopping-cart"></i> Detail Pesanan</h5>
                        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem">
                        <div v-if="cartCount >= 1">
                            <table class="table">
                                <tbody>
                                    <tr v-for="cart in carts" :key="cart.id">
                                        <td class="b-none" width="25%">
                                            <div class="wrapper-image-cart">
                                                <img :src="cart.product.image" style="width: 100%;border-radius: .5rem">
                                            </div>
                                        </td>
                                        <td class="b-none" width="50%">
                                            <h5><b>{{ cart.product.title }}</b></h5>
                                            <table class="table-borderless" style="font-size: 14px">
                                                <tr>
                                                    <td style="padding: .20rem">Qty</td>
                                                    <td style="padding: .20rem">:</td>
                                                    <td style="padding: .20rem"><b>{{ cart.quantity }}</b></td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td class="b-none text-right">
                                            <p class="m-0 font-weight-bold">Rp. {{ moneyFormat(cart.price) }}
                                            </p>
                                            <p class="m-0">
                                                <s style="text-decoration-color:red">Rp.
                                                    {{ moneyFormat(cart.product.price * cart.quantity) }}</s>
                                            </p>
                                            <br>
                                            <div class="text-right">
                                                <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-danger">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-default">
                                <tbody>
                                    <tr>
                                        <td class="set-td text-left" width="60%">
                                            <p class="m-0">Jumlah </p>
                                        </td>
                                        <td class="set-td  text-right" width="30%">&nbsp; : Rp.</td>
                                        <td class="text-right set-td ">
                                            <p class="m-0" id="subtotal"> {{ moneyFormat(cartTotal) }}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="set-td text-left border-0">
                                            <p class="m-0">Ongkos Kirim (<strong>{{ cartWeight }}</strong> gram)</p>
                                        </td>
                                        <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                                        <td class="set-td border-0 text-right">
                                            <p class="m-0" id="ongkir-cart"> 0</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class=" text-left border-0">
                                            <p class="font-weight-bold m-0 h5">Grand Total </p>
                                        </td>
                                        <td class=" border-0 text-right">&nbsp; : Rp.</td>
                                        <td class=" border-0 text-right">
                                            <p class="font-weight-bold m-0 h5" align="right">
                                                0 </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else class="mt-3 text-center">
                            <p class="fs-5 fw-bold">Sepertinya kamu belum memiliki produk di keranjang</p>
                            <router-link :to="{name: 'home'}" class="btn btn-primary btn-lg shadow-md"><i class="fa fa-long-arrow-alt-left"></i> Beranda</router-link>                        
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">            
                    <div class="card-body">
                        <h5><i class="fa fa-user-circle"></i> Rincian Pengiriman</h5>
                        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem">        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

    export default {
        setup() {            
            const store = useStore()
            
            onMounted(() => {                
                store.dispatch('cart/cartCount')
                store.dispatch('cart/cartTotal')
                store.dispatch('cart/cartWeight')
            
            })
            
            const carts = computed(() => {
                return store.getters['cart/getCart']
            })

            const cartCount = computed(() => {
                return store.getters['cart/cartCount']
            })
            
            const cartTotal = computed(() => {
                return store.state.cart.cartTotal
            })
            
            const cartWeight = computed(() => {
                return store.state.cart.cartWeight
            })

            const removeCart = (cart_id) => {            
                store.dispatch('cart/removeCart', cart_id)
            }

            return {
                carts,
                cartCount,
                cartTotal,
                cartWeight,
                removeCart,
            }
        }
    }
</script>