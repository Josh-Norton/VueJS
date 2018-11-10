var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'These are some nice socks',
    image: './assets/dog.jpg',
    link: 'https://www.google.com',
    inventory: 20,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "Green",
        variantImage: "./assets/dog.jpg"
      },
      {
        variantId: 2235,
        variantColor: "Blue",
        variantImage: "./assets/dog2.jpg"
      }
    ],
    sizes: ["Small", "Medium", "Large"],
    cart: 0
  },
  methods: {
    addToCart: function () {
      this.cart++;
      this.inventory--;
    },
    removeFromCart: function () {
      this.cart--;
      this.inventory++;
    },
    updateProduct: function (variantImage) {
      this.image = variantImage;
    }
  }
});

// var header = document.querySelector("h1");
// header.innerHTML = "Does this work?";
