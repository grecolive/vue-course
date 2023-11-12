app.component('product-variant', {
    props:{
        variants:{
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
    `<div 
    :key="variant.id"
    v-for="(variant, index) in variants"
    @mouseover="updateVariant(index)"
    class="color-circle" :style="{backgroundColor:variant.color}">
    </div>`,
       methods:{
        updateVariant(index){
            this.$emit('update-variant', index)
        }
    }

})