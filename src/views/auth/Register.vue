<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h4>Register</h4>
                        <hr />
                        <form @submit.prevent="register">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            v-model="user.name"
                                            class="form-control"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div
                                        v-if="validation.name"
                                        class="mt-2 alert alert-danger"
                                    >{{ validation.name[0] }}</div>
                                </div>
                                <div class="col-md-6 mt-3 mt-md-0">
                                    <div class="form-group">
                                        <label>Email address</label>
                                        <input
                                            type="email"
                                            v-model="user.email"
                                            class="form-control"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div
                                        v-if="validation.email"
                                        class="mt-2 alert alert-danger"
                                    >{{ validation.email[0] }}</div>
                                </div>
                            </div>
                            <div class="row mt-3 mb-3">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            v-model="user.password"
                                            class="form-control"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <div
                                        v-if="validation.password"
                                        class="mt-2 alert alert-danger"
                                    >{{ validation.password[0] }}</div>
                                </div>
                                <div class="col-md-6 mt-3 mt-md-0">
                                    <div class="form-group">
                                        <label>Konfirmasi Password</label>
                                        <input
                                            type="password"
                                            v-model="user.password_confirmation"
                                            class="form-control"
                                            placeholder="Konfirmasi Password"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Register</button>
                        </form>
                    </div>
                </div>
                <div class="register mt-3 text-center">
                    <p>
                        Sudah punya akun ?
                        <router-link
                            :to="{ name: 'login' }"
                            class="text-decoration-none"
                        >Login Disini !</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
    setup() {
        const user = reactive({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        })

        const validation = ref([])

        const store = useStore()

        const router = useRouter()

        const register = () => {
            let name = user.name
            let email = user.email
            let password = user.password
            let password_confirmation = user.password_confirmation

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
            store.dispatch('auth/register', {
                name,
                email,
                password,
                password_confirmation
            })
                .then(() => {
                    Swal.close()
                    router.push({ name: 'dashboard' })
                    Swal.fire({
                        title: "Success",
                        text: "Register berhasil.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }).catch(error => {
                    Swal.close()
                    validation.value = error
                })
        }

        return {
            user,
            validation,
            register
        }
    }
}
</script>