<template>
    <v-row>
        <v-col cols="12" md="4">
            <v-text-field lable="Product name" v-model="newProduct.name"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-text-field label="Batch Number" v-model="newProduct.batchNumber"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-text-field
                lable="Production Date"
                v-model="newProduct.date"
                pepend-inner-icon="mdi-calendar"
                readonly
                @click="datePicker = true"
            ></v-text-field>
            <v-menu
                v-model="datePicker"
                :close-on-content-click="false"
                activator="parent"
            >
                <v-date-picker
                    v-model="newProduct.date"
                    @input="datePicker = false"
                ></v-date-picker>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const newProduct = ref({
    name: '',
    batchNumber: '',
    date: ''
});

const datePicker = ref(false);

const emit = defineEmits(['addProduct']);

const addProduct = () => {
    if (newProduct.value.name && newProduct.value.batchNumber && newProduct.value.date) {
        emit('addProduct', newProduct.value);
        newProduct.value = {
            name: '',
            batchNumber: '',
            date: ''
        };
    }
};
</script>