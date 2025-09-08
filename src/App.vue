<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-card-item class="title-container">
            <div class="blue-rectangle"></div>
            <v-card-title class="title-text">Food Factory Management System - Production</v-card-title>
          </v-card-item>
          <v-card-text>
            <FormComponent @add-product="addProduct" />
            <TableComponent :products="products" @delete-product="confirmDelete" />
            <div class="submit-container">
              <v-btn color="primary" @click="confirmSubmit">Submit</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>

    <snackbar
      v-model="snackbar.visible"
      :message="snackbar.message"
      :color="snackbar.color"
    />

    <confirmDialog
      v-model="confirmDialog.visible"
      :message="`Are you sure you want to delete this product?`"
      title="Delete Confirmation"
      @confirm="deleteProduct"
    />

    <confirmDialog
      v-model="submitDialog.visible"
      :message="`Are you sure want to submit all products?`"
      title="Submit Confirmation"
      @confirm="submit"
    />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './services/firebase';
import FormComponent from './components/FormComponent.vue';
import TableComponent from './components/TableComponent.vue';
import Snackbar from './helpers/utils/Snackbar.vue';
import ConfirmDialog from './helpers/utils/ConfirmDialog.vue';

// List of products
const products = ref([]);

// Snackbar
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success',
});

// Dialog box for delete confirmation
const confirmDialog = ref({
  visible: false,
  product: null,
});

// Dialog box for submit confirmation
const submitDialog = ref({
  visible: false,
})

// Load products from local storage 
onMounted(() => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products.value = JSON.parse(storedProducts);
  }
});

// Save products to local storage
const saveToStorage = () => {
  localStorage.setItem('products', JSON.stringify(products.value));
}

// Show snackbar
const showSnackbar = (message, color = 'success') => {
  snackbar.value.message = message;
  snackbar.value.color = color;
  snackbar.value.visible = true;
}

// Add a new product
const addProduct = (product) => {
  products.value.push(product);
  saveToStorage();
  showSnackbar('Product added successfully!', 'success');
};

// Confirmation before delete a product
const confirmDelete = (product) => {
  confirmDialog.value.product = product;
  confirmDialog.value.visible = true;
};

// Delete the confirmed product
const deleteProduct = () => {
  const product = confirmDialog.value.product;
  const index = products.value.findIndex(
    (p) => 
      p.name === product.name && 
      p.batch === product.batch && 
      p.date === product.date
  );
  if (index > -1) {
    products.value.splice(index, 1);
    saveToStorage();
    showSnackbar('Product deleted successfully!', 'error');
  }
};

// Confirmation before submitting products
const confirmSubmit = () => {
  submitDialog.value.visible = true;
};

// Submit all products to Firebase
const submit = async () => {
  try {
    if (!products.value.length) {
      showSnackbar('No products to submit', 'error');
      return
    }

    for (const product of products.value) {
      await addDoc(collection(db, 'rukshan_productions'), {
        name: product.name,
        batch: product.batch,
        date: product.date,
      });
    }

    showSnackbar('Products submitted successfully!', 'success');

    localStorage.removeItem('products');
    products.value = [];

  } catch (error) {
    console.error('Error submitting products:', error);
    showSnackbar('Error submitting products', 'error');
  }
};
</script>

<style scoped>
.title-container {
  position: relative;
  padding: 16px;
}

.blue-rectangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #2196F3;
  z-index: 0;
}

.title-text {
  position: relative;
  z-index: 1;
  color: white;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

</style>
