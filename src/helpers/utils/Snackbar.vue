<template>
  <v-snackbar 
    v-model="isVisible" 
    :color="color"
    :timeout="timeout" 
    >
    {{ message }}
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue';

// Define props 
const props = defineProps({
    modelValue: Boolean,
    message: String,
    color: { type: String, default: 'success' },
    timeout: { type: Number, default: 3000 },
});

// Define emits
const emit = defineEmits(['update:modelValue']);

// Define state
const isVisible = ref(props.modelValue);

// Watch for changes in the modelValue prop
watch(() => props.modelValue, (val) => {
    isVisible.value = val;
});

// Watch for changes in the isVisible state
watch(isVisible, (val) => {
    emit('update:modelValue', val);
});
</script>