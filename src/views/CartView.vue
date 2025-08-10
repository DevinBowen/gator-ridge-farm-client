<template>
  <Navigation />
  <div class="cart">
    <h1>Your Cart</h1>

    <div v-if="cart.items.length === 0" class="empty">
      <p>Your cart is empty.</p>
    </div>

    <div v-else>
      <div class="cart-items">
        <div class="cart-card" v-for="item in cart.items" :key="item.id">
          <img :src="item.image" :alt="item.name" />
          <div class="details">
            <h3>{{ item.name }}</h3>
            <p class="price">${{ item.price.toFixed(2) }}</p>
            <div class="controls">
              <button class="btn" @click="cart.decrementItem(item.id)" aria-label="Decrease quantity">-</button>
              <input class="qty" type="number" :value="item.quantity" @change="(e: Event) => onQtyChange(item.id, e)" />
              <button class="btn" @click="cart.addItem(item)" aria-label="Increase quantity">+</button>
            </div>
            <div class="row">
              <span class="stock">In stock: {{ item.stock }}</span>
              <button class="link danger" @click="cart.removeItem(item.id)">Remove</button>
            </div>
          </div>
          <div class="line-total">${{ (item.price * item.quantity).toFixed(2) }}</div>
        </div>
      </div>

      <div class="summary">
        <div class="sum-row">
          <span>Items</span>
          <span>{{ cart.totalItems }}</span>
        </div>
        <div class="sum-row total">
          <span>Total</span>
          <span>${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="actions">
          <button class="btn-outline" @click="cart.clearCart">Clear Cart</button>
          <button class="btn-primary" disabled>Checkout</button>
        </div>
      </div>
    </div>
  </div>
 </template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import { useCartStore, type CartItem } from '../stores/cart'

const cart = useCartStore()

function onQtyChange(id: number, e: Event) {
  const value = parseInt((e.target as HTMLInputElement).value, 10)
  if (Number.isNaN(value)) return
  const item = cart.items.find(i => i.id === id)
  if (!item) return
  const next = Math.max(1, Math.min(value, item.stock))
  if (next > item.quantity) {
    for (let i = 0; i < next - item.quantity; i++) cart.addItem(item as Omit<CartItem, 'quantity'>)
  } else if (next < item.quantity) {
    for (let i = 0; i < item.quantity - next; i++) cart.decrementItem(id)
  }
}
</script>

<style scoped>
.cart {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.empty {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
  color: #666;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-card {
  display: grid;
  grid-template-columns: 88px 1fr auto;
  gap: 0.75rem;
  background: #fff;
  border-radius: 12px;
  padding: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  align-items: center;
}

.cart-card img {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 8px;
}

.details h3 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
}
.price {
  color: #388e3c;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.btn {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #4CAF50;
  color: #fff;
  border-radius: 6px;
  font-size: 1.1rem;
}
.qty {
  width: 72px;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.row .link {
  background: none;
  border: none;
  padding: 0.25rem 0.5rem;
  color: #d32f2f;
  text-decoration: underline;
  cursor: pointer;
}
.line-total {
  font-weight: 700;
  font-size: 1rem;
}

.summary {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.sum-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.sum-row.total {
  border-top: 1px solid #eee;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  font-weight: 700;
}
.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}
.btn-outline {
  flex: 1;
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.75rem;
  border-radius: 8px;
}
.btn-primary {
  flex: 1;
  background: #4CAF50;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .cart-card {
    grid-template-columns: 120px 1fr auto;
    padding: 1rem;
  }
  .cart-card img {
    width: 120px;
    height: 120px;
  }
  .line-total {
    font-size: 1.1rem;
  }
  .actions {
    justify-content: flex-end;
  }
}
</style>