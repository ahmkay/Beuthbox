<template>
  <v-layout row wrap>
    <v-flex xs12 class="mb-3">

      <v-toolbar dense flat class="elevation-1" color="white">
        <v-flex xs3>
          <v-text-field append-icon="search" hide-details single-line v-model="videoSearchFilter" clearable></v-text-field>
        </v-flex>

        <v-spacer></v-spacer>
        <v-btn fab small @click="fetchData" class="elevation-2">
          <v-icon>autorenew</v-icon>
        </v-btn>
        <v-btn fab small color="error" nuxt to="/videos/add-new" class="elevation-2">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>

    <v-flex xs12>
      <v-card>
        <v-data-table v-bind:headers='headers' :items='videos' :search='videoSearchFilter'>
          <template slot="items" scope="props">
            <!-- <td><img :src="'http://beuthbox.beuth-hochschule.de/api/videos' + props.item.posterImagePath" height="90"></td> -->
            <td>
               <div v-if="props.item.posterImagePath">
                      <img :src="props.item.posterImagePath" height="90" v-if="props.item.posterImagePath.indexOf('engage-player') > 1">
                      <img :src="'http://beuthbox.beuth-hochschule.de/api/videos' + props.item.posterImagePath" height="90" v-else>
                </div>
                <div v-else>
                      No Image available
                </div>
            </td>
            <td style="width:30%" class="data-table-desc">{{ props.item.name }}</td>

            <td>{{ props.item.status }}</td>
            <td>{{ props.item.access }}</td>
            <td>{{ props.item.channel | categoryArrayToString}}</td>
            <td>{{ props.item.categories | categoryArrayToString}}</td>
            <td>{{ props.item.created | formatDate }}</td>
            <td class="text-xs-right">
              <v-btn flat icon color="primary" nuxt :to="'/videos/' + props.item._id">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="primary" @click="openDeleteDialog(props.item._id, props.item.name)" :disabled="props.item.status !== 'finished'">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>

      <deletedialog v-if="dialog.status" :dialog="dialog" @closeDialog="onCloseDialog()"></deletedialog>

    </v-flex>
  </v-layout>
</template>


<script>
  import axios from "~/plugins/axios";
  import deletedialog from "~/components/deleteDialog.vue";
  import { mapState, mapMutations, mapGetters } from 'vuex';

  export default {
    middleware: "authenticated",
    components: {
      deletedialog
    },
    layout: "dashboard",
    data() {
      return {
        headers: [
          { text: "Img", value: "posterImagePath", align: "left", sortable: false },
          { text: "Name", value: "name", align: "left", sortable: true },
          { text: "Status", value: "status", align: "left", sortable: true },
          { text: "Access", value: "access", align: "left", sortable: true },
          { text: "Channel", value: "channel", align: "left", sortable: true },
          {
            text: "Kategorien",
            value: "category",
            align: "left",
            sortable: true
          },
          { text: "Produziert am", value: "date", align: "left", sortable: true },
          { text: "", value: "edit", align: "left", sortable: false }
        ],
        status: ["This", "is", "not", "working"],
        search: "",
        dialog: {
          status: false,
          title: "Video",
          deleteItem: "Videotitle",
          itemId: ""
        }
      };
    },

    computed: {
      // ...mapGetters({ videoSearchFilter: 'videos/getVideoSeachFilter'}),

      videos() {
        return this.$store.state.videos;
      },

      videoSearchFilter: {
        get() {
          return this.$store.state.videoSearchFilter;
        },
        set(query) {
          this.$store.commit("setVideoSearchFilter", query);
        }
      }
    },

    created() {
      this.$store.commit("settoolbarTitle", "Videos");
    },

    methods: {
      fetchData() {
        axios
              .get(
                "/graphql?query={videos{name, source, created, status, access, posterImagePath, channel{name}, categories{name} _id}}"
              )
              .then(res => {
                this.$store.commit("setVideos", res.data.data.videos);
              })
              .catch(error => {
                this.$store.commit("setVideos", []);
                console.log(error);
              });
      },
      test(){
        console.log(this.videoSearchFilter)
      },
      openDeleteDialog(itemId, itemName) {
        this.dialog.deleteItem = itemName;
        this.dialog.itemId = itemId;
        this.dialog.status = true;
      },
      onCloseDialog() {
        console.log(this.dialog.deleteItem);
        axios.delete(`/videos/${this.dialog.itemId}`).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: `Video ${this.dialog.deleteItem} wurde gelöscht`,
              color: ""
            });
            axios
              .get(
              "/graphql?query={videos{name, source, created, status, access, posterImagePath, channel{name}, categories{name} _id}}"
              )
              .then(res => {
                this.$store.commit("setVideos", res.data.data.videos);
              })
              .catch(error => {
                this.$store.commit("setVideos", []);
                console.log(error);
              });
          },
          err => {
            console.log(err);
          }
        );
      }
    },

    fetch({ store, params }) {
      return axios
        .get(
        "/graphql?query={videos{name, source, created, status, access, posterImagePath, channel{name}, categories{name} _id}}"
        )
        .then(res => {
          store.commit("setVideos", res.data.data.videos);
        })
        .catch(error => {
          store.commit("setVideos", []);
          console.log(error);
        });
    }
  };
</script>

<style>
  .input-group__filter {
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: rgba(0, 0, 0, 0.12);
  }

  .application--light .input-group:not(.input-group--error) .input-group__details:before {
    background-color: rgba(0, 0, 0, 0.12);
  }
</style>