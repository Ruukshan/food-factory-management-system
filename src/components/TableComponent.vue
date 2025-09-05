<template>
    <v-table class="custom-table">
        <thead>
            <tr>
                <th v-for="header in headers" :key="header.key" class="text-left">
                    {{ header.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in products" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.batch }}</td>
                <td>{{ item.date }}</td>
                <td>
                    <v-btn color="error" small @click="emit('delete-product', item)">Delete</v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
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

<style scoped>
.custom-table th {
  font-weight: bold !important;
  color: #6200EE !important;
  padding: 12px !important;
  background-color: #E0F7FA !important;
}

.custom-table td {
  padding: 12px !important;
  border-bottom: 1px solid #E0E0E0 !important;
}

.custom-table tr:nth-child(even) {
  background-color: #F5F5F5 !important;
}

.custom-table tr:hover {
  background-color: #BBDEFB !important;
}
</style>