<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Food Factory Management System - Production</v-card-title>
          <v-card-text>
            <FormComponent @add-product="addProduct" />
            <TableComponent :products="products" @delete-product="deleteProduct" />
            <v-btn color="primary" block class="mt-4" @click="submit">Submit</v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
 import { ref, onMounted } from 'vue';
 import FormComponent from './components/FormComponent.vue';
 import TableComponent from './components/TableComponent.vue';

 const products = ref([]);
 onMounted(() => {
   const storedProducts = localStorage.getItem('products');
   if (storedProducts) {
     products.value = JSON.parse(storedProducts);
   }
 });

 const saveToStorage = () => {
   localStorage.setItem('products', JSON.stringify(products.value));
 }

 const addProduct = (product) => {
   products.value.push(product);
   saveToStorage();
 };

 const deleteProduct = (product) => {
   const index = products.value.indexOf(product);
   if (index > -1) {
     products.value.splice(index, 1);
   }
   saveToStorage();
 };

 const submit = () => {
   console.log('Submitted data: ', products.value);
   alert('Data submitted successfully!');
 }

</script>

<style scoped>

</style>
