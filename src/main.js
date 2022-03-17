import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import store from './store'

const app = createApp(App)

app.use(router)

app.use(store)

app.mixin({
    methods: {
        moneyFormat(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        calculateDiscount(product) {
            return product.price - (product.price * (product.discount) / 100)
        }
    }
})

app.mount('#app')