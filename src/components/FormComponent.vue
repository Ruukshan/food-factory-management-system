<template>
    <v-form ref="form">
    <v-row>
        <v-col cols="12" md="5">
            <v-text-field 
                label="Product name" 
                v-model="newProduct.name"
                :rules="nmaeRules"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field 
                label="Batch Number" 
                v-model="newProduct.batch"
                :rules="batchRules"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="9">
            <v-menu v-model="datePicker" :close-on-content-click="true" location="bottom end" :offset="15" :attach="true">
                <template v-slot:activator>
                    <v-text-field
                        v-model="newProduct.date"
                        label="Production Date"
                        append-inner-icon="mdi-calendar"
                        @click:append-inner.stop="openCalendar"
                        readonly
                        :rules="dateRules"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    @update:model-value="onDateSelected"
                ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" md="1" class="d-flex align-center">
            <v-btn color="success" @click="addProduct">Add</v-btn>
        </v-col>
    </v-row>
    </v-form>
</template>

<script setup>
import { ref } from 'vue';

const form = ref(null);

const newProduct = ref({
    name: '',
    batch: '',
    date: ''
});

const openCalendar = () => {
  datePicker.value = true;
};

const datePicker = ref(false);

const date = ref(null);

const onDateSelected = (val) => {
    const d = new Date(val);
    newProduct.value.date = d.toISOString().split('T')[0];
    datePicker.value = false;
}

const emit = defineEmits(['add-product']);

const nmaeRules = [
    v => !!v || 'Name is required',
    v => (v && v.length <= 20) || 'Name must be less than 20 characters',
];

const batchRules = [
    v => !!v || 'Batch number is required',
    v => (v && v.length <= 10) || 'Batch number must be less than 10 characters',
];

const dateRules = [
    v => !!v || 'Date is required',
];

const addProduct = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        emit('add-product', { ...newProduct.value });
        newProduct.value = {
            name: '',
            batch: '',
            date: ''
        };
        form.value.resetValidation();
    }
};
</script>