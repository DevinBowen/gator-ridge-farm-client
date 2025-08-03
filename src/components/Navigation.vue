<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/market">Market</RouterLink>
    <RouterLink to="/cart">Cart</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
nav {
  background-color: #4CAF50;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  font-weight: 500;
}

nav a.router-link-active {
  text-decoration: underline;
}
</style>
