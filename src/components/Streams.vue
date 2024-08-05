<template>
    <div>
      <v-list-item class="py-2 px-3">
        <v-row justify="center">
          <v-col class="d-flex align-center" cols="8">
            <v-list-item-title>STREAMS ({{ streams.length }})</v-list-item-title>
          </v-col>
          <v-col class="d-flex justify-end" cols="3">
            <v-btn icon x-small @click="openAddStreamDialog">
              <v-icon size="28px">mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
  
      <v-list-group
        v-for="(stream, index) in streams"
        :key="index"
        no-action
        sub-group
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title>{{ stream.name }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-group>
  
      <!-- Add Stream Dialog -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="11">
                <span class="text-h5">Add New Stream</span>
              </v-col>
              <v-col cols="1">
                <v-icon @click="closeDialog" class="mdi-close-box justify-right">mdi-close-box</v-icon>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addStream">
              <v-text-field v-model="newStream.name" label="Stream Name" required />
              <v-text-field v-model="newStream.url" label="URL" required />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="addStream">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Streams',
    props: {
      streams: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        dialog: false,
        newStream: { name: '', url: '' },
      };
    },
    methods: {
      openAddStreamDialog() {
        this.newStream = { name: '', url: '' };
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
      addStream() {
        if (this.newStream.name && this.newStream.url) {
          this.$emit('add-stream', { ...this.newStream });
          this.closeDialog();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for the Streams component here */
  </style>
  