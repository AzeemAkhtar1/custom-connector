<template>
  <v-app-bar :elevation="14">
    <!-- Left section with navigation icon and title -->
    <template v-slot:prepend>
      <div>
        <v-app-bar-nav-icon icon="mdi-chevron-left"></v-app-bar-nav-icon>
        <span class="mx-2">Exit Builder</span> /
      </div>
    </template>

    <!-- Text field for connector name with reduced width and height -->
    <v-text-field
      v-model="internalConnectorName"
      class="px-3"
      placeholder="Untitled"
      style="width: 10px !important; height: 10px !important;"
    />

    <!-- Right section with action buttons -->
    <template v-slot:append>
      <v-btn icon="mdi-undo" @click="undoChange" :style="{ marginRight: '8px' }"></v-btn>
      <v-btn icon="mdi-redo" @click="redoChange" :style="{ marginRight: '8px' }"></v-btn>
      <v-btn icon="mdi-content-save-outline" :style="{ marginRight: '8px' }"></v-btn>
      <v-btn icon="mdi-publish" color="primary" :style="{ marginRight: '8px' }">Publish</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    connectorName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      internalConnectorName: this.connectorName,
      history: [],
      historyIndex: -1,
    };
  },
  watch: {
    // Watch for changes in the connectorName prop
    connectorName(newVal) {
      if (newVal !== this.internalConnectorName) {
        this.internalConnectorName = newVal;
        this.addToHistory(newVal);
      }
    },
    // Emit changes in the internalConnectorName data property
    internalConnectorName(newVal) {
      this.$emit('update:connectorName', newVal);
      this.addToHistory(newVal);
    }
  },
  methods: {
    // Method to add changes to history for undo/redo functionality
    addToHistory(value) {
      if (this.historyIndex < this.history.length - 1) {
        this.history.splice(this.historyIndex + 1);
      }
      this.history.push(value);
      this.historyIndex = this.history.length - 1;
    },
    // Method to undo changes
    undoChange() {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.internalConnectorName = this.history[this.historyIndex];
      }
    },
    // Method to redo changes
    redoChange() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.internalConnectorName = this.history[this.historyIndex];
      }
    }
  }
};
</script>

<style scoped>
</style>
