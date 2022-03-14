import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

//define mixins for global function
app.mixin({
    methods: {
        //money thousands
        moneyFormat(number) {
            let reverse = number.toString().split('').reverse().join(''),
                thousands = reverse.match(/\d{1,3}/g)
            thousands = thousands.join('.').split('').reverse().join('')
            return thousands
        },

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price * (product.discount) / 100)
        }
    }
})

app.mount('#app')