<!-- <template>
    <v-btn :disabled="!isConditionMet"  color="primary">
    <v-icon left>mdi-user</v-icon>
    Testing Values
  </v-btn>
</template>
 -->


<template>
    <v-navigation-drawer
      v-model="drawer"
      width="300"
      right
    >
      
        <v-btn :disabled="!isConditionMet"  color="primary">
            <v-icon left>mdi-account</v-icon>
            Testing Values
        </v-btn>
        <!-- <v-list-item @click="showSettings"> -->
          <!-- <v-list-item-icon> -->
            <v-icon @click="showSettings" class="ml-7">mdi-cog</v-icon>
          <!-- </v-list-item-icon> -->
        <!-- </v-list-item> -->
      
  
      <v-divider></v-divider>
  
      <!-- <v-card flat class="mt-5">
        <v-btn :disabled="!isConditionMet"  color="primary">
            <v-icon left>mdi-account</v-icon>
            Testing Values
        </v-btn>
      </v-card> -->
  
      <v-card flat class="mt-5">
        <v-card-title>Add a stream to test it here</v-card-title>
        <v-btn icon @click="addStream">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card>
  
      <v-dialog v-model="isSettingsModalVisible" max-width="500px">
        <v-card>
          <v-card-title>Advanced Settings</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Maximum number of records"
                v-model="settings.maxRecords"
                type="number"
              ></v-text-field>
              <v-text-field
                label="Maximum number of pages"
                v-model="settings.maxPages"
                type="number"
              ></v-text-field>
              <v-text-field
                label="Maximum number of partitions"
                v-model="settings.maxPartitions"
                type="number"
              ></v-text-field>
              <v-text-field
                label="Input state"
                v-model="settings.inputState"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" text @click="resetSettings">Reset</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="saveSettings">Save changes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    name: 'RightSidebar',
    data() {
      return {
        drawer: false,
        isSettingsModalVisible: false,
        settings: {
          maxRecords: 1000,
          maxPages: 5,
          maxPartitions: 5,
          inputState: 1
        }
      };
    },
    methods: {
      showSettings() {
        this.isSettingsModalVisible = true;
      },
      resetSettings() {
        this.settings = {
          maxRecords: 1000,
          maxPages: 5,
          maxPartitions: 5,
          inputState: 1
        };
      },
      saveSettings() {
        console.log('Settings saved:', this.settings);
        this.isSettingsModalVisible = false;
      },
      addStream() {
        console.log('Add stream clicked');
      }
    }
  };
  </script>
  
  <style scoped>
  .mt-5 {
    margin-top: 20px;
  }
  </style>
  