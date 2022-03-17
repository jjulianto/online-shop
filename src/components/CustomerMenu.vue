<template>
  <div class="card border-0 rounded shadow">
    <div class="card-body">
        <h5 class="fw-bold">Main Menu</h5>
        <hr>
        <ul class="list-group">
            <router-link :to="{name: 'dashboard' }" class="list-group-item text-decoration-none text-dark"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
            <router-link :to="{name: 'order'}" class="list-group-item text-decoration-none text-dark"><i class="fas fa-shopping-cart"></i> My Order</router-link>
            <a @click="logout" style="cursor:pointer" class="list-group-item text-decoration-none text-dark"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'CustomerMenu',

    setup() {
    const store = useStore()
    
    const router = useRouter()
    
    const logout = () => {
      store.dispatch('auth/logout')  
      .then(() => {
          router.push({
            name: 'login'
          })          
      })
    }
    
    return {
      store,
      router,
      logout
    }
  }
}
</script>