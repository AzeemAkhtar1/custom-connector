<template>
  <v-navigation-drawer app permanent width="250">
    <v-list dense>
      <!-- Connector Name Input -->
      <v-list-item class="py-2 px-3">
        <v-text-field
          v-model="internalConnectorName"
          placeholder="Untitled"
          dense
          hide-details
        />
      </v-list-item>

      <v-divider></v-divider>

      <!-- Global Configuration -->
      <v-list-item
        :class="{ 'grey-background': isActive('Global Configuration') }"
        @click="selectItem('Global Configuration')"
      >
        <v-icon start>mdi-tune</v-icon>
        <v-list-item-title>Global Configuration</v-list-item-title>
      </v-list-item>

      <!-- User Inputs -->
      <v-list-item
        :class="{ 'grey-background': isActive('User Inputs') }"
        @click="selectItem('User Inputs')"
      >
        <v-icon start>mdi-account</v-icon>
        <v-list-item-title>User Inputs ({{ userInputs.length }})</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Streams Section -->
      <v-list-item class="py-2 px-3">
        <v-list-item-title class="text-subtitle-2">STREAMS ({{ streams.length }})</v-list-item-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openAddStreamDialog">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-list-item>

      <!-- Stream Items -->
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
    </v-list>

    <!-- Add Stream Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Stream</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addStream">
            <v-text-field v-model="newStream.name" label="Stream Name" required></v-text-field>
            <v-text-field v-model="newStream.url" label="URL" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addStream">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'LeftSidebar',
  props: {
    connectorName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      internalConnectorName: this.connectorName,
      selectedItem: 'Global Configuration',
      dialog: false,
      newStream: { name: '', url: '' },
      streams: [],
      userInputs: []
    };
  },
  watch: {
    // Watch for changes in the connectorName prop
    connectorName(newVal) {
      if (newVal !== this.internalConnectorName) {
        this.internalConnectorName = newVal;
      }
    },
    // Emit changes in the internalConnectorName data property
    internalConnectorName(newVal) {
      this.$emit('update:connectorName', newVal);
    }
  },
  methods: {
    // Method to select an item
    selectItem(item) {
      this.selectedItem = item;
    },
    // Method to check if an item is active
    isActive(item) {
      return this.selectedItem === item;
    },
    // Method to open the dialog to add a new stream
    openAddStreamDialog() {
      this.newStream = { name: '', url: '' };
      this.dialog = true;
    },
    // Method to add a new stream
    addStream() {
      if (this.newStream.name && this.newStream.url) {
        this.streams.push({ ...this.newStream });
        this.dialog = false;
      }
    }
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  background-color: #ffffff;
}
.text-grey-500 {
  color: #9e9e9e;
}
.grey-background {
  background-color: #f5f5f5;
}
.v-list-item:hover {
  background-color: #f5f5f5;
}
</style>
