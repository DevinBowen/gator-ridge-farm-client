<template>
  <div class="market">
    <h1>Market</h1>
    <div class="items">
      <div class="item-card" v-for="item in items" :key="item.id">
        <img :src="item.image" alt="Product Image" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p class="price">${{ item.price.toFixed(2) }}</p>
        <button @click="cart.addItem(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const items = [
  {
    id: 1,
    name: 'Dozen Free-Range Eggs',
    description: 'Laid this week by happy hens.',
    price: 5.00,
    stock: 3,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Whole Chicken',
    description: 'Pasture-raised, fresh processed.',
    price: 20.00,
    stock: 2,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Goat',
    description: '2-year-old Nigerian Dwarf.',
    price: 150.00,
    stock: 1,
    image: 'https://via.placeholder.com/150',
  },
]
</script>

<style scoped>
.market {
  padding: 1rem;
}
.items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.item-card {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  width: 200px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}
.item-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.price {
  font-weight: bold;
  margin-top: 0.5rem;
}
button {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
}
</style>