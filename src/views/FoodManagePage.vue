<template>
  <v-container class="pa-6">

    <v-card elevation="4">
      <v-card-title
          class="text-center"
          style="background-color: #1976d2; color: white; font-weight: bold;"
      >
        Food Factory Management System – Production
      </v-card-title>

      <v-card-text>

        <v-row class="mt-2" align="center">
          <v-col cols="12" sm="4">
            <v-text-field
                v-model="productName"
                label="Product Name"
                outlined
                dense
                required
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
                v-model="batchNumber"
                label="Batch Number"
                outlined
                dense
                required
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
                v-model="productionDate"
                label="Production Date"
                type="date"
                outlined
                dense
                required
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end">
          <Button label="Add" color="green" @click="addProduct" />
        </div>


        <v-table>
          <thead style="background-color: #E3F2FD;">
          <tr>
            <th class="text-left">Product Name</th>
            <th class="text-left">Batch Number</th>
            <th class="text-left">Production Date</th>
            <th class="text-left">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(p, index) in products" :key="index">
            <td>{{ p.productName }}</td>
            <td>{{ p.batchNumber }}</td>
            <td>{{ p.productionDate }}</td>
            <td>
              <Button label="Delete" color="red" @click="deleteProduct(index)"></Button>
            </td>
          </tr>
          </tbody>
        </v-table>

        <div class="d-flex justify-center mt-6">
          <Button label="Submit" color="primary" @click="submitData"></Button>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import Button from "../components/Button.vue";

const productName = ref("");
const batchNumber = ref("");
const productionDate = ref("");

const products = ref([]);

const addProduct = () => {
  if (!productName.value || !batchNumber.value || !productionDate.value) return;

  products.value.push({
    productName: productName.value,
    batchNumber: batchNumber.value,
    productionDate: productionDate.value,
  });


  productName.value = "";
  batchNumber.value = "";
  productionDate.value = "";
};

const deleteProduct = (index) => {
  products.value.splice(index, 1);
};

const submitData = () => {
  console.log("Submitting Data:", products.value);
  alert("Submitted successfully!");
};
</script>

