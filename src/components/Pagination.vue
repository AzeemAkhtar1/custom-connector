<template>
    <v-container>

    <!-- Pagination checkbox -->
      <v-row>
        <v-col>
          <v-checkbox
            v-model="paginationEnabled"
            label="Pagination"
            @change="onPaginationToggle"
          />
        </v-col>
      </v-row>
  
      <!-- Fields to show if pagination checkbox is enabled -->
      <v-row v-if="paginationEnabled">
        <v-col cols="12">
          <v-select
            v-model="paginationStrategy"
            :items="strategies"
            label="Strategy"
            @change="onStrategyChange"
          />
        </v-col>



    <!-- If selected Strategy Option is Offset Increment -->
    <v-col cols="12" v-if="paginationStrategy === 'Offset Increment'">
            <div>
            <p>Limit <span style="color: grey; font-size: 10px; font-style: italic;">Optional</span></p>
                <v-text-field
                    v-model="limit"
                    type="number"
                    :error-messages="limitErrorMessages"
                    @input="validateLimit"
                />
            </div>
            
        <!-- Show Inject limit into HTTP outgoing request (if Limit>0)  -->
            <v-checkbox
                v-if="limit > 0"
                    v-model="injectLimitHttp"
                    label="Inject Limit into outgoing HTTP Request"
                />

                <div v-if="injectLimitHttp">
                    <v-select
                        v-model="injectLimitIntoHttp"
                        :items="injectLimitIntoHttpOptions"
                        label="Inject Into"
                        @change="onInjectIntoChange"
                    />

                    <!-- If selected Inject into option is 'Header' so show this fields  -->
                    <div v-if="injectLimitIntoHttp === 'Header'">
                        <v-text-field
                        v-model="headerName"
                        label="Header Name"
                        />
                    </div>

                    <!-- If selected Inject into option is 'Query Parameter' so show this fields  -->
                    <div v-if="injectLimitIntoHttp === 'Query Parameter'">
                        <v-text-field
                        v-model="parameterName"
                        label="Parameter Name"
                        />
                    </div>

                    <!-- If selected Inject into option is 'Body Data (urlencoded form)' so show this fields  -->
                    <div v-if="injectLimitIntoHttp === 'Body Data (urlencoded form)'">
                        <v-text-field
                        v-model="keyName"
                        label="Key Name"
                        />
                    </div>

                    <!-- If selected Inject into option is 'Body JSON payload' so show this fields  -->
                    <div v-if="injectLimitIntoHttp === 'Body JSON payload'">
                        <v-text-field
                        v-model="keyName"
                        label="Key Name"
                        />
                    </div>

                </div>
        



    <!-- Show Inject Offset into Outgoing HTTP request  -->
        <v-col cols="12">
          <v-checkbox
            v-model="injectOffsetHttp"
            label="Inject Offset into outgoing HTTP Request"
            @change="onInjectOffsetHttpToggle"
          />
        </v-col>

        <v-col cols="12" v-if="injectOffsetHttp">
          <v-select
            v-model="injectOffsetIntoHttp"
            :items="injectOffsetIntoHttpOptions"
            label="Inject Into"
            @change="onInjectIntoChange"
          />

        <!-- If selected Inject into option is 'Header' so show this fields  -->
          <div v-if="injectOffsetIntoHttp === 'Header'">
            <v-text-field
            v-model="headerName"
            label="Header Name"
          />
          </div>

        <!-- If selected Inject into option is 'Query Parameter' so show this fields  -->
        <div v-if="injectOffsetIntoHttp === 'Query Parameter'">
            <v-text-field
            v-model="parameterName"
            label="Parameter Name"
          />
          </div>

        <!-- If selected Inject into option is 'Body Data (urlencoded form)' so show this fields  -->
        <div v-if="injectOffsetIntoHttp === 'Body Data (urlencoded form)'">
            <v-text-field
            v-model="keyName"
            label="Key Name"
          />
          </div>

          <!-- If selected Inject into option is 'Body JSON payload' so show this fields  -->
        <div v-if="injectOffsetIntoHttp === 'Body JSON payload'">
            <v-text-field
            v-model="keyName"
            label="Key Name"
          />
          </div>

        </v-col>


    <!-- Toggle Option for the Inject on First Request -->
        <v-col cols="12">
          <v-switch
            v-model="injectOnFirstRequest"
            label="Inject on first request"
          />
        </v-col>
    </v-col>

      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        paginationEnabled: false,
        paginationStrategy: 'Offset Increment',
        limit: null,
        injectOffsetHttp: true,
        injectOffsetIntoHttp: 'Query parameter',
        headerName: '',
        parameterName: '',
        keyName: '',
        injectOnFirstRequest: false,

        // Inject Limit into Http
        injectLimitHttp: false,
        limitErrorMessages: '',
        injectLimitIntoHttp: 'Query parameter',

        // Inject Limit into HTTP Options
        injectLimitIntoHttpOptions: [
          'Query Parameter',
          'Header',
          'Body Data (urlencoded form)',
          'Body JSON payload'
        ],

        strategies: [
          'Offset Increment',
          'Page Increment',
          'Cursor Pagination',
        ],

        // Inject Offset into HTTP options
        injectOffsetIntoHttpOptions: [
          'Query Parameter',
          'Header',
          'Path',
          'Body Data (urlencoded form)',
          'Body JSON payload'
        ],

        showLimitField: false,
        showParameterNameField: false,
      };
    },
    methods: {
      onPaginationToggle() {
        if (!this.paginationEnabled) {
          this.resetFields();
        }
      },
      onStrategyChange() {
        this.showLimitField = this.paginationStrategy === 'Offset Increment';
      },
      onInjectOffsetHttpToggle() {
        if (!this.injectOffset) {
          this.injectInto = '';
          this.parameterName = '';
        }
      },
      onInjectIntoChange() {
        this.showParameterNameField = !!this.injectInto;
      },
      resetFields() {
        this.paginationStrategy = '';
        this.limit = null;
        this.injectOffset = false;
        this.injectInto = '';
        this.parameterName = '';
        this.injectOnFirstRequest = false;
        this.showLimitField = false;
        this.showParameterNameField = false;
      },


      validateLimit() {
      if (this.limit < 0) {
        this.limitErrorMessages = 'Limit cannot be negative';
      } else {
        this.limitErrorMessages = '';
      }
    },


    },
  };
  </script>
  
  <style scoped>
  .v-container {
    padding: 20px;
  }
  .v-checkbox,
  .v-select,
  .v-text-field,
  .v-switch {
    margin-bottom: 16px;
  }
  </style>
  