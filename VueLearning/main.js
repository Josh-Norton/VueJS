var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
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
    sizes: ["Small", "Medium", "Large"],
    cart: 0
  },
  methods: {
    addToCart: function () {
      this.cart++;
      this.variants[this.selectedVariant].variantQuantity--;
    },
    removeFromCart: function () {
      this.cart--;
      this.variants[this.selectedVariant].variantQuantity++;
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    saleMessage() {
      if (this.onSale) {
        return "Sale on " + this.product + " from " + this.brand + '!!!';
      }
    }
  }
});

// var header = document.querySelector("h1");
// header.innerHTML = "Does this work?";
