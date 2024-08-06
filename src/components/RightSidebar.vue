<template>
  <!-- <v-app>  -->
    <v-container> 
      <v-row justify="space-between">
        <v-btn :disabled="true">
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

      <ApiStatusTabs />

    </v-container>
  <!--  </v-app> -->
</template>

<script>
import AdvancedSettings from './AdvancedSettings.vue'
import ApiStatusTabs from './ApiStatusTabs.vue';

export default {
  components: {
    AdvancedSettings,
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    handleAuthMethodChange(selectedAuthMethod) {
    this.isButtonDisabled = selectedAuthMethod === 'No Auth';
    console.log('Auth method changed in sidebar:', selectedAuthMethod);
  },
  },
}
</script>

<style>
</style>
