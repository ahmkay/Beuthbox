<template>
  <v-layout row justify-center wrap>

    <v-flex xs12 class="mb-3">

      <v-toolbar dense flat class="elevation-1" color="white">
        <v-flex xs3>
          <v-text-field append-icon="search" hide-details single-line></v-text-field>
        </v-flex>

        <v-spacer></v-spacer>
        <v-btn fab small color="error" nuxt to="/channels/add" class="elevation-2" disabled>
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>

    <v-flex xs12>

      <v-card>
        <v-data-table v-bind:headers='headers' :items='users' :search='search'>
          <template slot="items" scope="props">
            <td>{{ props.item.username }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.group }}</td>
            <td>{{ props.item.channels | categoryArrayToString}}</td>
            <td>{{ props.item.created | formatDate }}</td>
            <td style="width:20%" class="text-xs-right">
              <v-btn disabled flat icon color="primary" nuxt :to="'/categories/' + props.item._id">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn disabled flat icon color="primary" @click="openDeleteDialog(props.item._id, props.item.name)">
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
        headers: [
          { text: "Name", value: "username", align: "left", sortable: true },
          {
            text: "Email",
            value: "email",
            align: "left",
            sortable: true
          },
          { text: "Gruppe", value: "group", align: "left", sortable: true },
          { text: "Channels", value: "channel", align: "left", sortable: true },
          { text: "Erstellt am", value: "date", align: "left", sortable: true },
          { text: "", value: "edit", align: "left", sortable: false }
        ],
        search: "",
        dialog: {
          status: false,
          title: "Kategorie",
          deleteItem: "Kategoriename",
          itemId: ""
        }
      };
    },

    computed: {
      users() {
        return this.$store.state.user.allUsers;
      },

    },

    created() {
      this.$store.commit("settoolbarTitle", "User");
    },

    methods: {
      openDeleteDialog(itemId, itemName) {
        this.dialog.deleteItem = itemName;
        this.dialog.itemId = itemId;
        this.dialog.status = true;
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
        "/graphql?query={users{username, group, email, created, _id, channels{name}}}"
        )
        .then(res => {
          store.commit("user/SET_USERS", res.data.data.users);
        })
        .catch(error => {
          store.commit("user/SET_USERS", []);
          console.log(error);
        });
    }
  };
</script>