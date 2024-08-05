<template>
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
                  @change="onSessionAuthMethodChange"
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
  </template>
  
  <script>
  export default {
    props: {
      selectedAuthMethod: String,
      authMethods: Array,
      selectedApiKeyMethod: String,
      apiKeyMethods: Array,
      selectedOAuthGrantMethod: String,
      oauthGrantMethods: Array,
      selectedSessionTokenHttpMethod: String,
      sessionTokenHttpMethods: Array,
      selectedSessionAuthMethod: String,
      sessionAuthMethods: Array,
      selectedSessionApiKeyMethod: String,
      sessionApiKeyMethods: Array,
      apiKey: String,
      bearerToken: String,
      username: String,
      password: String,
      queryParameter: String,
      headerName: String,
      parameterName: String,
      bodyData: String,
      bodyJsonPayload: String,
      tokenRefreshEndpoint: String,
      clientId: String,
      clientSecret: String,
      refresh_token: String,
      sessionToken: String,
      sessionHeaderName: String,
      sessionParameterName: String,
      sessionBodyData: String,
      sessionBodyJsonPayload: String,
      sessionBearerToken: String,
      sessionUsername: String,
      sessionPassword: String,
    },
    methods: {
      onAuthMethodChange() {
        this.$emit('auth-method-change');
      },
      onApiKeyMethodChange() {
        this.$emit('api-key-method-change');
      },
      onOAuthMethodChange() {
        this.$emit('oauth-method-change');
      },
      onSessionAuthMethodChange() {
        this.$emit('session-auth-method-change');
      },
      onSessionApiKeyMethodChange() {
        this.$emit('session-api-key-method-change');
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
  