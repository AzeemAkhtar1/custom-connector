<template>
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
        <v-row>
          <v-col class="d-flex" cols="auto">
            <v-icon>mdi-tune</v-icon>
          </v-col>
          <v-col class="d-flex" cols="auto">
            <v-list-item-title>Global Configuration</v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Streams Component -->
      <Streams :streams="streams" @add-stream="addStream" />

    </v-list>
</template>

<script>
import Streams from './Streams.vue'; // Import the updated Streams component

export default {
  name: 'LeftSidebar',
  components: {
    Streams,
  },
  props: {
    connectorName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      internalConnectorName: this.connectorName,
      selectedItem: 'Global Configuration',
      streams: [],
      userInputs: [],
    };
  },
  watch: {
    connectorName(newVal) {
      if (newVal !== this.internalConnectorName) {
        this.internalConnectorName = newVal;
      }
    },
    internalConnectorName(newVal) {
      this.$emit('update:connectorName', newVal);
    },
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
    // Method to add a new stream
    addStream(newStream) {
      this.streams.push(newStream);
    },
  },
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
