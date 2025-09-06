<template>
    <v-form ref="form">
    <v-row>
        <v-col cols="12" md="5">
            <v-text-field 
                label="Product name" 
                v-model="newProduct.name"
                :rules="nameRules"
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
            <v-menu 
                v-model="datePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                >
                <template v-slot:activator="{ props }">
                    <v-text-field
                        v-model="newProduct.date"
                        label="Production Date"
                        readonly
                        type="text"
                        :rules="dateRules"
                    >
                        <template v-slot:append-inner>
                            <span v-bind="props" @click.stop="datePicker = true">
                                <v-icon>mdi-calendar</v-icon>
                            </span>
                        </template>
                    </v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    color="primary"
                    @update:model-value="onDateSelected"
                    :show-adjacent-months="true"
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

const datePicker = ref(false);

const date = ref(null);

const onDateSelected = (val) => {
    const d = new Date(val);
    newProduct.value.date = d.toISOString().split('T')[0];
    datePicker.value = false;
}

const emit = defineEmits(['add-product']);

const nameRules = [
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

<style scoped>
/* Make the overall date picker smaller */
:deep(.v-date-picker) {
  font-size: 13px;
  padding: 6px;
  max-width: 320px;
}

/* Shrink day buttons */
:deep(.v-date-picker .v-btn) {
  min-width: 30px !important;
  height: 30px !important;
  font-size: 0.8rem;
  border-radius: 6px;
}

/* Month/Year navigation buttons */
:deep(.v-date-picker-controls__month-btn),
:deep(.v-date-picker-controls__year-btn) {
  min-width: auto !important;
  padding: 4px 8px !important;
  height: 32px !important;
  font-size: 0.85rem;
}

/* Header (month/year text) */
:deep(.v-date-picker-controls__title) {
  font-size: 0.9rem !important;
  font-weight: bold;
}
</style>
