<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label>Email</label>
      <input type="email" v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  console.log('Logging in with:', email.value, password.value)
  alert('Mock login submitted.')
}
</script>

<style scoped>
.login {
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>