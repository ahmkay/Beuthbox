<template>
  <div>
    <v-layout row justify-center>

      <v-flex xs10>
        <h5>Neuen Channel anlegen</h5>

        <v-stepper v-model="step" non-linear>
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1" editable :rules="[() => checkStep1]">Metadata & Files</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="step > 2" editable>Rights & Access</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3" editable>User</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">

              <v-card flat>
                <v-card-text>
                  <form ref="myForm" enctype="multipart/form-data">
                    <v-container fluid grid-list-md>
                      <v-layout row wrap justify-center>
                        <v-flex xs6>
                          <v-text-field name="name" label="Channel Name" v-model="name" required :rules="requiredRule"></v-text-field>
                          <v-text-field name="description" label="Beschreibung" multi-line rows="4"></v-text-field>
                        </v-flex>
                        <v-flex xs6>
                          <v-layout row wrap justify-center align-items>
                            <v-flex xs12>
                              <v-text-field @click.native="onFocus('bigImage')" label="Großes Cover Image" v-model="filenameBig" hint="Wird auf der Channel-Übersicht angezeigt" persistent-hint
                                placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                              <input type="file" name="channel-image" ref="bigImage" @change="onFileChange($event, 'filenameBig')" />
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field @click.native="onFocus('smallImage')" label="Avatar Icon" v-model="filenameSmall" hint="Wird bei der Suche angezeigt" persistent-hint placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                              <input type="file" name="channel-icon" ref="smallImage" @change="onFileChange($event, 'filenameSmall')" />
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>


                    </v-container>
                  </form>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click.native="step = 2">Weiter</v-btn>

            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card flat>
                <v-card-text>
                  <form>
                    <v-container fluid grid-list-md>
                      <v-layout row wrap justify-center>
                        <v-flex xs6>
                          <v-tooltip bottom>
                            <v-switch label="Make Channel Public" v-model="ispublic" slot="activator"></v-switch>
                            <span>Public Channel werden in der Suche und auf der Übersicht angezeigt. Private sind nur über einen Link aufrufbar.</span>
                          </v-tooltip>
                          <v-switch label='Kann "Make Channel Public" ändern' v-model="canChangeAccessToChannel"></v-switch>
                          <v-switch label="Enable Live-Streaming" v-model="enablelive"></v-switch>
                          <v-switch label="Beuthbox-Admin can add Videos" v-model="adminCanAdd"></v-switch>
                          
                        </v-flex>
                        <v-flex xs6>
                          <v-tooltip bottom>
                            <v-switch label="Videos nur private und channelonly" v-model="videosOnlyPrivate" slot="activator"></v-switch>
                            <span>Die Videos des Channels können nur mit dem Access "private" und "channelonly" ausgestatten werden. D.h. die Videos werden nicht öffentlich gemacht. (Gedacht für experimentille Studenten-Channel)</span>
                          </v-tooltip>
                          <v-switch label="Kann Bauchbinden hinzufügen (experimentell)" v-model="canAddLowerThirds"></v-switch>
                          <v-switch label="Kann Channel-Name ändern" v-model="canChangeTitle"></v-switch>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </form>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click.native="step = 3">Weiter</v-btn>

            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card flat>
                <v-card-text>
                  <v-layout row wrap>
                    <div style="width: 45%">
                      <v-card>
                        <v-card-text>

                          <div class="headline">Alle User</div>
                          <span class="grey--text">Wähle User aus, die Zugriff zum Channel haben sollen.</span>

                          <v-text-field append-icon="search" hide-details single-line v-model="searchAdd"></v-text-field>
                        </v-card-text>
                        <v-data-table v-bind:headers='headersAdd' :items='allUsers' :search='searchAdd' v-model="selectedAdd" select-all item-key="username">
                          <template slot="items" scope="props">
                            <td style="width:10%">
                              <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                            </td>
                            <td>{{ props.item.username }}</td>
                          </template>
                        </v-data-table>

                      </v-card>
                    </div>

                    <div style="width: 10%" class="button-group">
                      <v-btn fab dark small color="primary" @click="add">
                        <v-icon dark>chevron_right</v-icon>
                      </v-btn>

                      <v-btn fab dark small color="primary" @click="remove">
                        <v-icon dark>chevron_left</v-icon>
                      </v-btn>
                    </div>

                    <div style="width: 45%">
                      <v-card>
                        <v-card-text>

                          <div class="headline">Gewählte User</div>
                          <span class="grey--text">Diese Nutzer können im Namen des Channels agieren.</span>
                          <v-text-field append-icon="search" hide-details single-line v-model="searchCurrent"></v-text-field>

                        </v-card-text>
                        <v-data-table v-bind:headers='headersCurrent' :items='channelUsers' :search='searchCurrent' v-model="selectedCurrent" select-all item-key="username">
                          <template slot="items" scope="props">
                            <td style="width:10%">
                              <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                            </td>
                            <td>
                              {{ props.item.username }}
                            </td>
                          </template>
                        </v-data-table>
                      </v-card>
                    </div>

                  </v-layout>
                </v-card-text>
              </v-card>
              <v-btn flat @click.native="step = 1">Zurück</v-btn>
              <v-btn color="primary" @click.native="submit" :disabled="!checkStep1">Submit</v-btn>
            </v-stepper-content>

          </v-stepper-items>
        </v-stepper>

      </v-flex>

    </v-layout>

  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    middleware: 'authenticated',
    layout: "dashboard",

    data() {
      return {
        step: 0,
        ispublic: true,
        enablelive: false,
        adminCanAdd: true,
        videosOnlyPrivate: false,
        canAddLowerThirds: false,
        canChangeTitle: true,
        canChangeAccessToChannel: true,
        name: "",
        filenameBig: "",
        filenameSmall: "",
        channelUsers: [],
        searchAdd: "",
        selectedAdd: [],
        searchCurrent: "",
        selectedCurrent: [],
        headersAdd: [
          { text: "Name", value: "name", align: "left", sortable: true },
        ],
        headersCurrent: [
          { text: "Name", value: "name", align: "left", sortable: true },
        ],
        requiredRule: [
          (v) => !!v || 'This field is required',
        ],
      };
    },

    computed: {

      allUsers() {
        return this.$store.state.user.allUsers;
      },

      checkStep1() {
        if (this.step > 1) {

          return this.name.length > 0
        } else { return true }
      },

    },

    methods: {

      test() {
        console.log(this.channelUsers.map(prop => prop._id))
      },

      remove() {

        this.channelUsers = this.channelUsers.filter(item => !this.selectedCurrent.includes(item));

        this.selectedCurrent = [];
      },
      add() {


        let parsedUser = JSON.parse(JSON.stringify(this.selectedAdd));
        this.channelUsers = this.channelUsers.concat(parsedUser);

        this.selectedAdd = [];

      },
      submit({ store }) {
        const otherForm = new FormData(this.$refs.myForm);
        otherForm.append("ispublic", this.ispublic);
        otherForm.append("liveenabled", this.enablelive);
        otherForm.append("beuthboxAdminCanAddVideos", this.adminCanAdd)
        otherForm.append("users", this.channelUsers.map(prop => prop._id));
        otherForm.append("videosOnlyPrivate", this.videosOnlyPrivate);
        otherForm.append("canAddLowerThirds", this.canAddLowerThirds);
        otherForm.append("canChangeTitle", this.canChangeTitle);
        otherForm.append("canChangeAccessToChannel", this.canChangeAccessToChannel);

        axios.post(`/channel`, otherForm).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: "Channel wurde erstellt",
              color: ""
            });

            // this.$router.push("/channels");
          },
          err => {
            this.$store.commit("setSnackbar", {
              text: "Fehler beim Erstellen des Channels",
              color: "error"
            });
            console.log(err);
          }
        );
      },

      onFocus(ref) {
        this.$refs[ref].click();
      },

      onFileChange($event, filename) {
        this[filename] = $event.target.value.split("\\").pop();
      }
    },

    fetch({ store, params }) {
      return axios
        .get(
        "/graphql?query={users{username, group, email, created, _id}}"
        )
        .then(res => {
          store.commit("user/SET_USERS", res.data.data.users);
        })
        .catch(error => {
          store.commit("user/SET_USERS", []);
          console.log(error);
        });
    }

  }
</script>

<style>
  input[type="file"] {
    display: none;
  }

  .button-group {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center
  }
</style>