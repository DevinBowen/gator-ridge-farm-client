<template>
  <Navigation />
  <div class="admin">
    <h1>Admin</h1>
    
    <!-- Account Section -->
    <div class="admin-section">
      <h2>Create Account</h2>
      <form @submit.prevent="createAccount" class="create-account-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input 
            id="username"
            type="text" 
            v-model="newAccount.username" 
            required 
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            id="password"
            type="password" 
            v-model="newAccount.password" 
            required 
            placeholder="Enter password"
          />
        </div>
        <button type="submit" :disabled="loading.createAccount">
          {{ loading.createAccount ? 'Creating...' : 'Create Account' }}
        </button>
      </form>
    </div>

    <!-- Add Item Section -->
    <div class="admin-section">
      <h2>Add Item</h2>
      <form @submit.prevent="addItem" class="add-item-form">
        <div class="form-row">
          <div class="form-group">
            <label for="itemName">Item Name:</label>
            <input 
              id="itemName"
              type="text" 
              v-model="newItem.name" 
              required 
              placeholder="Enter item name"
            />
          </div>
          <div class="form-group">
            <label for="itemPrice">Price:</label>
            <input 
              id="itemPrice"
              type="number" 
              step="0.01"
              v-model="newItem.price" 
              required 
              placeholder="0.00"
            />
          </div>
          <div class="form-group">
            <label for="itemStock">Initial Stock:</label>
            <input 
              id="itemStock"
              type="number" 
              v-model="newItem.stock" 
              required 
              placeholder="0"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="itemDescription">Description:</label>
          <textarea 
            id="itemDescription"
            v-model="newItem.description" 
            placeholder="Enter item description"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" :disabled="loading.addItem">
          {{ loading.addItem ? 'Adding...' : 'Add Item' }}
        </button>
      </form>
    </div>

    <!-- Items Table Section -->
    <div class="admin-section">
      <h2>Inventory Management</h2>
      <div class="table-container">
        <table class="items-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td data-label="ID">{{ item.id }}</td>
              <td data-label="Name">{{ item.name }}</td>
              <td data-label="Description">{{ item.description }}</td>
              <td data-label="Price">${{ item.price.toFixed(2) }}</td>
              <td data-label="Stock">{{ item.stock }}</td>
              <td class="actions" data-label="Actions">
                <div class="stock-controls">
                  <button 
                    @click="updateStock(item.id, item.stock - 1)"
                    :disabled="item.stock <= 0 || loading.updateStock"
                    class="btn-decrease"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    :value="item.stock"
                    @change="(e: Event) => updateStock(item.id, parseInt((e.target as HTMLInputElement).value, 10))"
                    :disabled="loading.updateStock"
                    class="stock-input"
                  />
                  <button 
                    @click="updateStock(item.id, item.stock + 1)"
                    :disabled="loading.updateStock"
                    class="btn-increase"
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="items.length === 0" class="no-items">
          No items found in the database.
        </div>
      </div>
    </div>

    <!-- Error/Success Messages -->
    <div v-show="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import { AuthService } from '@/services/auth'
import { GRFService } from '@/services/GRF'

// Reactive data
const newAccount = ref({
  username: '',
  password: ''
})

const newItem = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0
})

interface Item {
  id: number
  name: string
  description: string
  price: number
  stock: number
}

const items = ref<Item[]>([])
const message = ref('')
const messageType = ref('')

const loading = ref({
  createAccount: false,
  addItem: false,
  updateStock: false,
  fetchItems: false
})

async function createAccount() {
  loading.value.createAccount = true
  try {
    await AuthService.createAccount(newAccount.value.username, newAccount.value.password)
    
    showMessage('Account created successfully!', 'success')
    newAccount.value.username = ''
    newAccount.value.password = ''
  } catch (error: any) {
    showMessage(`Failed to create account: ${error.response?.data?.message || error.message}`, 'error')
  } finally {
    loading.value.createAccount = false
  }
}

