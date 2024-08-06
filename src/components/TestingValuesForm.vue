<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="apiKey"
            label="API Key"
            :type="showApiKey ? 'text' : 'password'"
            append-icon="mdi-eye"
            @click:append="showApiKey = !showApiKey"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-right">
          <v-btn color="primary" @click="save">Save</v-btn>
          <v-btn color="secondary" @click="close">Cancel</v-btn>
          <v-btn color="error" @click="reset">Reset</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    props: {
      apiKey: String,
    },
    data() {
      return {
        showApiKey: false,
      };
    },
    methods: {
      save() {
        this.$emit('save', this.apiKey);
      },
      close() {
        this.$emit('close');
      },
      reset() {
        this.$emit('reset');
      },
    },
  };
  </script>
  
  <style scoped>
  .v-btn {
    margin-left: 10px;
  }
  </style>
  