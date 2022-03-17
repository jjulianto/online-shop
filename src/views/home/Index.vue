<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-md-3 mb-4">
                <Category />
            </div>
            <div class="col-md-9 mb-4">
                <Slider />
            </div>
        </div>
    </div>

    <div class="container-fluid mb-5 mt-4">
        <!-- data product -->
    </div>
</template>

<script>
import Category from '@/components/Category'
import Slider from '@/components/Slider'

    export default {
    components: {
        Category,
        Slider
    }
}
</script>