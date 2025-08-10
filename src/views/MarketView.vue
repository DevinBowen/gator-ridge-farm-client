<template>
  <Navigation />
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
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import Navigation from '@/components/Navigation.vue'
import { GRFService } from '@/services/GRF'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const cart = useCartStore()
const items = ref<Product[]>([])

async function fetchItems() {
  try {
    const response = await GRFService.readProductAllActive()
    items.value = response
  } catch (error: any) {
    // Optionally handle error, e.g. show a message
    console.error('Failed to fetch items:', error)
  }
}

onMounted(() => {
  fetchItems()
})
</script>

<style scoped>

.market {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-card img {
  width: 100%;
  max-width: 220px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.price {
  font-weight: bold;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: #388e3c;
}

button {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  width: 100%;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
button:active {
  background-color: #388e3c;
}

@media (min-width: 600px) {
  .items {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .item-card {
    max-width: 220px;
  }
}
</style>