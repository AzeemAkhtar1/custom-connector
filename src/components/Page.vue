<template>
    <v-row>
        <v-col>
            <v-checkbox
            v-model="paginationEnabled"
            label="Pagination"
            @change="onPaginationToggle"
          />
        </v-col>
    </v-row>

    <v-cols v-if="paginationEnabled">
        <div>
            <v-combobox
                v-model="selectedStrategyOption"
                label="Strategy"
                :items="strategyOptions"
                @change="onStrategyOptionsChange"
            ></v-combobox>
        </div>

        <div v-if="selectedStrategyOption === 'Offset Increment'">
            <p>Limit <span style="color: grey; font-size: 10px; font-style: italic;">Optional</span></p>
            <v-text-field
                v-model="limit"
                type="number"
            />
        </div>

        <div>
            <v-checkbox
                v-model="injectOutgoingRequestEnabled"
                label="Inject Offset Into Outgoing HTTP Request"
                @change="onOutgoingRequestToggle"
            />

            <div v-if="injectOutgoingRequestEnabled">
                
            </div>
        </div>

        

    </v-cols>

</template>


<script>
    export default {
        data() {
            return{
                paginationEnabled: 'false',
                injectOutgoingRequestEnabled: 'false',


                // Strategy Combobox models
                selectedStrategyOption: 'Offset Increment',
                strategyOptions: ['Offset Increment', 'Page Increment', 'Cursor Pagination'],


                // Strategy Options variables
                offsetIncrement: '',
                pageIncrement: '',
                cursorPagination: '',

                // Offset Increment Variables
                limit: '',

            }
        },
        
        methods: {
            onPaginationToggle() {
                if (!this.paginationEnabled) {
                    this.resetFields();
                }
            },

            onOutgoingRequestToggle() {
                if (!this.injectOutgoingRequestEnabled) {
                    this.resetFields();
                }
            },


            onStrategyOptionsChange() {
                // Reset all fields when changing Strategy Options
                this.offsetIncrement = '';
                this.pageIncrement = '';
                this.cursorPagination = '';
      
            },

        }
    }

</script>

