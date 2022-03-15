<template>
  <div class="card border-0 rounded shadow">
    <div class="card-body">
        <h5 class="font-weight-bold">Main Menu</h5>
        <hr>
        <ul class="list-group">
            <router-link :to="{name: 'dashboard' }" class="list-group-item text-decoration-none text-dark"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
            <a href="#" class="list-group-item text-decoration-none text-dark"><i class="fas fa-shopping-cart"></i> My Order</a>
            <a href="#" style="cursor:pointer" class="list-group-item text-decoration-none text-dark"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CustomerMenu',
}
</script>