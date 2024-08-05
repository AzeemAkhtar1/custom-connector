<template>
  <v-app>
    <v-container>
      <v-row justify="space-between" align="center">
        <v-btn icon :disabled="true">
          <v-icon>mdi-account</v-icon>
          Testing values
        </v-btn>
        <v-btn icon @click="openDialog">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-row>
      <v-dialog v-model="dialog" max-width="600px">
        <AdvancedSettings @close="closeDialog" />
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import AdvancedSettings from './AdvancedSettings.vue';

export default {
  components: {
    AdvancedSettings,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin: 10px;
}
</style>
