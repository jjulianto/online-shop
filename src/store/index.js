import { createStore } from 'vuex'

import auth from './module/auth'
import order from './module/order'

export default createStore({
    modules: {
        auth,
        order,
    }
})