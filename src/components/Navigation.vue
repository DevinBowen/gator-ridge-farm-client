<template>
  <nav>
    <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu" :aria-expanded="isOpen">
      ☰
    </button>
    <div :class="['menu', { open: isOpen }]">
      <RouterLink to="/" @click="closeMenu">Home</RouterLink>
      <RouterLink to="/market" @click="closeMenu">Market</RouterLink>
      <RouterLink to="/cart" class="cart-link" @click="closeMenu">
        Cart
        <span v-if="cart.totalItems" class="badge">{{ cart.totalItems }}</span>
      </RouterLink>
      <RouterLink to="/about" @click="closeMenu">About</RouterLink>
      <RouterLink v-show="AuthService.isAuthenticated()" to="/admin" @click="closeMenu">Admin</RouterLink>

      <div class="auth-actions">
        <RouterLink v-if="!AuthService.isAuthenticated()" to="/login" @click="closeMenu">Login</RouterLink>
        <RouterLink v-else to="/" @click="logout">Logout</RouterLink>
      </div>
    </div>
  </nav>
  </template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { AuthService } from '@/services/auth'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
const closeMenu = () => {
  isOpen.value = false
}

const logout = () => {
  AuthService.logout()
  window.location.href = '/'
}
</script>

<style scoped>
nav {
  background-color: #4CAF50;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  position: relative;
}

/* Hamburger button */
.menu-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  display: block;
}

/* Menu - default hidden on mobile */
.menu {
  display: none;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0.25rem;
}

.menu a {
  color: white;
  text-decoration: none;
  padding: 0.75rem 0;
  font-weight: 500;
  display: block;
}

/* Show menu when toggled open */
.menu.open {
  display: flex;
}

/* Active link style */
.menu a.router-link-active {
  text-decoration: underline;
}

.auth-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
}

.cart-link {
  position: relative;
}
.badge {
  display: inline-block;
  margin-left: 0.5rem;
  min-width: 1.5rem;
  padding: 0 0.4rem;
  height: 1.25rem;
  line-height: 1.25rem;
  text-align: center;
  background: #fff;
  color: #2e7d32;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

/* Larger screens - horizontal nav */
@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .menu {
    display: flex !important;
    flex-direction: row;
    gap: 1rem;
    margin-top: 0;
    align-items: center;
  }

  .menu a {
    padding: 0;
    margin-right: 1rem;
  }

  .auth-actions {
    margin-left: auto;
    margin-top: 0;
    align-items: center;
  }
}
</style>