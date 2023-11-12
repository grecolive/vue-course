app.component('product-display', {
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
            <img :class="[!inStock?'out-of-stock-img':'']" :src="image" :alt="description">
            </div>
            <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else="!inStock">Out Stock</p>
            <p>{{sale}}</p>
            <p>Shipping: {{shipping}}</p>
            <product-details :details="details"></product-details>
            <product-variant :variants="variants" @update-variant="updateVariant"></product-variant>
            <button class="button" :class="{disabledButton:!inStock}"
            :disabled="!inStock" @click="addToCart">
            Add To Cart
            </button>
            <button class="button" @click="decrementFromCart">Remove</button>
            </div>
        </div>
        <div class="review-section">
            <review-form @review-submitted="addReview"></review-form>
            <review-list :reviews="reviews"></review-list>
        </div>
    </div>`,
    data() {
        return {
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            inventory: 10,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [{
                id: 2234,
                color: 'green',
                image: './assets/images/socks_green.jpg'
            },
            {
                id: 2235,
                color: 'blue',
                image: './assets/images/socks_blue.jpg'
            }],
            reviews: []
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        decrementFromCart(){
           this.$emit('decrement-from-cart',this.variants[this.selectedVariant])
        },
        updateVariant(index){
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed:{
        title(){
            return this.product + ' ' + this.variants[this.selectedVariant].color
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.inventory > 0
        },
        sale(){
            if (this.onSale) {
                return this.product + ' ' + 'is on sale!'
            }
            return this.product + ' ' + 'is not on sale!'
        },
        shipping(){
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }

    }
})