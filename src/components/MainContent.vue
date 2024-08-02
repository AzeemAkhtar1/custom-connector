<template>
    <v-container fluid>
      <v-row v-if="selectedItem === 'Global Configuration'">
        <v-col>
          <h4>Global Configuration</h4>
          <v-card class="py-4 px-4" elevation="2">
            <v-row class=" mt-4">
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
            </v-row>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- User Inputs Section -->
      <v-row v-if="selectedItem === 'User Inputs'">
        <v-col>
          <h4>User Inputs</h4>
          <p>User inputs will be asked to the end-user in order to set up the connector. Open the Testing values menu to fill these in for the Builder.</p>
          <v-btn color="primary" @click="showNewUserInputForm">
            <v-icon start>mdi-plus</v-icon>
            Add a new user input
          </v-btn>
  
          <v-row v-for="(input, index) in userInputs" :key="index">
            <v-col>
              <v-card class="my-2 py-2 px-4">
                <v-row>
                  <v-col>{{ input.name }}</v-col>
                  <v-col class="d-flex justify-end">
                    <v-icon @click="editUserInput(input)">mdi-cog</v-icon>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
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
  
      <!-- New User Input Dialog -->
      <v-dialog v-model="newUserInputDialogVisible" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">New User Input</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="newUserInputDialogVisible = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="createUserInput">
              <v-text-field v-model="newUserInput.name" label="Input Name" required></v-text-field>
              <v-text-field v-model="newUserInput.fieldId" label="Field ID" required></v-text-field>
              <v-text-field v-model="newUserInput.hint" label="Hint (Optional)"></v-text-field>
  
              <v-select v-model="newUserInput.type" :items="inputTypes" label="Type" required></v-select>
  
              <v-switch v-model="newUserInput.secret" label="Secret Field (Optional)"></v-switch>
              <v-switch v-model="newUserInput.required" label="Required Field (Optional)"></v-switch>
              <v-switch v-model="newUserInput.enableDefaultValue" label="Enable Default Value (Optional)"></v-switch>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="newUserInputDialogVisible = false">Cancel</v-btn>
            <v-btn color="primary" @click="createUserInput">{{ isEditing ? 'Save Changes' : 'Create' }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      
    </v-container>

  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedItem = ref('Global Configuration');
  const apiBaseUrl = ref('');
  const userOptionsVisible = ref(false);
  const newUserInputDialogVisible = ref(false);
  const isEditing = ref(false);
  
  const newUserInput = ref({
    name: '',
    fieldId: '',
    hint: '',
    type: '',
    secret: false,
    required: false,
    enableDefaultValue: false,
  });
  
  const inputTypes = ['String', 'Number', 'Integer', 'Array', 'Boolean', 'Enum', 'Date'];
  const userInputs = ref([]);
  
  const showUserOptions = () => {
    userOptionsVisible.value = true;
  };
  
  const insertApiKey = () => {
    apiBaseUrl.value = "{{ config['api_key'] }}";
    userOptionsVisible.value = false;
  };
  
  const showNewUserInputForm = () => {
    isEditing.value = false;
    newUserInputDialogVisible.value = true;
  };
  
  const createUserInput = () => {
    if (!isEditing.value) {
      userInputs.value.push({ ...newUserInput.value });
    }
    newUserInputDialogVisible.value = false;
  };
  
  const editUserInput = (input) => {
    Object.assign(newUserInput.value, input);
    isEditing.value = true;
    newUserInputDialogVisible.value = true;
  };
  </script>
  
  <style scoped>
  .v-card {
    background-color: #ffffff;
  }
  .v-text-field {
    margin-bottom: 16px;
  }
  </style>
  