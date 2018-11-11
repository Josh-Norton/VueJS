Vue.component('product' , {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    inCart: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">

    <div class="product-image">
      <img :src="image" alt="">
    </div>

    <div class="product-info">
      <h1 :class="{'line-thru': !inventory > 0}">{{title}}</h1>
      <p v-if="premium"><em>Premium</em> User</p>
      <p v-else>Normal User</p>
      <p class="sale">{{saleMessage}}</p>
      <p>{{description}}</p>
      <p v-if="inventory > 10">In Stock</p>
      <p v-else-if="inventory > 0">Almost sold out!</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{shipping}}</p>

      <productDetails :details="details"></productDetails>
      <productDetails :details="details"></productDetails>
      <productDetails :details="details"></productDetails>

      <p>Sizes:</p>
      <ul>
        <li v-for="size in sizes">{{size}}</li>
      </ul>

      <div v-for="(variant, index) in variants"
           :key="variant.variantId"
           class="color-box"
           :style = "{backgroundColor: variant.variantColor}"
           @mouseover="updateProduct(index)">
      </div>

      <button v-on:click="addToCart" :disabled="!inventory > 0" :class="{disabledButton: !inventory > 0}">Add to Cart</button>
      <button v-on:click="removeFromCart" :disabled="!inCart" :class="{disabledButton: !inCart}">Remove</button>

      <p>Check <a :href="link">this</a> out</p>
    </div>

  </div>
  `,
  data() {
    return {
      brand: 'Vue Mastery',
      prod: 'Socks',
      description: 'These are some nice socks',
      selectedVariant: 0,
      link: 'https://www.google.com',
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "Green",
          variantImage: "./assets/dog.jpg",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "Blue",
          variantImage: "./assets/dog2.jpg",
          variantQuantity: 10
        }
      ],
      sizes: ["Small", "Medium", "Large"]
    }
  },
  methods: {
    addToCart: function () {
      this.variants[this.selectedVariant].variantQuantity--;
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeFromCart: function () {
      this.variants[this.selectedVariant].variantQuantity++;
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
      this.$emit('update-selection', this.variants[this.selectedVariant].variantId);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.prod;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    saleMessage() {
      if (this.onSale) {
        return "Sale on " + this.prod + " from " + this.brand + '!!!';
      }
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      else {
        return 2.99
      }
    }
  }
});

Vue.component('productDetails' , {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
  <ul>
    <li v-for="detail in details">{{detail}}</li>
  </ul>
  `
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
    currentId: 2234
  },
  methods: {
    addToCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      this.cart.splice(this.cart.indexOf(id), 1);
    },
    updateSelection(id) {
      this.currentId = id;
    }
  },
  computed: {
    cartContainsProduct() {
      return this.cart.includes(this.currentId);
    }
  }
});
