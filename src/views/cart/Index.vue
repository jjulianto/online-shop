<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5>
                            <i class="fa fa-shopping-cart"></i> Detail Pesanan
                        </h5>
                        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem" />
                        <div v-if="cartCount >= 1">
                            <table class="table">
                                <tbody>
                                    <tr v-for="cart in carts" :key="cart.id">
                                        <td class="b-none" width="25%">
                                            <div class="wrapper-image-cart">
                                                <img
                                                    :src="cart.product.image"
                                                    style="width: 100%;border-radius: .5rem"
                                                />
                                            </div>
                                        </td>
                                        <td class="b-none" width="50%">
                                            <h5>
                                                <b>{{ cart.product.title }}</b>
                                            </h5>
                                            <table class="table-borderless" style="font-size: 14px">
                                                <tr>
                                                    <td style="padding: .20rem">Qty</td>
                                                    <td style="padding: .20rem">:</td>
                                                    <td style="padding: .20rem">
                                                        <b>{{ cart.quantity }}</b>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td class="b-none text-right">
                                            <p class="m-0 fw-bold">Rp. {{ moneyFormat(cart.price) }}</p>
                                            <p class="m-0">
                                                <s style="text-decoration-color:red">
                                                    Rp.
                                                    {{ moneyFormat(cart.product.price * cart.quantity) }}
                                                </s>
                                            </p>
                                            <br />
                                            <div class="text-right">
                                                <button
                                                    @click.prevent="removeCart(cart.id)"
                                                    class="btn btn-sm btn-danger"
                                                >
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
                                            <p class="m-0">Jumlah</p>
                                        </td>
                                        <td class="set-td text-right" width="30%">&nbsp; : Rp.</td>
                                        <td class="text-right set-td">
                                            <p
                                                class="m-0"
                                                id="subtotal"
                                            >{{ moneyFormat(cartTotal) }}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="set-td text-left border-0">
                                            <p class="m-0">
                                                Ongkos Kirim (
                                                <strong>{{ cartWeight }}</strong> gram)
                                            </p>
                                        </td>
                                        <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                                        <td class="set-td border-0 text-right">
                                            <p
                                                class="m-0"
                                                id="ongkir-cart"
                                            >{{ moneyFormat(state.courier_cost) }}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left border-0">
                                            <p class="fw-bold m-0 h5">Grand Total</p>
                                        </td>
                                        <td class="border-0 text-right">&nbsp; : Rp.</td>
                                        <td class="border-0 text-right">
                                            <p
                                                class="fw-bold m-0 h5"
                                                align="right"
                                            >{{ moneyFormat(state.grandTotal) }}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else class="mt-3 text-center">
                            <img src="../../assets/empty-products.svg" style="width: 250px" />
                            <p
                                class="fs-5 mt-3 fw-bold"
                            >Sepertinya kamu belum memiliki produk di keranjang.</p>
                            <router-link
                                :to="{ name: 'home' }"
                                class="btn btn-primary btn-md shadow-md"
                            >
                                <i class="fa fa-long-arrow-alt-left"></i> Beranda
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mt-3 mt-md-0">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5>
                            <i class="fa fa-user-circle"></i> Rincian Pengiriman
                        </h5>
                        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem" />
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="fw-bold mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="nama_lengkap"
                                        placeholder="Nama Lengkap"
                                        v-model="state.name"
                                    />
                                    <div
                                        v-if="validation.name"
                                        class="mt-2 alert alert-danger"
                                    >Masukkan Nama Lengkap</div>
                                </div>
                            </div>
                            <div class="col-md-6 mt-3 mt-md-0">
                                <div class="form-group">
                                    <label class="fw-bold mb-1">No. Hp / Whatsapp</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="phone"
                                        placeholder="No. HP / WhatsApp"
                                        v-model="state.phone"
                                    />
                                    <div
                                        v-if="validation.phone"
                                        class="mt-2 alert alert-danger"
                                    >Masukkan No. Telp</div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <label class="fw-bold mb-1">Provinsi</label>
                                    <select
                                        class="form-control"
                                        v-model="state.province_id"
                                        @change="getCities"
                                    >
                                        <option value>-- Pilih Provinsi --</option>
                                        <option
                                            v-for="province in state.provinces"
                                            :key="province.id"
                                            :value="province.province_id"
                                        >{{ province.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <label class="fw-bold mb-1">Kota / Kabupaten</label>
                                    <select
                                        class="form-control"
                                        v-model="state.city_id"
                                        @change="getCourier"
                                    >
                                        <option value>-- Pilih Kota --</option>
                                        <option
                                            v-for="city in state.cities"
                                            :key="city.id"
                                            :value="city.city_id"
                                        >{{ city.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group" v-if="state.courier">
                                    <label class="fw-bold mb-1">Kurir Pengiriman</label>
                                    <br />
                                    <div class="form-check form-check-inline">
                                        <input
                                            class="form-check-input select-courier me-1"
                                            type="radio"
                                            name="courier"
                                            id="ongkos_kirim-tiki"
                                            value="tiki"
                                            v-model="state.courier_type"
                                            @change="getOngkir"
                                            style="cursor: pointer"
                                        />
                                        <label
                                            class="form-check-label fw-bold me-2"
                                            for="ongkos_kirim-tiki"
                                            style="cursor: pointer"
                                        >TIKI</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input
                                            class="form-check-input select-courier me-1"
                                            type="radio"
                                            name="courier"
                                            id="ongkos_kirim-pos"
                                            value="pos"
                                            v-model="state.courier_type"
                                            @change="getOngkir"
                                            style="cursor: pointer"
                                        />
                                        <label
                                            class="form-check-label fw-bold"
                                            for="ongkos_kirim-pos"
                                            style="cursor: pointer"
                                        >POS</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-1">
                                <div class="form-group" v-if="state.cost">
                                    <hr
                                        style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem"
                                    />
                                    <label class="fw-bold mb-1">Service Kurir</label>
                                    <br />
                                    <div
                                        v-for="value in state.costs"
                                        :key="value.service"
                                        class="form-check form-check-inline"
                                    >
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="cost"
                                            :id="value.service"
                                            :value="value.cost[0].value + '|' + value.service"
                                            v-model="state.costService"
                                            @change="getCostService"
                                            style="cursor: pointer"
                                        />
                                        <label
                                            class="form-check-label font-weight-normal me-5"
                                            :for="value.service"
                                            style="cursor: pointer"
                                        >{{ value.service }} - Rp. {{ moneyFormat(value.cost[0].value) }}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <div class="form-group">
                                    <label class="fw-bold mb-1">Alamat Lengkap</label>
                                    <textarea
                                        class="form-control"
                                        id="alamat"
                                        rows="3"
                                        placeholder="Alamat Lengkap&#10;&#10;Contoh: Perum. Griya Palem Indah, B-17 Jombang Jawa Timur 61419"
                                        v-model="state.address"
                                    ></textarea>
                                    <div
                                        v-if="validation.address"
                                        class="mt-2 alert alert-danger"
                                    >Masukkan Alamat Lengkap</div>
                                </div>
                            </div>
                            <div v-if="state.buttonCheckout" class="col-md-12 mt-3">
                                <button
                                    @click.prevent="checkout"
                                    class="btn btn-primary btn-lg w-100"
                                >Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../../api/Api'
import { onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
    setup() {
        const store = useStore()

        const router = useRouter()

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

        const state = reactive({
            name: '',
            phone: '',
            address: '',
            provinces: [],
            province_id: '',
            cities: [],
            city_id: '',
            courier: false,
            courier_type: '',
            cost: false,
            costs: '',
            costService: '',
            courier_cost: 0,
            courier_service: '',
            buttonCheckout: false,
            grandTotal: 0
        })

        const validation = reactive({
            name: false,
            phone: false,
            address: false
        })

        const provinces = onMounted(() => {
            Api.get('/rajaongkir/provinces')
                .then(response => {
                    state.provinces = response.data.data
                }).catch(error => {
                    console.log(error)
                })
        })

        const getCities = () => {
            Api.get('/rajaongkir/cities', {
                params: {
                    province_id: state.province_id
                }
            })
                .then(response => {
                    state.cities = response.data.data
                }).catch(error => {
                    console.log(error)
                })
        }

        const getCourier = () => {
            state.courier = true
        }

        const getOngkir = () => {
            if (cartWeight.value == 0) {
                Swal.fire({
                    title: "Oops...",
                    text: "Silahkan pilih produk terlebih dahulu!",
                    icon: "error",
                });
                return
            }

            Swal.fire({
                title: 'Loading...',
                text: 'Silahkan tunggu beberapa saat!',
                icon: "info",
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            Api.post('/rajaongkir/checkOngkir', {
                city_destination: state.city_id,
                weight: cartWeight.value,
                courier: state.courier_type
            })
                .then(response => {
                    Swal.close()
                    state.cost = true

                    state.costs = response.data.data[0].costs
                }).catch(error => {
                    console.log(error)
                })
        }

        const getCostService = () => {
            let shipping = state.costService.split("|")

            state.courier_cost = shipping[0]
            state.courier_service = shipping[1]

            const token = store.state.auth.token

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Api.get('cart/total')
                .then(response => {
                    state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost)
                })

            state.buttonCheckout = true
        }

        const checkout = () => {
            if (state.name && state.phone && state.address && cartWeight.value) {
                let data = {
                    name: state.name,
                    phone: state.phone,
                    province_id: state.province_id,
                    city_id: state.city_id,
                    courier_type: state.courier_type,
                    courier_service: state.courier_service,
                    courier_cost: state.courier_cost,
                    weight: cartWeight.value,
                    address: state.address,
                    grandTotal: state.grandTotal
                }

                Swal.fire({
                    title: 'Loading...',
                    text: 'Silahkan tunggu beberapa saat!',
                    icon: "info",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                })
                store.dispatch('cart/checkout', data)
                    .then(response => {
                        Swal.close()
                        router.push({
                            name: 'detail_order',
                            params: {
                                snap_token: response[0].snap_token
                            }
                        })
                        Swal.fire({
                            title: "Success",
                            text: "Checkout berhasil.",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }).catch(error => {
                        console.log(error)
                    })
            }

            if (!state.name) {
                validation.name = true
            }

            if (!state.phone) {
                validation.phone = true
            }

            if (!state.address) {
                validation.address = true
            }
        }

        return {
            carts,
            cartCount,
            cartTotal,
            cartWeight,
            removeCart,
            state,
            validation,
            provinces,
            getCities,
            getCourier,
            getOngkir,
            getCostService,
            checkout,
        }
    }
}
</script>