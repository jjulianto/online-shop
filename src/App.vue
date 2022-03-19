<template>
  <Header /> 
  <transition name="fade">
    <router-view />
  </transition>
  <Footer />
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('auth/getUser')
    })

    return {
      store,
    }
  }
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
