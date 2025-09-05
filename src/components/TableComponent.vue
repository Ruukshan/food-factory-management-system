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
  font-weight: bold;
  color: #212121;
  background-color: #71d5e2;
  border-right: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  padding: 12px;
  text-align: center;
}

.custom-table td {
  padding: 8px;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #E0E0E0;
  border-right: 1px solid #E0E0E0;
}

</style>