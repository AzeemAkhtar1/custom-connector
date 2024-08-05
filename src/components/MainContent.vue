<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="mainContentCols">
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

                    <div v-if="selectedOAuthGrantMethod === 'refresh_endpoint'">
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
        <UserInputs
          :selectedItem="selectedItem"
          :userInputs="userInputs"
          :inputTypes="inputTypes"
          @create-user-input="addUserInput"
        />
      </v-col>

      <v-col :cols="rightSidebarCols" class="resizable" ref="rightSidebar">
        <RightSidebar />
        <div class="resizer" @mousedown="startResize"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserInputs from './UserInputs.vue';
import RightSidebar from './RightSidebar.vue';

export default {
  components: {
    UserInputs,
    RightSidebar,
  },
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
      apiKeyMethods: ['Header', 'Query Parameter', 'Body Data (urlencoded form)', 'Body JSON Payload'],
      headerName: '',
      parameterName: '',
      bodyData: '',
      bodyJsonPayload: '',

      bearerToken: '',
      username: '',
      password: '',
      tokenRefreshEndpoint: '',
      clientId: '',
      clientSecret: '',
      refresh_token: '',

      selectedOAuthGrantMethod: 'refresh_endpoint',
      oauthGrantMethods: ['refresh_endpoint', 'client_credentials'],

      sessionToken: '',
      sessionTokenHttpMethods: ['GET', 'POST'],
      selectedSessionTokenHttpMethod: 'GET',

      sessionAuthMethods: ['API Key', 'Bearer', 'Basic HTTP'],
      selectedSessionAuthMethod: 'API Key',

      sessionApiKeyMethods: ['Header', 'Query Parameter', 'Body Data (urlencoded form)', 'Body JSON Payload'],
      selectedSessionApiKeyMethod: 'Header',

      sessionHeaderName: '',
      sessionParameterName: '',
      sessionBodyData: '',
      sessionBodyJsonPayload: '',

      sessionBearerToken: '',
      sessionUsername: '',
      sessionPassword: '',

      inputTypes: ['Text', 'Number', 'Email', 'Password', 'Date', 'Checkbox', 'Radio'],
      userInputs: [
        {
          id: 1,
          label: 'Name',
          type: 'text',
          value: '',
        },
        {
          id: 2,
          label: 'Age',
          type: 'number',
          value: '',
        },
        {
          id: 3,
          label: 'Email',
          type: 'email',
          value: '',
        },
      ],
      mainContentCols: 8,
      rightSidebarCols: 4,
    };
  },
  methods: {
    showUserOptions() {
      this.userOptionsVisible = !this.userOptionsVisible;
    },
    addUserInput(newInput) {
      this.userInputs.push(newInput);
    },
    onAuthMethodChange(value) {
      this.selectedAuthMethod = value;
    },
    onApiKeyMethodChange(value) {
      this.selectedApiKeyMethod = value;
    },
    onOAuthMethodChange(value) {
      this.selectedOAuthGrantMethod = value;
    },
    onSessionAuthMethodChange(value) {
      this.selectedSessionAuthMethod = value;
    },
    onSessionApiKeyMethodChange(value) {
      this.selectedSessionApiKeyMethod = value;
    },
    startResize(event) {
      event.preventDefault();
      document.addEventListener('mousemove', this.resize, false);
      document.addEventListener('mouseup', this.stopResize, false);
    },
    resize(event) {
      const rightSidebar = this.$refs.rightSidebar;
      const newWidth = (window.innerWidth - event.clientX) / window.innerWidth * 12;
      if (newWidth > 1 && newWidth < 5) {
        this.rightSidebarCols = Math.round(newWidth);
        this.mainContentCols = 12 - this.rightSidebarCols;
      }
    },
    stopResize() {
      document.removeEventListener('mousemove', this.resize, false);
      document.removeEventListener('mouseup', this.stopResize, false);
    },
  },
};
</script>

<style scoped>
.resizable {
  position: relative;
}
.resizer {
  width: 10px;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: -5px;
  cursor: ew-resize;
}
</style>
