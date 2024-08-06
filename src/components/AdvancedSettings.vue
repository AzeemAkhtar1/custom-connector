<template>
    <v-card>
      <v-card-title>
        Advanced Settings
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="formValues.maxRecords"
            label="Maximum number of records"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="formValues.maxPages"
            label="Maximum number of pages"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="formValues.maxPartitions"
            label="Maximum number of partitions"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="formValues.inputState"
            label="Input state"
            type="number"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" text @click="resetForm">Reset</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="saveChanges">Save changes</v-btn>
        <v-btn text @click="$emit('close')">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formValues: {
          maxRecords: 1000,
          maxPages: 5,
          maxPartitions: 5,
          inputState: 1,
        },
      }
    },
    methods: {
      resetForm() {
        this.formValues = {
          maxRecords: 1000,
          maxPages: 5,
          maxPartitions: 5,
          inputState: 1,
        }
      },
      saveChanges() {
        // Save changes logic here
        console.log('Form values saved:', this.formValues)
        this.$emit('close')
      },
    },
  }
  </script>
  
  <style>
  .v-btn {
    margin: 10px;
  }
  </style>
   