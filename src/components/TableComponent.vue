<template>
    <v-data-table 
        :headers="headers"
        :items="products"
        >
        <template v-slot:item.actions="{ item }">
            <v-btn color="error" small @click="emit('delete-product', item)">Delete</v-btn>
        </template>
    </v-data-table>
</template>

<script setup>

const props = defineProps(['products']);
const emit = defineEmits(['delete-product']);

const headers = [
    { title: 'Product Name', key: 'name' },
    { title: 'Batch Number', key: 'batch' },
    { title: 'Production Date', key: 'date' },
    { title: 'Actions', key: 'actions' },
];

</script>