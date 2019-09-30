<template>
  <v-container class="single-video">
    <v-layout row class="elevation-1">
      <v-flex>
        <v-toolbar flat light dense color="grey lighten-3">
          <v-toolbar-title>Video {{video.name}}</v-toolbar-title>
        </v-toolbar>
        <v-layout row wrap style="height: 240px">
          <div v-if="video.videoPath">
            <video height="240" controls style="z-index: 1; position: absolute" v-if="video.videoPath.indexOf('engage-player') > 1">
              <source :src="video.videoPath" type="video/mp4">
            </video>
            <video height="240" controls style="z-index: 1; position: absolute" v-else>
              <source :src="apiUrl + '/videos' + video.videoPath" type="video/mp4">
            </video>
          </div>
          <div v-else>
            No Preview available. Video is still transcoding
          </div>

          <v-flex xs7 offset-xs5>
            <v-layout row wrap fill-height justify-center align-content-center align-center>
              <v-layout row wrap>
                <v-flex class="flex-shrink info-list mr-5">
                  <ul>
                    <li>
                      <span>Erstellt: </span>{{video.created | formatDate}}</li>
                    <li>
                      <span>Uploaded:</span>{{video.uploaded | formatDate}}</li>
                    <li>
                      <span>Modified:</span>{{video.modified | formatDate}}</li>
                    <li>
                      <span>Source:</span>{{video.source || '&nbsp;'}}</li>
                    <li>
                      <span>Player: </span>{{video.playerType || '&nbsp;'}}</li>
                    <li>
                      <span>Uploaded by User: </span>{{video.uploadedByUser || '&nbsp;'}}</li>
                  </ul>
                </v-flex>

                <v-flex class="info-list">
                  <ul>
                    <li>
                      <span>Status:</span>{{video.status || '&nbsp;'}}</li>
                    <li>
                      <span>Access:</span>{{video.access || '&nbsp;'}}</li>
                    <li>
                      <span>Duration: </span>{{video.videoDuration || '&nbsp;'}}</li>
                  </ul>

                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>

        </v-layout>

        <v-tabs :scrollable="false">
          <v-tabs-bar class="grey lighten-3">
            <v-tabs-item href="tab1">
              Basic Infos
            </v-tabs-item>
            <v-tabs-item href="tab2">
              Medien und Attachments
            </v-tabs-item>
            <v-tabs-slider color="primary"></v-tabs-slider>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content id="tab1">
              <v-card flat class="grey lighten-4">
                <v-card-text>
                  <form ref="myForm" enctype="multipart/form-data">
                    <v-layout row wrap>
                      <v-flex xs6 class="pa-1">
                        <v-text-field v-model="video.name" name="name" label="Name" box></v-text-field>
                        <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                          <v-text-field slot="activator" label="Erstellt am / Produktionsdatum" v-model="formatedDate" name="created" readonly box></v-text-field>
                          <v-date-picker v-model="formatedDate" no-title scrollable actions>
                            <template scope="{ save, cancel }">
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                <v-btn flat color="primary" @click="save">OK</v-btn>
                              </v-card-actions>
                            </template>
                          </v-date-picker>
                        </v-menu>
                        <v-text-field v-model="video.description" name="description" label="Beschreibung" multi-line box></v-text-field>
                      </v-flex>
                      <v-flex xs6 class="pa-1">

                        <v-layout row wrap>
                          <v-flex xs6 class="pr-1">
                            <v-select :items="accessSelect" v-model="video.access" item-text="name" item-value="_id" label="Access" name="access" return-object class="input-group--text-field-box"></v-select>
                          </v-flex>
                          <v-flex xs6 class="pl-1">
                            <v-select v-bind:items="statusSelect" v-model="video.status" label="Status" name="status" class="input-group--text-field-box"></v-select>
                          </v-flex>
                        </v-layout>

                        <v-select v-bind:items="channels" v-model="video.channel[0]" label="Channel" item-text="name" item-value="_id" autocomplete class="input-group--text-field-box" clearable>
                          <template slot="item" scope="data">

                            <v-list-tile-avatar style="height: 40px; width: 40px">
                              <img :src="apiUrl + '/channel' + data.item.iconpath" />
                            </v-list-tile-avatar>
                            <v-list-tile-content class="pt-1">
                              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                            </v-list-tile-content>

                          </template>
                        </v-select>

                        <v-select :items="categories" v-model="video.categories" item-text="name" no-data-text="nichts gefunden" label="Categorien" class="input-group--text-field-box chip-select"
                          multiple chips autocomplete item-value="_id">
                          <template slot="selection" scope="data">
                            <v-chip close @input="data.parent.selectItem(data.item)" class="chip--select-multi" :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)">
                              <v-avatar>
                                <img :src="apiUrl + '/category' + data.item.iconpath">
                              </v-avatar>
                              {{ data.item.name }}
                            </v-chip>
                          </template>

                          <template slot="item" scope="data">

                            <v-list-tile-avatar style="height: 40px; width: 40px">
                              <img :src="apiUrl + '/category' + data.item.iconpath" />
                            </v-list-tile-avatar>
                            <v-list-tile-content class="pt-1">
                              <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                            </v-list-tile-content>

                          </template>

                        </v-select>

                        <v-select label="Tags" chips tags append-icon="" clearable v-model="video.tags" class="input-group--text-field-box chip-select">
                          <template slot="selection" scope="data">
                            <v-chip close @input="remove(data.item)" :selected="data.selected">
                              <v-avatar class="primary">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
                              {{ data.item }}
                            </v-chip>
                          </template>
                        </v-select>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-btn @click="submit" color="primary" class="mt-3">
                        Änderungen speichern
                      </v-btn>
                      <v-btn @click="test" color="primary" class="mt-3">
                        test
                      </v-btn>
                    </v-layout>
                  </form>
                </v-card-text>
              </v-card>
            </v-tabs-content>
            <v-tabs-content id="tab2">
              <v-card flat class="grey lighten-4">
                <v-card-text>
                  <form ref="posterimageForm" enctype="multipart/form-data" class="mt-2">
                    <v-text-field @click.native="onFocus('posterimage')" label="Posterimage" v-model="video.posterImageFilename" placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                    <input type="file" name="poster-image" ref="posterimage" @change="onFileChange($event)" />
                    <div v-if="video.posterImagePath">
                      <img :src="video.posterImagePath" height="200" v-if="video.posterImagePath.indexOf('engage-player') > 1">
                      <img :src="apiUrl + '/videos' + video.posterImagePath" height="200" v-else>
                    </div>
                    <div v-else>
                      Video is still transcoding
                    </div>
                    <v-btn color="primary" @click.native="uploadPosterImage">Änderung des Posterimages speichern</v-btn>
                  </form>
                </v-card-text>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from "~/plugins/axios";
  import moment from "moment";
  export default {
    middleware: "authenticated",
    layout: "dashboard",
    data() {
      return {
        apiUrl: process.env.apiUrl,
        menu: false,
        accessSelect: ["public", "private", "channelonly"],
        statusSelect: ["hold", "finished"],
        imagefilename: "",
        iconfilename: ""
      };
    },

    methods: {
      test() {
        console.log(this.video.channel[0]);

      },
      remove(item) {
        this.video.tags.splice(this.video.tags.indexOf(item), 1)
        this.video.tags = [...this.video.tags]
      },
      uploadPosterImage() {
        const form = new FormData(this.$refs.posterimageForm);
        let itemId = this.$route.params.id;

        axios.put(`/videos/posterimage/${itemId}`, form).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: "Posterimage wurde geändert",
              color: ""
            });
           
            this.video.posterImageFilename = response.data.posterImageFilename;
            this.video.posterImagePath = response.data.posterImagePath;
          },
          err => {
            this.$store.commit("setSnackbar", {
              text: "Fehler beim Editieren des Videos",
              color: "error"
            });
            console.log(err);
          }
        );
      },

      submit() {
        var itemId = this.$route.params.id;
        this.video.created = this.formatedDate;
        axios.put(`/videos/${itemId}`, this.video).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: "Video wurde geändert",
              color: ""
            });
            // this.$router.push("/admin/videos");
          },
          err => {
            this.$store.commit("setSnackbar", {
              text: "Fehler beim Editieren des Videos",
              color: "error"
            });
            console.log(err);
          }
        );
      },
      onFocus(ref) {
        this.$refs[ref].click();
      },

      onFileChange($event) {
        this.video.posterImageFilename = $event.target.value.split("\\").pop();
      }
    },

    asyncData({ params, error, store }) {
      return axios
        .get(
        `/graphql?query={video(id:"${params.id}"){name, description, created, uploaded, playerType, channel{name, _id, iconpath}, categories{name, _id, iconpath}, tags, status, source, uploadedByUser, access, videoDuration, dualView, isOpencast, posterImagePath, posterImageFilename, videoPath, modified}categories{name, _id, iconpath}channels{name, _id, iconpath}}`
        )
        .then(res => {
          store.commit("settoolbarTitle", `Video ${res.data.data.video.name}`);
          const formatedDate = moment(String(res.data.data.video.created)).format(
            "YYYY-MM-DD"
          );
          return {
            video: res.data.data.video,
            formatedDate: formatedDate,
            categories: res.data.data.categories,
            channels: res.data.data.channels
          };
        })
        .catch(e => {
          error({ statusCode: 404, message: "Post not found" });
        });
    }
  };
</script>


<style>
  input[type="file"] {
    display: none;
  }

  textarea {
    height: 112px;
  }

  .list__tile__avatar {
    width: 40px !important;
    height: 40px !important;
  }

  .chip-select>label {
    top: 28px !important;
  }

  .single-video .input-group {
    margin-top: -18px;
  }

  .info-list ul {
    list-style-type: none;
    padding-left: 0px;
  }

  .info-list ul li {
    padding: 5px;
  }

  .info-list ul li span {
    float: left;
    width: 120px;
    font-weight: bold;
  }

  td,
  th {
    text-align: left;
    padding: 2px 8px;
  }
</style>