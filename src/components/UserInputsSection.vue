<!-- UserInputsSection.vue -->
<template>
    <v-row>
      <v-col>
        <h4>User Inputs</h4>
        <p>
          User inputs will be asked to the end-user in order to set up the
          connector. Open the Testing values menu to fill these in for the
          Builder.
        </p>
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
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const userInputs = ref([]);
  const isEditing = ref(false);
  const newUserInputDialogVisible = ref(false);
  
  const showNewUserInputForm = () => {
    isEditing.value = false;
    newUserInputDialogVisible.value = true;
  };
  
  const editUserInput = (input) => {
    // Emit an event to edit the user input
    $emit('edit-user-input', input);
    newUserInputDialogVisible.value = true;
  };
  </script>
  