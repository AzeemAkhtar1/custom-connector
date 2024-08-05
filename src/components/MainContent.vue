<template>
  <v-container fluid>
    <!-- Global Configuration Section -->
    <v-row v-if="selectedItem === 'Global Configuration'">
      <v-col>
        <h4>Global Configuration</h4>
        <v-card class="py-4 px-4" elevation="2">
          <v-row class="mt-4">
            <v-col>
              <v-text-field
                v-model="apiBaseUrl"
                label="API Base URL"
                outlined
                dense
              >
                <template v-slot:append>
                  <v-icon @click="showUserOptions">mdi-account</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Authentication Method Section -->
    <v-row v-if="selectedItem === 'Global Configuration'">
      <v-col>
        <v-card class="py-4 px-4" elevation="2">
          <v-row class="mt-4">
            <v-col>
              <p>Authentication</p>
              <v-combobox
                v-model="selectedAuthMethod"
                label="Method"
                :items="authMethods"
                @change="onAuthMethodChange"
              ></v-combobox>

            <!-- Conditionally Rendered Input Fields Based on Selected Authentication Method -->

            <!-- If Selected Method is API KEY -->
              <template v-if="selectedAuthMethod === 'API Key'">
                <p>Inject Into</p>
                <v-combobox
                  v-model="selectedApiKeyMethod"
                  :items="apiKeyMethods"
                  @change="onApiKeyMethodChange"
              ></v-combobox>

              <div v-if="selectedApiKeyMethod === 'Header'"> 
                <p>Header Name</p>
                <v-text-field
                  v-model="headerName"
                  outlined
                  dense
                ></v-text-field>
              </div>

              <div v-if="selectedApiKeyMethod === 'Query Parameter'"> 
                <p>Parameter Name</p>
                <v-text-field
                  v-model="parameterName"
                  outlined
                  dense
                ></v-text-field>
              </div>

              <div v-if="selectedApiKeyMethod === 'Body Data (urlencoded form)'"> 
                <p>Key Name</p>
                <v-text-field
                  v-model="bodyData"
                  outlined
                  dense
                ></v-text-field>
              </div>

              <div v-if="selectedApiKeyMethod === 'Body JSON Payload'"> 
                <p>Key Name</p>
                <v-text-field
                  v-model="bodyJsonPayload"
                  outlined
                  dense
                ></v-text-field>
              </div>

              </template>

            <!-- If Selected Method is Bearer -->
              <template v-if="selectedAuthMethod === 'Bearer'">
                <v-text-field
                  v-model="bearerToken"
                  label="Bearer Token"
                  outlined
                  dense
                ></v-text-field>
              </template>

            <!-- If Selected Method is Basic HTTP -->
              <template v-if="selectedAuthMethod === 'Basic HTTP'">
                <v-text-field
                  v-model="username"
                  label="Username"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  outlined
                  dense
                ></v-text-field>
              </template>


            <!-- If Selected Method is OAUTH -->
              <template v-if="selectedAuthMethod === 'OAuth'">
                <p>Token Refresh Endpoint</p>
                <v-text-field
                  v-model="tokenRefreshEndpoint"
                  outlined
                  dense
                ></v-text-field>

                <p>Grant Type</p>
                <v-combobox
                  v-model="selectedOAuthGrantMethod"
                  :items="oauthGrantMethods"
                  @change="onOAuthMethodChange"
              ></v-combobox>

              <div v-if = "selectedOAuthGrantMethod === 'refresh_endpoint'">
                <v-text-field
                  v-model="clientId"
                  label="Client Id"
                  outlined
                  dense
                ></v-text-field>

                <v-text-field
                  v-model="clientSecret"
                  label="Client Secret"
                  type="password"
                  outlined
                  dense
                ></v-text-field>

                <v-text-field
                  v-model="refresh_token"
                  label="Refresh Token"
                  outlined
                  dense
                ></v-text-field>
              </div>

              <div v-if="selectedOAuthGrantMethod === 'client_credentials'">
                <v-text-field
                  v-model="clientId"
                  label="Client Id"
                  outlined
                  dense
                ></v-text-field>

                <v-text-field
                  v-model="clientSecret"
                  label="Client Secret"
                  type="password"
                  outlined
                  dense
                ></v-text-field>
              </div>
              </template>

            <!-- If Selected Method is Session Token -->
              <template v-if="selectedAuthMethod === 'Session Token'">
              <h4>Session Token Retrieval</h4>
                 <p>URL</p>
                <v-text-field
                  v-model="sessionToken"
                  outlined
                  dense
                ></v-text-field>

              <!-- ComboBox for Session Token HTTP Method like Get and Post -->
                <v-row>
                  <v-col cols="6">
                    <v-combobox
                      v-model="selectedSessionTokenHttpMethod"
                      :items="sessionTokenHttpMethods"
                      @change="onOAuthMethodChange"  
              ></v-combobox>
                  </v-col>
                </v-row>


              <!-- Combobox for Session Token Auth Method -->
                <p>Authentication Method</p>
              <v-combobox
                v-model="selectedSessionAuthMethod"
                :items="sessionAuthMethods"
                @change="onSessionAuthMethodChange"
              ></v-combobox>


              <!-- If Selected Method is Session API KEY -->
              <template v-if="selectedSessionAuthMethod === 'API Key'">
                <p>Inject Into</p>
                <v-combobox
                  v-model="selectedSessionApiKeyMethod"
                  :items="sessionApiKeyMethods"
                  @change="onSessionApiKeyMethodChange"
              ></v-combobox>

              <div v-if="selectedSessionApiKeyMethod === 'Header'"> 
                <p>Header Name</p>
                <v-text-field
                  v-model="sessionHeaderName"
                  outlined
                  dense
                ></v-text-field>
              </div>

              <div v-if="selectedSessionApiKeyMethod === 'Query Parameter'"> 
                <p>Parameter Name</p>
                <v-text-field
                  v-model="sessionParameterName"
                  outlined
                  dense
                ></v-text-field>
              </div>

              <div v-if="selectedSessionApiKeyMethod === 'Body Data (urlencoded form)'"> 
                <p>Key Name</p>
                <v-text-field
                  v-model="sessionBodyData"
                  outlined
                  dense
                ></v-text-field>
              </div>

              <div v-if="selectedSessionApiKeyMethod === 'Body JSON Payload'"> 
                <p>Key Name</p>
                <v-text-field
                  v-model="sessionBodyJsonPayload"
                  outlined
                  dense
                ></v-text-field>
              </div>

              </template>

              <!-- If Session Selected Method is Bearer -->
              <template v-if="selectedSessionAuthMethod === 'Bearer'">
                <v-text-field
                  v-model="sessionBearerToken"
                  label="Bearer Token"
                  outlined
                  dense
                ></v-text-field>
              </template>

              <!-- If Selected Method is Basic HTTP -->
              <template v-if="selectedSessionAuthMethod === 'Basic HTTP'">
                <v-text-field
                  v-model="sessionUsername"
                  label="Username"
                  outlined
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="sessionPassword"
                  label="Password"
                  type="password"
                  outlined
                  dense
                ></v-text-field>
              </template>


              </template>

              
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- User Inputs Section -->
    <v-row v-if="selectedItem === 'User Inputs'">
      <v-col>
        <h4>User Inputs</h4>
        <p>
          User inputs will be asked to the end-user in order to set up the connector.
          Open the Testing values menu to fill these in for the Builder.
        </p>
        <v-btn color="primary" @click="showNewUserInputForm">
          <v-icon start>mdi-plus</v-icon>
          Add a new user input
        </v-btn>

        <v-row v-for="(input, index) in userInputs" :key="index">
          <v-col>
            <v-card class="my-2 py-2 px-4">
              <v-row>
                <v-col>{{ input.name }}</v-col>
                <v-col class="d-flex justify-end">
                  <v-icon @click="editUserInput(input)">mdi-cog</v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- User Options Popup -->
    <v-menu v-model="userOptionsVisible" offset-y>
      <v-list>
        <v-list-item @click="insertApiKey">
          <v-list-item-title>API Key</v-list-item-title>
        </v-list-item>
        <v-list-item @click="showNewUserInputForm">
          <v-icon>mdi-plus</v-icon>
          <v-list-item-title>New User Input</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- New User Input Dialog -->
    <v-dialog v-model="newUserInputDialogVisible" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">New User Input</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="newUserInputDialogVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form @submit.prevent="createUserInput">
            <v-text-field
              v-model="newUserInput.name"
              label="Input Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUserInput.fieldId"
              label="Field ID"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUserInput.hint"
              label="Hint (Optional)"
            ></v-text-field>

            <v-select
              v-model="newUserInput.type"
              :items="inputTypes"
              label="Type"
              required
            ></v-select>

            <v-switch
              v-model="newUserInput.secret"
              label="Secret Field (Optional)"
            ></v-switch>
            <v-switch
              v-model="newUserInput.required"
              label="Required Field (Optional)"
            ></v-switch>
            <v-switch
              v-model="newUserInput.enableDefaultValue"
              label="Enable Default Value (Optional)"
            ></v-switch>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="newUserInputDialogVisible = false">Cancel</v-btn>
          <v-btn color="primary" @click="createUserInput">{{ isEditing ? 'Save Changes' : 'Create' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 'Global Configuration',
      apiBaseUrl: '',
      userOptionsVisible: false,
      newUserInputDialogVisible: false,
      isEditing: false,

      selectedAuthMethod: 'No Auth',
      authMethods: ['No Auth', 'API Key', 'Bearer', 'Basic HTTP', 'OAuth', 'Session Token'],

      selectedApiKeyMethod: 'Header',
      apiKeyMethods: ['Query Parameter', 'Header', 'Body Data (urlencoded form)', 'Body JSON Payload'],

      selectedOAuthGrantMethod: 'refresh_endpoint',
      oauthGrantMethods: ['refresh_endpoint', 'client_credentials'],

      selectedSessionTokenHttpMethod: 'POST',
      sessionTokenHttpMethods: ['GET', 'POST'],

      // Session Token Authentication Method
      selectedSessionAuthMethod: 'No Auth',
      sessionAuthMethods: ['No Auth', 'API Key', 'Bearer', 'Basic HTTP'],

      selectedSessionApiKeyMethod: 'Header',
      sessionApiKeyMethods: ['Query Parameter', 'Header', 'Body Data (urlencoded form)', 'Body JSON Payload'],

    // Auth Methods
      apiKey: '',
      bearerToken: '',
      username: '',
      password: '',
      queryParameter: '',
      headerName: '',
      parameterName: '',
      bodyData: '',
      bodyJsonPayload: '',

    // OAuth Methods
      refresh_endpoint: '',
      client_credentials: '',
      tokenRefreshEndpoint: '',
      clientId: '',
      clientSecret: '',
      refresh_token: '',
      sessionToken: '',


      // Session Auth Methods 
      sessionApiKey: '',
      queryParameter: '',
      sessionHeaderName: '',
      sessionParameterName: '',
      sessionBodyData: '',
      sessionBodyJsonPayload: '',
      sessionBearerToken: '',
      sessionUsername: '',
      sessionPassword: '',



      newUserInput: {
        name: '',
        fieldId: '',
        hint: '',
        type: '',
        secret: false,
        required: false,
        enableDefaultValue: false,
      },

      inputTypes: ['String', 'Number', 'Integer', 'Array', 'Boolean', 'Enum', 'Date'],
      userInputs: [],
    };
  },
  methods: {
    // Show user options menu
    showUserOptions() {
      this.userOptionsVisible = true;
    },

    // Insert API key from config
    insertApiKey() {
      this.apiBaseUrl = "{{ config['api_key'] }}";
      this.userOptionsVisible = false;
    },

    // Show new user input form
    showNewUserInputForm() {
      this.isEditing = false;
      this.newUserInputDialogVisible = true;
    },

    // Create new user input or save changes
    createUserInput() {
      if (!this.isEditing) {
        this.userInputs.push({ ...this.newUserInput });
      }
      this.newUserInputDialogVisible = false;
    },

    // Edit existing user input
    editUserInput(input) {
      Object.assign(this.newUserInput, input);
      this.isEditing = true;
      this.newUserInputDialogVisible = true;
    },

    // Handle changes in authentication method
    onAuthMethodChange() {
      // Reset all fields when changing auth method
      this.apiKey = '';
      this.bearerToken = '';
      this.username = '';
      this.password = '';
      this.tokenRefreshEndpoint= '',
      this.clientId = '';
      this.clientSecret = '';
      this.sessionToken = '';
    },

    // Handle changes in authentication method
    onApiKeyMethodChange() {
      // Reset all fields when changing auth method
      this.queryParameter = '';
      this.header = '';
      this.bodyData = '';
      this.bodyJsonPayload = '';
    },

    // Handle changes in authentication method
    onOAuthMethodChange() {
      // Reset all fields when changing auth method
      this.clientId= '',
      this.clientSecret= '',
      this.refresh_token= '',
      this.sessionToken= '',
      this.refresh_endpoint= '',
      this.client_credentials= '';
    },

    onSessionAuthMethodChange() {
      // Reset all fields when changing auth method
      this.apiKey = '';
      this.bearerToken = '';
      this.username = '';
      this.password = '';
      this.tokenRefreshEndpoint= '',
      this.clientId = '';
      this.clientSecret = '';
      this.sessionToken = '';
    },

  },
};
</script>

<style scoped>
.v-card {
  background-color: #ffffff;
}
.v-text-field {
  margin-bottom: 16px;
}
</style>