async function addItem() {
  loading.value.addItem = true
  try {
    const response = await GRFService.createProduct(newItem.value)
    console.log(response)

    await fetchItems()
    showMessage('Item added successfully!', 'success')
    
    newItem.value.name = ''
    newItem.value.description = ''
    newItem.value.price = 0
    newItem.value.stock = 0
  } catch (error: any) {
    showMessage(`Failed to add item: ${error.response?.data?.message || error.message}`, 'error')
  } finally {
    loading.value.addItem = false
  }
}

async function updateStock(itemId: number, newStock: number) {
  if (newStock < 0) return
  
  loading.value.updateStock = true
  try {
    await GRFService.updateProduct(itemId, { stock: newStock })
    
    const itemIndex = items.value.findIndex(item => item.id === itemId)
    if (itemIndex !== -1) {
      items.value[itemIndex].stock = newStock
    }
    
    showMessage('Stock updated successfully!', 'success')
  } catch (error: any) {
    showMessage(`Failed to update stock: ${error.response?.data?.message || error.message}`, 'error')
  } finally {
    loading.value.updateStock = false
  }
}

async function fetchItems() {
  loading.value.fetchItems = true
  try {
    const response = await GRFService.readProductAllActive()
    console.log('Fetched active products:', response)
    items.value = response
  } catch (error: any) {
    showMessage(`Failed to fetch items: ${error.response?.data?.message || error.message}`, 'error')
  } finally {
    loading.value.fetchItems = false
  }
}

function showMessage(text: string, type: string) {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

// Load items when component mounts
onMounted(() => {
  fetchItems()
})
</script>

<style scoped>
.admin {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  max-width: 100%;
  margin: 0 auto;
}

.admin-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.admin-section:last-of-type {
  border-bottom: none;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row .form-group {
  width: 100%;
  min-width: 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1.05rem;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  width: 100%;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}


.items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.95rem;
}

.items-table th,
.items-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.items-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 1;
}

.items-table tr:hover {
  background-color: #f9f9f9;
}

.actions {
  text-align: center;
}


.stock-controls {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
}

.stock-input {
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
  appearance: textfield;
}

.btn-decrease,
.btn-increase {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 4px;
}

.btn-decrease {
  background-color: #f44336;
}

.btn-decrease:hover:not(:disabled) {
  background-color: #da190b;
}

.btn-increase {
  background-color: #4CAF50;
}

.no-items {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

.message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  z-index: 1000;
  max-width: 400px;
}

.message.success {
  background-color: #4CAF50;
}

.message.error {
  background-color: #f44336;
}

@media (min-width: 768px) {
  .admin {
    max-width: 1200px;
    padding: 2rem;
  }
  .form-row {
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .form-row .form-group {
    min-width: 200px;
    flex: 1;
  }
  .stock-controls {
    flex-direction: row;
    align-items: center;
  }
  .stock-input {
    width: 60px;
  }
  button {
    width: auto;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
  }
}

/* Mobile card-style table */
@media (max-width: 767px) {
  .items-table thead {
    display: none;
  }
  .items-table, .items-table tbody, .items-table tr, .items-table td {
    display: block;
    width: 100%;
  }
  .items-table tr {
    background: #fff;
    margin-bottom: 0.75rem;
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    overflow: hidden;
  }
  .items-table td {
    display: grid;
    grid-template-columns: 7rem 1fr;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-bottom: 1px solid #eee;
  }
  .items-table td:last-child {
    border-bottom: none;
  }
  .items-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #555;
  }
  .items-table .actions {
    text-align: left;
    grid-template-columns: 1fr;
  }
  .items-table .actions::before {
    margin-bottom: 0.25rem;
  }
  /* Make stock controls compact and horizontal inside mobile cards */
  .items-table .actions .stock-controls {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
  }
  .items-table .actions .stock-input {
    width: auto;
    flex: 1 1 120px;
    min-width: 100px;
    max-width: 160px;
  }
  .items-table .actions .btn-decrease,
  .items-table .actions .btn-increase {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
}
</style>