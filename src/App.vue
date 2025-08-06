<template>
  <main>
    <div class="container">
      <RouterView />
    </div>
    <footer>
      © 2025 Gator Ridge Farm. All rights reserved.
    </footer>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 0.75rem;
}
</style>