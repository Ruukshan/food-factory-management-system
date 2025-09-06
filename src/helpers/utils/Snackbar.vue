<template>
  <v-snackbar 
    v-model="isVisible" 
    :color="color" 
    :timeout="timeout"
    location="bottom"
    >
    {{ message }}

    <template v-slot:actions>
        <v-btn color= "white" variant="text" @click="isVisible = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    message: String,
    color: { type: String, default: 'success' },
    timeout: { type: Number, default: 3000 },
});

const emit = defineEmits(['update:modelValue']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    isVisible.value = val;
});

watch(isVisible, (val) => {
    emit('update:modelValue', val);
});
</script>