<template>
  <Navigation />
  <div class="cart">
    <h1>Your Cart</h1>
    <div v-if="cart.items.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cart.items" :key="item.id">
          {{ item.name }} - {{ item.quantity }} × ${{ item.price }} =
          ${{ (item.quantity * item.price).toFixed(2) }}
          <button @click="cart.removeItem(item.id)">Remove</button>
        </li>
      </ul>
      <p><strong>Total:</strong> ${{ cart.totalPrice.toFixed(2) }}</p>
      <button @click="cart.clearCart">Clear Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
</script>

<style scoped>
.cart {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
}
ul {
  list-style: none;
  padding-left: 0;
}
li {
  margin-bottom: 1rem;
}
button {
  margin-left: 1rem;
}
</style>