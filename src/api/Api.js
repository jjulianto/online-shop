import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://store.appdev.my.id/api'
})

export default Api