<template>
  <v-app>
    <v-main>
      <ProductionForm />
    </v-main>
    <AppSnackbar />
  </v-app>
</template>

<script setup>
import ProductionForm from "./components/ProductionForm.vue";
import AppSnackbar from "./components/AppSnackbar.vue";
</script>
