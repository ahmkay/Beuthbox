<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs8>

        <v-card>
          <v-card-text>
            <div class="headline">Neuen Slide anlegen</div>
            <form ref="myForm" enctype="multipart/form-data">
              <v-container grid-list-md>
                <v-layout row align-center wrap>
                  <v-flex>
                    <v-text-field name="name" label="Slider Name (intern)"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field name="position" label="Position/Reihenfolge"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-select name="active" :items="activeSelect" label="Active"></v-select>
                  </v-flex>
                </v-layout>

                <v-text-field name="title" label="Title auf Slider"></v-text-field>

                <v-text-field name="description" label="Text auf Slider" placeholder="<p>This can be <span style='color:red'>HTML</span>!</p>" multi-line></v-text-field>
                <v-layout row align-center wrap>
                  <v-flex>
                    <v-text-field name="buttontext" label="Button Text"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-text-field name="buttonlink" label="Button Link (URL)"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row align-center wrap>
                  <v-flex xs7>
                      <img :src="image" style="width: 100%">
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field @click.native="onFocus('bigImage')" label="Image min. 1280x400px" v-model="filenameBig" placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                    <input type="file" name="slider-image" ref="bigImage" @change="onFileChange($event, 'filenameBig')" />
                  </v-flex>
                </v-layout>

              </v-container>
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
        activeSelect: [true, false],
        filenameBig: "",
        image: "http://via.placeholder.com/1280x400"
      };
    },

    methods: {
      submit({ store }) {
        const otherForm = new FormData(this.$refs.myForm);

        axios.post(`/slider`, otherForm).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: "Kategorie wurde erstellt",
              color: ""
            });

            this.$router.push("/slider/main-slider");
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
        var input = event.target;

        if (input.files && input.files[0]) {
          var reader = new FileReader();
          var vm = this;

          reader.onload = function (e) {
            vm.image = e.target.result;
          };

          reader.readAsDataURL(input.files[0]);
        }
      }
    },

  };
</script>

<style>
  input[type="file"] {
    display: none;
  }
</style>