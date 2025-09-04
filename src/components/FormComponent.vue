<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-text-field label="Product name" v-model="newProduct.name"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
            <v-text-field label="Batch Number" v-model="newProduct.batch"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
            <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ props }">
                    <v-text-field
                        v-bind="props"
                        v-model="newProduct.date"
                        label="Production Date"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="newProduct.date"
                    @input="datePicker = false"
                ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" md="2" class="d-flex align-center">
            <v-btn color="success" @click="addProduct">Add</v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const newProduct = ref({
    name: '',
    batch: '',
    date: ''
});

const datePicker = ref(false);

const emit = defineEmits(['add-product']);

const addProduct = () => {
    if (newProduct.value.name && newProduct.value.batch && newProduct.value.date) {
        emit('add-product', { ...newProduct.value });
        newProduct.value = {
            name: '',
            batchNumber: '',
            date: ''
        };
    }
};
</script>