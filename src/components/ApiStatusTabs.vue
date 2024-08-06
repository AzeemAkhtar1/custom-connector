<template>
    <v-sheet color="#023C83" elevation="3" rounded="lg">
      <v-tabs
        v-model="tab"
        :items="tabs"
        align-tabs="center"
        color="white"
        height="70"
        slider-color="#f78166"
      >
        <template v-slot:tab="{ item }">
          <v-tab
            :prepend-icon="item.icon"
            :text="item.text"
            :value="item.value"
            class="text-none"
          ></v-tab>
        </template>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <!-- Render only the content for the selected tab -->
        <v-tab-item v-for="item in tabs" :key="item.value" :value="item.value">
          <template v-if="tab === item.value">
            <v-sheet class="pa-4" color="#0d1117" elevation="2" rounded="lg">
              <p>{{ getContent(item.value) }}</p>
            </v-sheet>
          </template>
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </template>
  
  <script>
  export default {
    data() {
        
      return {
        tab: 'tab-1',

        tabs: [
          {
            icon: 'mdi-file-document',
            text: 'Records',
            value: 'tab-1',
          },
          {
            icon: 'mdi-send',
            text: 'Request',
            value: 'tab-2',
          },
          {
            icon: 'mdi-reply-all',
            text: 'Response',
            value: 'tab-3',
          },
          {
            icon: 'mdi-database',
            text: 'State',
            value: 'tab-4',
          },
        ],


        // Variables to store API response
            recordsContent: 'Content for Records tab',
            requestContent: 'Content for Request tab',
            responseContent: 'Content for Response tab',
            stateContent: 'Content for State tab'

      };
    },
    methods: {
        getContent(tabValue) {
      switch (tabValue) {
        case 'tab-1':
          return this.recordsContent;
        case 'tab-2':
          return this.requestContent;
        case 'tab-3':
          return this.responseContent;
        case 'tab-4':
          return this.stateContent;
        default:
          return 'Default content';
      }
    },
        // return content[tabValue] || 'Default content';
      },
    };
  </script>
  