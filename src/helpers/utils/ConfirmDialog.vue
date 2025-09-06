<template>
    <v-dialog v-model="isVisible" max-width="400">
        <v-card>
            <v-card-title class="text-h6">{{ title }}</v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" variant="text" @click="cancel">Cancel</v-btn>
                <v-btn color="red" variant="tonal" @click="confirm">Confirm</v-btn>
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