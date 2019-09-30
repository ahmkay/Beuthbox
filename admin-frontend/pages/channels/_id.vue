<template>
  <v-layout row justify-center>
    <v-flex xs12>

      <v-card>
        <v-tabs :scrollable="false">
          <div class="elevation-3">
            <v-card-title primary-title>
              <div class="headline mb-2">Channel "{{channel.name}}" ändern</div>
            </v-card-title>
            <v-tabs-bar class="white mb-3">
              <v-tabs-item href="tab1">
                Metadata & Files
              </v-tabs-item>
              <v-tabs-item href="tab2">
                Rights & Access
              </v-tabs-item>
              <v-tabs-item href="tab3">
                User
              </v-tabs-item>
              <v-tabs-slider color="primary"></v-tabs-slider>
            </v-tabs-bar>
          </div>
          <v-tabs-items>
            <v-tabs-content id="tab1">
              <v-card-text>
                <form ref="myForm" enctype="multipart/form-data">
                  <v-container fluid grid-list-md>
                    <v-layout row wrap justify-center>
                      <v-flex xs6>
                        <v-text-field name="name" label="Channel Name" v-model="channel.name" required :rules="requiredRule"></v-text-field>
                        <v-text-field name="description" label="Beschreibung" v-model="channel.description" multi-line rows="4"></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-layout row wrap justify-center align-items>
                          <v-flex class="flex-shrink">
                            <v-avatar size="50px" slot="activator">
                              <img :src="smallImage">
                            </v-avatar>
                          </v-flex>

                          <v-flex xs10>
                            <v-text-field @click.native="onFocus('smallImage')" label="Avatar Icon" v-model="iconfilename" placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                            <input type="file" name="channel-icon" ref="smallImage" @change="onFileChange($event, 'iconfilename', 'smallImage')" />
                          </v-flex>


                          <v-flex class="flex-shrink">
                            <v-avatar size="50px" slot="activator">
                              <img :src="bigImage">
                            </v-avatar>
                          </v-flex>

                          <v-flex xs10>
                            <v-text-field @click.native="onFocus('bigImage')" label="Großes Cover Image" v-model="imagefilename" placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                            <input type="file" name="channel-image" ref="bigImage" @change="onFileChange($event, 'imagefilename', 'bigImage')" />
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>

                  </v-container>
                </form>
              </v-card-text>
            </v-tabs-content>

            <v-tabs-content id="tab2">
              <v-card-text>
                  <v-container fluid grid-list-md>
                      <v-layout row wrap justify-center>
                        <v-flex xs6>
                          <v-tooltip bottom>
                            <v-switch label="Make Channel Public" v-model="channel.ispublic" slot="activator"></v-switch>
                            <span>Public Channel werden in der Suche und auf der Übersicht angezeigt. Private sind nur über einen Link aufrufbar.</span>
                          </v-tooltip>
                          <v-switch label='Kann "Make Channel Public" ändern' v-model="channel.canChangeAccessToChannel"></v-switch>
                          <v-switch label="Enable Live-Streaming" v-model="channel.liveenabled"></v-switch>
                          <v-switch label="Beuthbox-Admin can add Videos" v-model="channel.beuthboxAdminCanAddVideos"></v-switch>
                          
                        </v-flex>
                        <v-flex xs6>
                          <v-tooltip bottom>
                            <v-switch label="Videos nur private und channelonly" v-model="channel.videosOnlyPrivate" slot="activator"></v-switch>
                            <span>Die Videos des Channels können nur mit dem Access "private" und "channelonly" ausgestatten werden. D.h. die Videos werden nicht öffentlich gemacht. (Gedacht für experimentille Studenten-Channel)</span>
                          </v-tooltip>
                          <v-switch label="Kann Bauchbinden hinzufügen (experimentell)" v-model="channel.canAddLowerThirds"></v-switch>
                          <v-switch label="Kann Channel-Name ändern" v-model="channel.canChangeTitle"></v-switch>
                        </v-flex>
                      </v-layout>
                    </v-container>
              </v-card-text>
            </v-tabs-content>
            <v-tabs-content id="tab3">
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
                      <v-data-table v-bind:headers='headersCurrent' :items='channel.users' :search='searchCurrent' v-model="selectedCurrent" select-all item-key="username">
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
            </v-tabs-content>

          </v-tabs-items>
        </v-tabs>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submit" color="primary">Änderungen speichern</v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>

</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    middleware: 'authenticated',
    layout: "dashboard",
    data() {
      return {
        imagefilename: "",
        iconfilename: "",
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
    },
    methods: {

      test() {
        console.log(this.channel)
      },

      remove() {

        this.channel.users = this.channel.users.filter(item => !this.selectedCurrent.includes(item));

        this.selectedCurrent = [];
      },
      add() {


        let parsedUser = JSON.parse(JSON.stringify(this.selectedAdd));
        this.channel.users = this.channel.users.concat(parsedUser);

        this.selectedAdd = [];

      },

      submit() {
        var itemId = this.$route.params.id;
        const otherForm = new FormData(this.$refs.myForm);
        otherForm.append("ispublic", this.channel.ispublic);
        otherForm.append("liveenabled", this.channel.liveenabled);
        otherForm.append("users", this.channel.users.map(prop => prop._id));
        otherForm.append("videosOnlyPrivate", this.channel.videosOnlyPrivate);
        otherForm.append("canAddLowerThirds", this.channel.canAddLowerThirds);
        otherForm.append("canChangeTitle", this.channel.canChangeTitle);
        otherForm.append("canChangeAccessToChannel", this.channel.canChangeAccessToChannel);

        axios.put(`/channel/${itemId}`, otherForm).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: "Channel wurde geändert",
              color: ""
            });
            // this.$router.push("/channel");
          },
          err => {
            this.$store.commit("setSnackbar", {
              text: "Fehler beim Editieren des Channels",
              color: "error"
            });
            console.log(err);
          }
        );
      },
      onFocus(ref) {
        this.$refs[ref].click();
      },

      onFileChange($event, filename, src) {
        this[filename] = $event.target.value.split("\\").pop();
        var input = event.target;

        if (input.files && input.files[0]) {
          var reader = new FileReader();
          var vm = this;

          reader.onload = function (e) {
            vm[src] = e.target.result;
          };

          reader.readAsDataURL(input.files[0]);
        }
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
    },

    asyncData({ params, error, store }) {
      return axios
        .get(
        `/graphql?query={channel(id:"${params.id}"){name,description, iconfilename, imagefilename, iconpath, imagepath, liveenabled, ispublic, beuthboxAdminCanAddVideos, videosOnlyPrivate, canAddLowerThirds, canChangeTitle, canChangeAccessToChannel, users{username, _id}}}`
        )
        .then(res => {
          store.commit("settoolbarTitle", `Channel ${res.data.data.channel.name}`);
          return {
            channel: res.data.data.channel,
            bigImage:
              process.env.apiUrl + "/channel" + res.data.data.channel.imagepath,
            smallImage:
              process.env.apiUrl + "/channel" + res.data.data.channel.iconpath,
            imagefilename: res.data.data.channel.imagefilename,
            iconfilename: res.data.data.channel.iconfilename
          };
        })
        .catch(e => {
          error({ statusCode: 404, message: "Post not found" });
        });
    },

  };
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