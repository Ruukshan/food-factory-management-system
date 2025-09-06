<template>
  <v-dialog
    v-model="isVisible"
    max-width="400"
    :style="{
         'border-radius': '8px',
        }"
  >
    <v-card :style="{ 'border-radius': '8px' }">
      <v-card-title
        class="text-h6"
        :style="{
          'font-size': '20px',
          'font-weight': 'bold',
          color: '#71d5e2',
        }"
      >
        {{ title }}
      </v-card-title>
      <v-card-text
        :style="{
          'font-size': '16px',
          'font-weight': 'bold',
          color: '#333333',
        }"
      >
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          variant="toner"
          @click="cancel"
          :style="{ 'min-width': '100px'}"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          variant="toner"
          @click="confirm"
          :style="{ 'min-width': '100px'}"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    title: { type: String, default: 'Confirm Action' },
    message: { type: String, default: 'Are you sure?'},
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    isVisible.value = val;
});

const confirm = () => {
    emit('confirm');
    emit('update:modelValue', false);
};

const cancel = () => {
    emit('cancel');
    emit('update:modelValue', false);
}
</script>

<style scoped>

</style>