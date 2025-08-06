<template>
  <Navigation />
  <div class="view">
    <h1>Admin</h1>
    <p>This is the Admin page for Bowen Farm.</p>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
</script>

<style scoped>
.view {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}
</style>