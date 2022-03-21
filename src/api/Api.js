import axios from 'axios'

const api = axios.create({
    baseURL: 'http://store.appdev.my.id/api'
})

export default api