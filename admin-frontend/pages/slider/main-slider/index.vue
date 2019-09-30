<template>
  <v-layout row justify-center wrap>
    <v-flex xs12 class="mb-3">
      
      <v-toolbar dense flat class="elevation-1" color="white">
        <v-flex xs3>
        <v-text-field append-icon="search" hide-details single-line v-model="search"></v-text-field>
      </v-flex>
       
        <v-spacer></v-spacer>
        <v-btn  fab small color="error" nuxt to="/slider/main-slider/add" class="elevation-2" >
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
    <v-flex xs12>

      <v-card>
        <v-data-table v-bind:headers='headers' :items='slider' :search='search'>
          <template slot="items" scope="props">
            <td style="width:30%">
              
                <img :src="apiUrl + '/slider' + props.item.imagepath" style="max-width: 100%">

            </td>
            <td style="width:20%">{{ props.item.name }}</td>
            <td style="width:10%" class="data-table-desc">{{ props.item.active }}</td>
            <td style="width:10%" class="data-table-desc">{{ props.item.position }}</td>
            <td style="width:10%">{{ props.item.created | formatDate }}</td>
            <td style="width:20%" class="text-xs-right">
              <v-btn flat icon color="primary" nuxt :to="'/slider/main-slider/' + props.item._id" disabled>
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

    </v-flex>
  </v-layout>
</template>


<script>
  import axios from '~/plugins/axios'
  import deletedialog from "~/components/deleteDialog.vue";

  export default {
    middleware: 'authenticated',
    components: {
      deletedialog
    },
    layout: "dashboard",
    data() {
      return {
        apiUrl: process.env.apiUrl,
        pagination: {},
        headers: [
          { text: "Bild", value: "name", align: "left", sortable: false },
          { text: "Name", value: "name", align: "left", sortable: true },
          {
            text: "Active",
            value: "description",
            align: "left",
            sortable: true
          },
          { text: "Position/Reihenfolge", value: "name", align: "left", sortable: true },
          { text: "Erstellt am", value: "date", align: "left", sortable: true },
          { text: "", value: "edit", align: "left", sortable: false }
        ],
        search: "",
        dialog: {
          status: false,
          title: "Slider",
          deleteItem: "Slidername",
          itemId: ""
        }
      };
    },

    computed: {
      slider() {
        return this.$store.state.sliders;
      },


    },

    created() {
      this.$store.commit("settoolbarTitle", "Slider - Main-Slider");
    },

    methods: {
      openDeleteDialog(itemId, itemName) {
        this.dialog.deleteItem = itemName;
        this.dialog.itemId = itemId;
        this.dialog.status = true;
      },
      onCloseDialog() {
        console.log(this.dialog.deleteItem);
        axios.delete(`/slider/${this.dialog.itemId}`).then(
          response => {
            this.$store.commit(
              "setSnackbar",
              { text: `Slider ${this.dialog.deleteItem} wurde gelöscht`, color: '' }
            );
            axios
              .get(
              "/graphql?query={mainsliders{name, description, created, imagepath, _id, active, position}}"
              )
              .then(res => {
                this.$store.commit("setSliders", res.data.data.mainsliders);
              })
              .catch(error => {
                this.$store.commit("setSliders", []);
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
        "/graphql?query={mainsliders{name, description, created, imagepath, _id, position, active}}"
        )
        .then(res => {
          store.commit("setSliders", res.data.data.mainsliders);
        })
        .catch(error => {
          store.commit("setSliders", []);
          console.log(error);
        });
    }
  };
</script>

<style>
.toolbar-input-divider {
  height: 100%;
  width: 1px;
  background-color: rgba(0,0,0,.12);
  margin: 0 5px;
}
</style>