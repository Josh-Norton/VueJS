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

    <div>
      <h2>Reviews</h2>
      <p v-if="reviews.length === 0">There are no reviews yet.</p>

      <ul>
        <li v-for="review in reviews">
          <p>{{review.rating}} Stars</p>
          <p>{{review.review}}</p>
          <p>{{review.name}}</p>
          <p v-if="review.recommend === 'yes'"> This user recommends this item</p>
          <p v-else>This user does not recommend this item</p>
        </li>
      </ul>
    </div>

    <product-review @review-submitted="addReview"></product-review>

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
      sizes: ["Small", "Medium", "Large"],
      reviews: []
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
    },
    addReview: function (productReview) {
      this.reviews.push(productReview);
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

Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <strong>Please correct the following error<span v-if="errors.length > 1">s</span>:</strong>
      <ul>
        <li v-for="error in errors">{{error}}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option v-for="n in 5">{{ 6 - n }}</option>
      </select>
    </p>

    <p>Would you recommend this product?</p>
    <p>
      <label for="rec-yes">Yes</label>
      <input id="rec-yes" type="radio" name="recommend" value="yes" v-model="recommend">
      <label for="rec-no">No</label>
      <input id="rec-no" type="radio" name="recommend" value="no" v-model="recommend">
    </p>

    <p>
      <input type="submit" value="submit">
    </p>

  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []

      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }

        this.$emit('review-submitted', productReview);
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      }
      else {
        if (!this.name) {
          this.errors.push("Name must be entered");
        }
        if (!this.review) {
          this.errors.push("Review text must be entered");
        }
        if(!this.rating) {
          this.errors.push("You must give a rating");
        }
        if(!this.recommend) {
          this.errors.push("You must choose a recommendation option");
        }
      }
    }
  }
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
