<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu />
            </div>
            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="fw-bold"> <i class="fas fa-tachometer-alt"></i> Dashboard</h5>
                        <hr>
                        Selamat Datang <strong>{{ user.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>    
import CustomerMenu from '../../components/CustomerMenu'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    components: {            
        CustomerMenu,
    },
    setup() {            
        const store = useStore()
        
        onMounted(() => {                
            store.dispatch('auth/getUser')
        })
        
        const user = computed(() => {                
            return store.getters['auth/currentUser']
        })

        return {
            store,
            user
        }
    }
}
</script>