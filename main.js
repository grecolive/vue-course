const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true,
        }
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        },
        decrementFromCart(index){
            this.cart.splice(index, 1)
        },
    }
})



