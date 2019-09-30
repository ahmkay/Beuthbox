<template>
    <v-layout row>
        <v-flex xs12>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Opencast Import</div>
                        <span class="grey--text">Importiere Videos von Opencast. Es werden alle Video, die nicht bereits in diesem System sind importiert und auf den Status "imported" gestellt. Die Video müssen noch mindestens einem Channel zugeordnet werden.</span>
                    </div>
                </v-card-title>

                <v-card-text v-if="!loading">
                    <v-divider></v-divider>
                    <v-layout row wrap class="mb-4 mt-4">
                        <v-flex xs12 align-center justify-space-between style="display:flex">
                            <span class="subheading">Es werden Videos vom
                                <strong>{{fromDate | formatDate}}</strong> ab
                                <strong>{{fromTime}}</strong> bis
                                <strong>{{tillDate | formatDate}} {{tillTime}}</strong> importiert</span>
                            <v-btn color="error" dark class="submit-btn" @click="submit">Import starten</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12 align-center style="display:flex" class="mb-2 mt-3">
                            <v-icon>date_range</v-icon>
                            <span class="subheading">Gebe das
                                <strong>Startdatum</strong> des Imports an:</span>
                        </v-flex>
                        <v-flex xs6 align-center justify-center style="display:flex">
                            <v-date-picker v-model="fromDate" landscape scrollable :first-day-of-week="1"  locale="de-de" ></v-date-picker>
                        </v-flex>
                        <v-flex xs6 align-center justify-center style="display:flex">
                            <v-time-picker v-model="fromTime" landscape scrollable format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap class="mb-3">
                        <v-flex xs12 align-center style="display:flex" class="mb-2 mt-3">
                            <v-icon>date_range</v-icon>
                            <span class="subheading">Gebe das
                                <strong>Enddatum</strong> des Imports an:</span>
                        </v-flex>
                        <v-flex xs6 align-center justify-center style="display:flex">
                            <v-date-picker v-model="tillDate" landscape scrollable :first-day-of-week="1"  locale="de-de"></v-date-picker>
                        </v-flex>
                        <v-flex xs6 align-center justify-center style="display:flex">
                            <v-time-picker v-model="tillTime" landscape scrollable format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>

                    <v-divider></v-divider>
                    <v-layout row wrap class="mb-4 mt-4">
                        <v-flex xs12 align-center justify-space-between style="display:flex">
                            <span class="subheading">Es werden Videos vom
                                <strong>{{fromDate | formatDate}}</strong> ab
                                <strong>{{fromTime}}</strong> bis
                                <strong>{{tillDate | formatDate}} {{tillTime}}</strong> importiert</span>
                            <v-btn color="error" dark class="submit-btn" @click="submit">Import starten</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>

                </v-card-text>

                <v-card-text v-if="loading">
                    <v-divider></v-divider>
                    <v-card-text class="text-xs-center mt-4">
                        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="primary"></v-progress-circular>
                        <h5>Loading...</h5>
                    </v-card-text>
                </v-card-text>

            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>
import moment from "moment";
import axios from '~/plugins/axios'
export default {
  middleware: "authenticated",
  layout: "dashboard",
  methods: {
    test() {
      console.log(moment(String([this.fromDate, this.fromTime])).toISOString());
    },
    submit() {
      this.loading = true;
      const date =
        moment(String([this.fromDate, this.fromTime])).toISOString() +
        "%2f" +
        moment(String([this.tillDate, this.tillTime])).toISOString();
        console.log(date)
      axios.post(`/opencast/import`, {date: date}).then(
        response => {
          console.log(response);
          this.loading = false;
          this.$store.commit("setSnackbar", {
            text: `Es wurden ${response.data.numberOfImports} Videos in ${response.data.time}ms gefunden`,
            color: ""
          });
          // this.$router.push("/admin/videos");
        },
        err => {
            this.loading = false;
          this.$store.commit("setSnackbar", {
            text: "Fehler!",
            color: "error"
          });
          console.log(err);
        }
      );
    }
  },
  data() {
    return {
      loading: false,
      fromDate: moment().format("YYYY-MM-DD"),
      fromTime: moment().format("HH:mm"),
      tillDate: moment().format("YYYY-MM-DD"),
      tillTime: moment().format("HH:mm")
    };
  }
};
</script>