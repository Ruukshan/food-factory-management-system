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
                :rules="[rules.required]"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
                v-model="batchNumber"
                label="Batch Number"
                outlined
                dense
                required
                :rules="[rules.batchNumberRule]"

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
                :rules="[rules.required]"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end mb-4">
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
          <tr v-for="(p, index) in localProducts" :key="index">
            <td>{{ p.productName }}</td>
            <td>{{ p.batchNumber }}</td>
            <td>{{ p.productionDate }}</td>
            <td>
              <Button
                  label="Delete"
                  color="red"
                  @click="confirmDelete(index)"
              />
            </td>
          </tr>
          </tbody>
        </v-table>

        <div class="d-flex justify-center mt-6">
          <Button
              v-if="!submitting"
              label="Submit"
              color="primary"
              @click="submitData"
          />
          <span v-else>Submitting...</span>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script setup>
import { ref, watch } from "vue";
import { db } from "../services/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import Button from "../components/Button.vue";

const productName = ref(null);
const batchNumber = ref(null);
const productionDate = ref(null);
const submitting = ref(false);


const rules = {
  required: (v) => !!v || "This field is required",
  batchNumberRule: (v) => /^B-\d{3}$/i.test(v) || "Batch Number must be in format B-001",
};


const localProducts = ref(JSON.parse(localStorage.getItem("products") || "[]"));


watch(localProducts, (newVal) => {
  localStorage.setItem("products", JSON.stringify(newVal));
}, { deep: true });

//Add product
const addProduct = () => {
  if (!productName.value || !batchNumber.value || !productionDate.value) {
    alert("Please fill all fields");
    return;
  }

  localProducts.value.push({
    productName: productName.value,
    batchNumber: batchNumber.value,
    productionDate: productionDate.value,
  });

  productName.value = "";
  batchNumber.value = "";
  productionDate.value = "";


};

//Delete product
const confirmDelete = (index) => {
  if (confirm("Are you sure you want to delete this product?")) {
    localProducts.value.splice(index, 1);
    alert("Product deleted successfully!");
  }
};

//Submit
const submitData = async () => {
  if (localProducts.value.length === 0) {
    alert("No products to submit!");
    return;
  }

  submitting.value = true;

  try {
    const batchCollection = collection(db, "products");
    for (const p of localProducts.value) {
      await addDoc(batchCollection, p);
    }
    alert("Products submitted successfully!");


    localProducts.value = [];
  } catch (error) {
    console.error("Error submitting products:", error);
    alert("Failed to submit products. Try again!");
  } finally {
    submitting.value = false;
  }
};
</script>
