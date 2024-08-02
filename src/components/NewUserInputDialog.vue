<!-- NewUserInputDialog.vue -->
<template>
    <v-dialog v-model="visible" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Edit User Input' : 'New User Input' }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form @submit.prevent="saveUserInput">
            <v-text-field
              v-model="userInput.name"
              label="Input Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="userInput.fieldId"
              label="Field ID"
              required
            ></v-text-field>
            <v-text-field v-model="userInput.hint" label="Hint (Optional)"></v-text-field>
  
            <v-select v-model="userInput.type" :items="inputTypes" label="Type" required></v-select>
  
            <v-switch v-model="userInput.secret" label="Secret Field (Optional)"></v-switch>
            <v-switch v-model="userInput.required" label="Required Field (Optional)"></v-switch>
            <v-switch v-model="userInput.enableDefaultValue" label="Enable Default Value (Optional)"></v-switch>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveUserInput">{{ isEditing ? 'Save Changes' : 'Create' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const visible = ref(false);
  const isEditing = ref(false);
  const userInput = ref({
    name: '',
    fieldId: '',
    hint: '',
    type: '',
    secret: false,
    required: false,
    enableDefaultValue: false,
  });
  const inputTypes = ['String', 'Number', 'Integer', 'Array', 'Boolean', 'Enum', 'Date'];
  
  watch(() => visible.value, (newVal) => {
    if (!newVal) {
      resetForm();
    }
  });
  
  const resetForm = () => {
    userInput.value = {
      name: '',
      fieldId: '',
      hint: '',
      type: '',
      secret: false,
      required: false,
      enableDefaultValue: false,
    };
    isEditing.value = false;
  };
  
  const closeDialog = () => {
    visible.value = false;
  };
  
  const saveUserInput = () => {
    $emit('save-user-input', { ...userInput.value, isEditing: isEditing.value });
    visible.value = false;
  };
  </script>
  