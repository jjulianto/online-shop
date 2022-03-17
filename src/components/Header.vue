<template>
    <header class="section-header top-0">
        <section class="header-main">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3 col-7">
                        <router-link :to="{name: 'home'}" class="text-decoration-none" data-abc="true">
                            <span class="logo" style="font-size: 22px;"><i class="fa fa-apple-alt"></i> Apple Store </span></router-link>
                    </div>
                    <div class="col-md-5 d-none d-md-block">
                        <form class="search-wrap">
                            <div class="input-group w-100"><input type="text" class="form-control search-form"
                                    style="width:55%;border: 1px solid #ffffff" name="q"
                                    placeholder="Mau beli apa hari ini ?">
                                <div class="input-group-append">
                                    <button class="btn search-button" type="submit"><i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-4 col-5">
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <router-link :to="{name: 'cart'}" class="btn search-button btn-md" style="color: #ffffff;background-color: #6677ef;border-color: #ffffff;"><i class="fa fa-shopping-cart"></i> {{ cartCount }} | Rp. {{ moneyFormat(cartTotal) }} </router-link>
                            </div>
                            <div class="account">                                
                                <router-link :to="{name: 'login'}" v-if="!isLoggedIn" class="btn search-button btn-md d-none d-md-block ms-4"><i class="fa fa-user-circle"></i> Account</router-link>
                                <router-link :to="{name: 'dashboard'}" v-else class="btn search-button btn-md d-none d-md-block ms-4"><i class="fa fa-tachometer-alt"></i> Dashboard</router-link> 
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