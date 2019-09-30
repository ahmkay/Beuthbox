<template>
  <v-layout row justify-center wrap>
    <v-flex xs12 class="mb-3">
      
      <v-toolbar dense flat class="elevation-1" color="white">
        <v-flex xs3>
        <v-text-field append-icon="search" hide-details single-line v-model="search"></v-text-field>
      </v-flex>
       
        <v-spacer></v-spacer>
        <v-btn  fab small color="error" nuxt to="/categories/add" class="elevation-2" >
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
    <v-flex xs12>

      <v-card>
        <v-data-table v-bind:headers='headers' :items='categories' :search='search'>
          <template slot="items" scope="props">
            <td style="width:10%">
              <v-avatar size="36px" slot="activator">
                <img :src="apiUrl + '/category' + props.item.iconpath">

              </v-avatar>
            </td>
            <td style="width:20%">{{ props.item.name }}</td>
            <td style="width:30%" class="data-table-desc">{{ props.item.description }}</td>
            <td style="width:10%">{{ props.item.created | formatDate }}</td>
            <td style="width:20%" class="text-xs-right">
              <v-btn flat icon color="primary" nuxt :to="'/categories/' + props.item._id">
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
  import warningdialog from "~/components/warningDialog.vue";
  import deletedialog from "~/components/deleteDialog.vue";

  export default {
    middleware: 'authenticated',
    components: {
      deletedialog, warningdialog
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
            text: "Beschreibung",
            value: "description",
            align: "left",
            sortable: true
          },
          { text: "Erstellt am", value: "date", align: "left", sortable: true },
          { text: "", value: "edit", align: "left", sortable: false }
        ],
        search: "",
        dialog: {
          status: false,
          title: "Kategorie",
          deleteItem: "Kategoriename",
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
      categories() {
        return this.$store.state.categories;
      },
      pages() {
        console.log(this.categories.length)
        return this.pagination.rowsPerPage ? Math.ceil(this.categories.length / this.pagination.rowsPerPage) : 0
      }

    },

    created() {
      this.$store.commit("settoolbarTitle", "Kategorien");
    },

    methods: {
      async openDeleteDialog(itemId, itemName) {

        const responseVideos = await axios.get(`/graphql?query={videos(filter: {categoryid: "${itemId}"}){_id}}`);
        
        if(responseVideos.data.data.videos.length > 0){
         
          this.warningDialog.title = "Der Kategorie sind Videos zugeordnet!";
          this.warningDialog.text = `Die Kategorie kann nicht gelöscht werden, da ihr Videos zugeordnet sind. Bitte entfernen Sie zunächst diese Kategorie (${itemName}) bei allen Videos.`;
          this.warningDialog.status = true
        } else {
          this.dialog.deleteItem = itemName;
        this.dialog.itemId = itemId;
        this.dialog.status = true;
        }
      },
      onCloseDialog() {
        console.log(this.dialog.deleteItem);
        axios.delete(`/category/${this.dialog.itemId}`).then(
          response => {
            this.$store.commit(
              "setSnackbar",
              { text: `Kategorie ${this.dialog.deleteItem} wurde gelöscht`, color: '' }
            );
            axios
              .get(
              "/graphql?query={categories{name, description, created, imagepath, iconpath _id}}"
              )
              .then(res => {
                this.$store.commit("setCategories", res.data.data.categories);
              })
              .catch(error => {
                this.$store.commit("setCategories", []);
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
        "/graphql?query={categories{name, description, created, imagepath, iconpath _id}}"
        )
        .then(res => {
          store.commit("setCategories", res.data.data.categories);
        })
        .catch(error => {
          store.commit("setCategories", []);
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