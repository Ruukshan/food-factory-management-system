<template>
  <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color" top>
    {{ snackbar.text }}

    <template #actions>
      <v-btn
        v-for="(action, i) in snackbar.actions"
        :key="i"
        text
        :color="action.color || 'white'"
        @click="action.onClick"
      >
        {{ action.label }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { snackbar } from "../helpers/utils/snackbar";
</script>
