<template>
    <header class="section-header top-0">
        <section class="header-main">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-6 col-7">
                        <router-link :to="{name: 'home'}" class="text-decoration-none" data-abc="true">
                            <span class="logo" style="font-size: 22px;"><i class="fa fa-apple-alt"></i> Apple Store </span></router-link>
                    </div>                    
                    <div class="col-md-6 col-5">
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <router-link :to="{name: 'cart'}" class="btn search-button btn-md" style="color: #ffffff;background-color: #6677ef;border-color: #ffffff;"><i class="fa fa-shopping-cart"></i> <span v-if="cartCount >= 1">{{ cartCount }} | Rp. {{ moneyFormat(cartTotal) }}</span> </router-link>
                            </div>
                            <div class="account">                                
                                <router-link :to="{name: 'login'}" v-if="!isLoggedIn" class="btn search-button btn-md d-none d-md-block ms-3"><i class="fa fa-user-circle"></i> Account</router-link>
                                <router-link :to="{name: 'dashboard'}" v-else class="btn search-button btn-md d-none d-md-block ms-3"><i class="fa fa-tachometer-alt"></i> Dashboard</router-link> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

    export default {
        setup() {            
            const store = useStore()
            
            const isLoggedIn = computed(() => {                
                return store.getters['auth/isLoggedIn']
            })

            const cartCount = computed(() => {                
                return store.getters['cart/cartCount']
            })
            
            const cartTotal = computed(() => {                
                return store.getters['cart/cartTotal']
            })

            onMounted(() => {
                const token = store.state.auth.token

                if(!token) {
                    return
                }
                
                store.dispatch('cart/cartCount')
                
                store.dispatch('cart/cartTotal')
            })

            return {
                store,
                isLoggedIn,
                cartCount,
                cartTotal
            }
        }
    }
</script>