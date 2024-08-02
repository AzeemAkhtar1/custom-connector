<template>
    <v-card>
      <v-card-title>New User Input</v-card-title>
      <v-card-text>
        <v-container>
          <!-- Container for API Base URL -->
          <v-row>
            <v-col cols="12">
              <v-text-field label="API Base URL" v-model="apiBaseUrl"></v-text-field>
            </v-col>
          </v-row>
  
          <!-- Container for Auth Method -->
          <v-row>
            <v-col cols="12">
              <v-select
                label="Auth Method"
                :items="authMethods"
                v-model="selectedAuthMethod"
                @change="handleAuthMethodChange"
              ></v-select>
            </v-col>
          </v-row>
  
          <!-- Additional fields based on Auth Method (to be implemented) -->
          <v-row v-if="additionalFields.length > 0">
            <v-col v-for="(field, index) in additionalFields" :key="index" cols="12">
              <v-text-field :label="field.label" v-model="field.value"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  const apiBaseUrl = ref('');
  const authMethods = ['None', 'Basic', 'OAuth', 'API Key'];
  const selectedAuthMethod = ref(authMethods[0]);
  const additionalFields = reactive([]);
  
  // Handle changes in the Auth Method selection
  const handleAuthMethodChange = (method) => {
    additionalFields.length = 0; // Clear previous fields
  
    if (method === 'Basic') {
      additionalFields.push({ label: 'Username', value: '' });
      additionalFields.push({ label: 'Password', value: '' });
    } else if (method === 'OAuth') {
      additionalFields.push({ label: 'Client ID', value: '' });
      additionalFields.push({ label: 'Client Secret', value: '' });
    } else if (method === 'API Key') {
      additionalFields.push({ label: 'API Key', value: '' });
    }
  };
  
  const submitForm = () => {
    // Submit form logic here
    console.log('API Base URL:', apiBaseUrl.value);
    console.log('Selected Auth Method:', selectedAuthMethod.value);
    console.log('Additional Fields:', additionalFields);
  
    // Close the popup (emitting close event)
    this.$emit('close');
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if necessary */
  </style>
  