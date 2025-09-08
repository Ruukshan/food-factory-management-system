<template>
  <v-dialog v-model="isVisible">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          variant="toner"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          variant="toner"
          @click="confirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

// props accepted from parent component
const props = defineProps({
    modelValue: Boolean,
    title: { type: String, default: 'Confirm Action' },
    message: { type: String, default: 'Are you sure?'},
});

// Define emits
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

// Local ref to bind with v-dialog
const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    isVisible.value = val;
});

// Handle confirm action
const confirm = () => {
    emit('confirm');
    emit('update:modelValue', false);
};

// Hancle cance action
const cancel = () => {
    emit('cancel');
    emit('update:modelValue', false);
}
</script>

<style scoped>

</style>