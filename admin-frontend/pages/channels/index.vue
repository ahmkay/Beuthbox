<template>
  <v-layout row justify-center wrap>

    <v-flex xs12 class="mb-3">

      <v-toolbar dense flat class="elevation-1" color="white">
        <v-flex xs3>
          <v-text-field append-icon="search" hide-details single-line v-model="search"></v-text-field>
        </v-flex>

        <v-spacer></v-spacer>
        <v-btn fab small color="error" nuxt to="/channels/add" class="elevation-2">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>

    <v-flex xs12>
      <v-card>

        <v-data-table v-bind:headers='headers' :items='channels' :search='search'>
          <template slot="items" scope="props">
            <td style="width:10%">
              <v-avatar size="36px" slot="activator">
                <img :src="apiUrl + '/channel' + props.item.iconpath">
              </v-avatar>
            </td>
            <td style="width:20%">{{ props.item.name }}</td>
            <td style="width:10%" class="data-table-desc">{{ props.item.users | userArrayToString}}</td>
            <td style="width:20%" class="data-table-desc">{{ props.item.description }}</td>
            <td style="width:10%">{{ props.item.ispublic }}</td>
            <td style="width:10%">{{ props.item.created | formatDate }}</td>
            <td style="width:20%" class="text-xs-right">
              <v-btn flat icon color="primary" nuxt :to="'/channels/' + props.item._id">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="primary" @click="openDeleteDialog(props.item._id, props.item.name)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>

      <deletedialog v-if="dialog.status" :dialog="dialog" @closeDialog="onCloseDialog()"></deletedialog>
      <warningdialog v-if="warningDialog.status" :warningDialog="warningDialog" ></warningdialog>
    </v-flex>
  </v-layout>
</template>


<script>
  import axios from '~/plugins/axios'
  import deletedialog from "~/components/deleteDialog.vue";
  import warningdialog from "~/components/warningDialog.vue";

  export default {
    middleware: 'authenticated',
    components: {
      deletedialog, warningdialog
    },
    layout: "dashboard",
    data() {
      return {
        apiUrl: process.env.apiUrl,
        headers: [
          { text: "Bild", value: "img", align: "left", sortable: false },
          { text: "Name", value: "name", align: "left", sortable: true },
          { text: "User", value: "user", align: "left", sortable: true },
          {
            text: "Beschreibung",
            value: "description",
            align: "left",
            sortable: true
          },
          { text: "Is Public", value: "user", align: "left", sortable: true },
          { text: "Erstellt am", value: "date", align: "left", sortable: true },
          { text: "", value: "edit", align: "left", sortable: false }
        ],
        search: "",
        dialog: {
          status: false,
          title: "Channel",
          deleteItem: "Channelname",
          itemId: ""
        },
        warningDialog: {
          status: false,
          title: "",
          text: "",
        }
      };
    },

    computed: {
      channels() {
        return this.$store.state.channels;
      },

    },

    created() {
      this.$store.commit("settoolbarTitle", "Channel");
    },

    methods: {
      async openDeleteDialog(itemId, itemName) {
        const responseVideos = await axios.get(`/graphql?query={videos(filter: {channelid: "${itemId}"}){_id}}`);
    
        if(responseVideos.data.data.videos.length > 0){
         
          this.warningDialog.title = "Dem Channel sind Videos zugeordnet!";
          this.warningDialog.text = `Der Channel kann nicht gelöscht werden, da ihm Videos zugeordnet sind. Bitte entfernen Sie zunächst diesen Channel (${itemName}) bei allen Videos.`;
          this.warningDialog.status = true
        } else {
          this.dialog.deleteItem = itemName;
        this.dialog.itemId = itemId;
        this.dialog.status = true;
        }
      },
      onCloseDialog() {
        axios.delete(`/channel/${this.dialog.itemId}`).then(
          response => {
            this.$store.commit(
              "setSnackbar",
              { text: `Channel ${this.dialog.deleteItem} wurde gelöscht`, color: '' }
            );
            axios
              .get(
              "/graphql?query={channels{name, description, created, imagepath, iconpath, _id}}"
              )
              .then(res => {
                this.$store.commit("setChannels", res.data.data.channels);
              })
              .catch(error => {
                this.$store.commit("setChannels", []);
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
        "/graphql?query={channels{name, description, created, imagepath, iconpath, _id, ispublic, users{username}}}"
        )
        .then(res => {
          store.commit("setChannels", res.data.data.channels);
        })
        .catch(error => {
          store.commit("setChannels", []);
          console.log(error);
        });
    }
  };
</script>