<template>
    <v-form ref="form">
    <v-row>
        <v-col cols="12" md="5">
            <v-text-field 
                label="Product name" 
                v-model="newProduct.name"
                :rules="nameRules"
                clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field 
                label="Batch Number" 
                v-model="newProduct.batch"
                :rules="batchRules"
                clearable
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="9">
            <v-text-field
            v-model="newProduct.date"
            label="Production Date"
            type="date"
            :rules="dateRules"
            clearable
          ></v-text-field>          
        </v-col>
        <v-col cols="12" md="1">
            <v-btn color="success" @click="addProduct">Add</v-btn>
        </v-col>
    </v-row>
    </v-form>
</template>

<script setup>
import { nextTick, ref } from 'vue';

const form = ref(null);

// Object for hold product data
const newProduct = ref({
    name: '',
    batch: '',
    date: ''
});

const emit = defineEmits(['add-product']);

// Validation rules for form fields
const nameRules = [
    v => !!v || 'Name is required',
];

const batchRules = [
    v => !!v || 'Batch number is required',
    v => /^B-\d{3}$/.test(v) || 'Batch number must be B-000 format',
];

const dateRules = [
    v => !!v || 'Date is required',
];

// Function to add product
const addProduct = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        emit('add-product', { ...newProduct.value });
        newProduct.value = {
            name: '',
            batch: '',
            date: ''
        };
        await nextTick();
        form.value.resetValidation();
    }
};
</script>

<style scoped>

</style>
