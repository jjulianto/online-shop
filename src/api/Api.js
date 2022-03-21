import axios from 'axios'

const Api = axios.create({
    baseURL: 'http://store.appdev.my.id/api'
})

export default Api