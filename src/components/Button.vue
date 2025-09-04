<script setup>
const props = defineProps({
  label: { type: String, required: true },
  color: { type: String, default: "primary" },
  type: { type: String, default: "button" },
});
</script>

<template>
  <v-btn :color="color" :type="type" class="ma-2">
    {{ label }}
  </v-btn>
</template>
