<template>
    <header class="section-header top-0">
        <section class="header-main">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3 col-7">
                        <router-link
                            :to="{ name: 'home' }"
                            class="text-decoration-none"
                            data-abc="true"
                        >
                            <span class="logo" style="font-size: 22px;">
                                <i class="fa fa-apple-alt"></i> Apple Store
                            </span>
                        </router-link>
                    </div>
                    <div class="col-md-5 d-none d-md-block">
                        <form class="search-wrap">
                            <div class="input-group w-100">
                                <input
                                    type="text"
                                    class="form-control search-form"
                                    style="width:55%;border: 1px solid #ffffff"
                                    v-model="searchTerm"
                                    placeholder="Mau beli apa hari ini ?"
                                />
                                <div class="input-group-append">
                                    <button class="btn search-button" type="submit">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div v-if="searchProducts.length > 0" class="autocomplete-products">
                            <router-link
                                v-for="product in searchProducts"
                                :key="product.id"
                                @click="selectProduct()"
                                :to="{ name: 'detail_product', params: { slug: product.slug } }"
                                class="autocomplete-product"
                            >
                                <i class="fa fa-search me-1"></i>
                                {{ product.title }}
                            </router-link>
                        </div>
                    </div>
                    <div class="col-md-4 col-5">
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <router-link
                                    :to="{ name: 'cart' }"
                                    class="btn search-button btn-md"
                                    style="color: #ffffff;background-color: #6677ef;border-color: #ffffff;"
                                >
                                    <i class="fa fa-shopping-cart"></i>
                                    <span
                                        v-if="cartCount >= 1"
                                    >{{ cartCount }} | Rp. {{ moneyFormat(cartTotal) }}</span>
                                </router-link>
                            </div>
                            <div class="account">
                                <router-link
                                    :to="{ name: 'login' }"
                                    v-if="!isLoggedIn"
                                    class="btn search-button btn-md d-none d-md-block ms-3"
                                >
                                    <i class="fa fa-user-circle"></i> Account
                                </router-link>
                                <router-link
                                    :to="{ name: 'dashboard' }"
                                    v-else
                                    class="btn search-button btn-md d-none d-md-block ms-3"
                                >
                                    <i class="fa fa-tachometer-alt"></i> Dashboard
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()

        const searchTerm = ref('')

        const isLoggedIn = computed(() => {
            return store.getters['auth/isLoggedIn']
        })

        const cartCount = computed(() => {
            return store.getters['cart/cartCount']
        })

        const cartTotal = computed(() => {
            return store.getters['cart/cartTotal']
        })

        const products = computed(() => {
            return store.state.product.products
        })

        const searchProducts = computed(() => {
            if (searchTerm.value === '') {
                return []
            }
            let matches = 0
            return products.value.filter(product => {
                if (product.title.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
                    matches++
                    return product
                }
            })
        });

        const selectProduct = () => {
            searchTerm.value = ''
        }

        onMounted(() => {
            const token = store.state.auth.token

            if (!token) {
                return
            }

            store.dispatch('cart/cartCount')

            store.dispatch('cart/cartTotal')
        })

        return {
            store,
            searchTerm,
            isLoggedIn,
            cartCount,
            cartTotal,
            products,
            searchProducts,
            selectProduct
        }
    }
}
</script>

<style scoped>
.autocomplete-products {
    width: 40%;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 5px;
    position: absolute;
    z-index: 10;
    border-radius: 5px;
}

.autocomplete-product {
    display: block;
    text-decoration: none;
    color: #000000b3;
    padding: 10px 8px;
    cursor: pointer;
    border-radius: 5px;
}

.autocomplete-product:hover {
    background-color: #f3f4f5;
}
</style>