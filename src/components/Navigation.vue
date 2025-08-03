<template>
  <nav>
    <button class="menu-toggle" @click="toggleMenu">
      ☰
    </button>
    <div :class="['menu', { open: isOpen }]">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/market">Market</RouterLink>
      <RouterLink to="/cart">Cart</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
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
}

.menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  font-weight: 500;
}

/* Show menu when toggled open */
.menu.open {
  display: flex;
}

/* Active link style */
.menu a.router-link-active {
  text-decoration: underline;
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
  }

  .menu a {
    padding: 0;
    margin-right: 1rem;
  }
}
</style>