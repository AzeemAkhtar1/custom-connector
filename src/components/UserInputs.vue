<template>
    <v-row v-if="selectedItem === 'User Inputs'">
      <v-col>
        <h4>User Inputs</h4>
        <p>
          User inputs will be asked to the end-user in order to set up the connector.
          Open the Testing values menu to fill these in for the Builder.
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
            <v-text-field
              v-model="newUserInput.name"
              label="Input Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUserInput.fieldId"
              label="Field ID"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUserInput.hint"
              label="Hint (Optional)"
            ></v-text-field>
  
            <v-select
              v-model="newUserInput.type"
              :items="inputTypes"
              label="Type"
              required
            ></v-select>
  
            <v-switch
              v-model="newUserInput.secret"
              label="Secret Field (Optional)"
            ></v-switch>
            <v-switch
              v-model="newUserInput.required"
              label="Required Field (Optional)"
            ></v-switch>
            <v-switch
              v-model="newUserInput.enableDefaultValue"
              label="Enable Default Value (Optional)"
            ></v-switch>
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
  </template>
  
  <script>
  export default {
    props: {
      selectedItem: String,
      userInputs: Array,
      inputTypes: Array,
    },
    data() {
      return {
        newUserInputDialogVisible: false,
        isEditing: false,
        newUserInput: {
          name: '',
          fieldId: '',
          hint: '',
          type: '',
          secret: false,
          required: false,
          enableDefaultValue: false,
        },
      };
    },
    methods: {
      // Show new user input form
      showNewUserInputForm() {
        this.isEditing = false;
        this.newUserInputDialogVisible = true;
      },
  
      // Create new user input or save changes
      createUserInput() {
        if (!this.isEditing) {
          this.$emit('create-user-input', { ...this.newUserInput });
        }
        this.newUserInputDialogVisible = false;
      },
  
      // Edit existing user input
      editUserInput(input) {
        Object.assign(this.newUserInput, input);
        this.isEditing = true;
        this.newUserInputDialogVisible = true;
      },
    },
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
  