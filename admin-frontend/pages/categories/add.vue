<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs8>

        <v-card>
          <v-card-title primary-title>
            <div class="headline">Neue Kategorie anlegen</div>
          </v-card-title>
          <v-card-text>
            <form ref="myForm" enctype="multipart/form-data">

              <v-text-field name="name" label="Kategorie Name"></v-text-field>

              <v-text-field name="description" label="Beschreibung" multi-line></v-text-field>

              <v-text-field @click.native="onFocus('bigImage')" label="Großes Cover Image" v-model="filenameBig" hint="Wird auf der Kategorie-Übersicht angezeigt" persistent-hint
                placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
              <input type="file" name="category-image" ref="bigImage" @change="onFileChange($event, 'filenameBig')" />

              <v-text-field @click.native="onFocus('smallImage')" label="Avatar Icon" v-model="filenameSmall" hint="Wird bei der Suche angezeigt" persistent-hint placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
              <input type="file" name="category-icon" ref="smallImage" @change="onFileChange($event, 'filenameSmall')" />
            </form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" color="primary">submit </v-btn>
          </v-card-actions>
        </v-card>

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
        filenameBig: "",

        filenameSmall: ""
      };
    },

    methods: {
      submit({ store }) {
        const otherForm = new FormData(this.$refs.myForm);

        axios.post(`/category`, otherForm).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: "Kategorie wurde erstellt",
              color: ""
            });

            this.$router.push("/categories");
          },
          err => {
            this.$store.commit("setSnackbar", {
              text: "Fehler beim Erstellen der Kategorie",
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

  };
</script>

<style>
  input[type="file"] {
    display: none;
  }
</style>