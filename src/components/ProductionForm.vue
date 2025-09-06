<template>
  <v-container class="pa-6" max-width="700">
    <v-card elevation="4" class="rounded-lg">
      <v-card-title class="text-h6 text-center">
        Food Factory Management System – Production
      </v-card-title>

      <v-card-text>
        <!-- FORM -->
        <v-form ref="form" v-model="isValid">
          <v-text-field
            v-model="product.productName"
            label="Product Name"
            :rules="[rules.required]"
            clearable
          />
          <v-text-field
            v-model="product.batchNumber"
            label="Batch Number"
            :rules="[rules.required]"
            clearable
          />
          <v-text-field
            v-model="product.productionDate"
            label="Production Date"
            type="date"
            :rules="[rules.required]"
            clearable
          />

          <div class="d-flex justify-space-between mt-2">
            <v-btn color="green" @click="addProduct">Add</v-btn>
            <v-btn color="orange" @click="clearForm">Clear Form</v-btn>
          </div>
        </v-form>

        <!-- TABLE -->
        <v-table class="mt-6" density="comfortable">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Batch Number</th>
              <th>Production Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="index">
              <td>{{ item.productName }}</td>
              <td>{{ item.batchNumber }}</td>
              <td>{{ item.productionDate }}</td>
              <td>
                <v-btn color="red" size="small" @click="confirmDelete(index)">
                  Delete
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="blue" @click="submitToFirebase">Submit</v-btn>
      </v-card-actions>

      <!-- Snackbar for delete confirmation -->
      <v-snackbar v-model="snackbar.show" :timeout="4000" color="info" top>
        {{ snackbar.text }}

        <template #actions>
          <v-btn color="red" text @click="deleteConfirmed">Confirm</v-btn>
          <v-btn color="grey" text @click="cancelDelete">Cancel</v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const product = reactive({
  productName: "",
  batchNumber: "",
  productionDate: "",
});

const products = ref([]);
const isValid = ref(false);
const form = ref(null);
const snackbar = reactive({
  show: false,
  text: "",
  indexToDelete: null,
});

/* Validation */
const rules = {
  required: (v) =>
    (v !== null && v !== undefined && String(v).trim() !== "") ||
    "This field is required",
};

/* Local Storage load */
onMounted(() => {
  const saved = localStorage.getItem("products");
  if (saved) products.value = JSON.parse(saved);
});

const saveLocal = () => {
  localStorage.setItem("products", JSON.stringify(products.value));
};

/* Operations */
const addProduct = () => {
  // Validate form properly
  if (form.value) {
    form.value.validate(); // triggers validation, updates isValid
  }
  if (!isValid.value) return; // stop if form is invalid

  // Additional check to ensure no nulls, avoid saving empty strings
  if (
    !product.productName.trim() ||
    !product.batchNumber.trim() ||
    !product.productionDate.trim()
  )
    return;

  products.value.push({ ...product });
  saveLocal();
  clearForm();
};

const clearForm = () => {
  product.productName = "";
  product.batchNumber = "";
  product.productionDate = "";
  if (form.value) form.value.resetValidation();
};

/* Deletion with confirmation */
const confirmDelete = (index) => {
  snackbar.text = "Are you sure you want to delete this product?";
  snackbar.indexToDelete = index;
  snackbar.show = true;
};

const deleteConfirmed = () => {
  const index = snackbar.indexToDelete;
  if (index !== null && index >= 0 && index < products.value.length) {
    products.value.splice(index, 1);
    saveLocal();
  }
  snackbar.show = false;
  snackbar.indexToDelete = null;
};

const cancelDelete = () => {
  snackbar.show = false;
  snackbar.indexToDelete = null;
};

/* Submit to Firebase */
const submitToFirebase = async () => {
  try {
    for (const item of products.value) {
      await addDoc(collection(db, "production"), item);
    }
    alert("Data submitted to Firebase!");
    products.value = [];
    localStorage.removeItem("products");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
</script>
