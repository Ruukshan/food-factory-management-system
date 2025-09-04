<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card-title>Food Factory Management System - Production</v-card-title>
        <v-card-text>
          <FormComponent @add-product="addProduct" />
          <TableComponent :products="products" @delete-product="deleteProduct" />
          <v-btn color="primary" block class="mt-4" @click="submit">Submit</v-btn>
        </v-card-text>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
 import { ref } from 'vue';
 import FormComponent from './components/FormComponent.vue';
 import TableComponent from './components/TableComponent.vue';

 const products = ref([]);
 const addProduct = (product) => {
   products.value.push(product);
 };
 const deleteProduct = (index) => {
   products.value.splice(index, 1);
 };
 const submit = () => {
   console.log('Submitted data: ', products.value);
   alert('Data submitted successfully!');
 }

</script>

<style scoped>

</style>
