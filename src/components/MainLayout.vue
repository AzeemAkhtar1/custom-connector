<script setup>
// Import necessary Vue and Vuetify components
import { ref } from 'vue';
import LeftSidebar from './LeftSidebar.vue';
import MainContent from './MainContent.vue';
import AppBar from './AppBar.vue';
import RightSidebar from './RightSidebar.vue';

// Store the currently selected menu item and connector name
const selectedItem = ref('Global Configuration');
const connectorName = ref('Untitled');

</script>

<template>
  <v-app>
    <v-layout>
      <!-- AppBar component with v-model binding -->
      <AppBar v-model:connectorName="connectorName" />

      <!-- Left Sidebar with v-model binding and event handling -->
      <LeftSidebar v-model:connectorName="connectorName" @update-selected-item="selectedItem = $event" />

      <!-- Right navigation drawer -->
      <v-navigation-drawer location="right" style="margin-right: -10%; margin-top: -60px;" >
        <!-- <v-list>
          <v-list-item title="Drawer right"></v-list-item>
        </v-list> -->
        <RightSidebar />
      </v-navigation-drawer>

      <!-- Main content area -->
      <v-main style="min-height: 300px;">
        <MainContent :selected-item="selectedItem" />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
/* Add any additional styling if necessary */
</style>
