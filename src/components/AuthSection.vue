<!-- AuthSection.vue -->
<template>
    <v-row>
      <v-col>
        <v-text-field
          v-model="apiBaseUrl"
          label="API Base URL"
          outlined
          dense
        >
          <template v-slot:append>
            <v-icon @click="showUserOptions">mdi-account</v-icon>
          </template>
        </v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-model="authMethod"
          :items="authMethods"
          label="Authentication Method"
          outlined
          dense
          @change="handleAuthMethodChange"
        />
      </v-col>
  
      <!-- Additional Container for different options -->
      <v-row v-if="isAdditionalContainerVisible">
        <v-col>
          <v-card class="py-2 px-4 my-2">
            <v-list>
              <v-list-item title="Additional Configuration" />
              <!-- Add additional configuration fields here if necessary -->
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  
    <!-- User Options Popup -->
    <v-menu v-model="userOptionsVisible" offset-y>
      <v-list>
        <v-list-item @click="insertApiKey">
          <v-list-item-title>API Key</v-list-item-title>
        </v-list-item>
        <v-list-item @click="showNewUserInputForm">
          <v-icon>mdi-plus</v-icon>
          <v-list-item-title>New User Input</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const apiBaseUrl = ref('');
  const authMethod = ref('No Auth');
  const authMethods = ['No Auth', 'Basic Auth', 'OAuth'];
  const isAdditionalContainerVisible = ref(false);
  const userOptionsVisible = ref(false);
  
  const handleAuthMethodChange = (newMethod) => {
    isAdditionalContainerVisible.value = newMethod !== 'No Auth';
  };
  
  const showUserOptions = () => {
    userOptionsVisible.value = true;
  };
  
  const insertApiKey = () => {
    apiBaseUrl.value = "{{ config['api_key'] }}";
    userOptionsVisible.value = false;
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if necessary */
  </style>
  