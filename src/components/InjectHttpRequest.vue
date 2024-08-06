 <template>
 <!-- Show Inject Offset into Outgoing HTTP request  -->
 <v-col cols="12">
    <v-checkbox
      v-model="injectHttpOffset"
      label="Inject Offset into outgoing HTTP Request"
      @change="onInjectHttpOffsetToggle"
    />
  </v-col>

  <v-col cols="12" v-if="injectHttpOffset">
    <v-select
      v-model="injectInto"
      :items="injectIntoHttpOptions"
      label="Inject Into"
      @change="onInjectIntoChange"
    />

  <!-- If selected Inject into option is 'Header' so show this fields  -->
    <div v-if="injectInto === 'Header'">
      <v-text-field
      v-model="headerName"
      label="Header Name"
    />
    </div>

  <!-- If selected Inject into option is 'Query Parameter' so show this fields  -->
  <div v-if="injectInto === 'Query Parameter'">
      <v-text-field
      v-model="parameterName"
      label="Parameter Name"
    />
    </div>

  <!-- If selected Inject into option is 'Body Data (urlencoded form)' so show this fields  -->
  <div v-if="injectInto === 'Body Data (urlencoded form)'">
      <v-text-field
      v-model="keyName"
      label="Key Name"
    />
    </div>

    <!-- If selected Inject into option is 'Body JSON payload' so show this fields  -->
  <div v-if="injectInto === 'Body JSON payload'">
      <v-text-field
      v-model="keyName"
      label="Key Name"
    />
    </div>

  </v-col>
</template>


<script>
export default{
    data() {
        return {
            injectHttpOffset: false,
            injectInto: 'Header',
            headerName: '',
            parameterName: '',
            keyName: '',


        // Inject into Http Options array for showing a combobox
        injectIntoHttpOptions: [
          'Query Parameter',
          'Header',
          'Path',
          'Body Data (urlencoded form)',
          'Body JSON payload'
        ],

        onInjectHttpOffsetToggle() {
        if (!this.injectOffset) {
          this.injectInto = '';
          this.parameterName = '';
        }
      },

        }
    }
}

</script>

