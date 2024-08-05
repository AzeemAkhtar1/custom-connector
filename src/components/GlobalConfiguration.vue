<template>
    <v-row>
      <v-col>
        <h4>Global Configuration</h4>
        <v-card class="py-4 px-4" elevation="2">
          <v-row class="mt-4">
            <v-col>
              <v-text-field
                :value="apiBaseUrl"
                @input="$emit('update:apiBaseUrl', $event)"
                label="API Base URL"
                outlined
                dense
              >
                <template v-slot:append>
                  <v-icon @click="$emit('showUserOptions')">mdi-account</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    props: {
      apiBaseUrl: {
        type: String,
        default: ''
      }
    },
    emits: ['update:apiBaseUrl', 'showUserOptions']
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
  