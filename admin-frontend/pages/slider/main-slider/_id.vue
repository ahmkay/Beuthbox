<template>
  <v-layout row justify-center>
    <v-flex xs8>
      <v-card>

        <v-card-title primary-title>
          <div class="headline">Kategorie {{category.name}}</div>
        </v-card-title>

        <v-card-text>
          <form ref="myForm" enctype="multipart/form-data">
            <v-text-field v-model="category.name" name="name" label="Name"></v-text-field>
            <v-text-field v-model="category.description" name="description" label="Beschreibung" multi-line></v-text-field>

            <v-layout row align-center>

              <v-flex xs1>
                <v-avatar size="50px" slot="activator">
                  <img :src="category.bigImage">
                </v-avatar>
              </v-flex>

              <v-flex>
                <v-text-field @click.native="onFocus('bigImage')" label="Großes Cover Image" v-model="category.imagefilename"  placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                <input type="file" name="category-image" ref="bigImage" @change="onFileChange($event, 'imagefilename', 'bigImage')" />
              </v-flex>

            </v-layout>

            <v-layout row align-center class="mt-3">

              <v-flex xs1>
                <v-avatar size="50px" slot="activator">
                  <img :src="category.smallImage">
                </v-avatar>
              </v-flex>

              <v-flex>
                <v-text-field @click.native="onFocus('smallImage')" label="Avatar Icon" v-model="category.iconfilename" 
                  placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                <input type="file" name="category-icon" ref="smallImage" @change="onFileChange($event, 'iconfilename', 'smallImage')" />
              </v-flex>

            </v-layout>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submit" color="primary">submit </v-btn>
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
        apiUrl: process.env.apiUrl,
        imagefilename: "",
        iconfilename: ""
      };
    },

    computed: {
      category() {
        return this.$store.state.category;
      }
    },

    methods: {

      submit() {

        var itemId = this.$route.params.id;
        const otherForm = new FormData(this.$refs.myForm);
        axios.put(`/category/${itemId}`, otherForm).then(
          response => {
            this.$store.commit("setSnackbar", {
              text: "Kategorie wurde geändert",
              color: ""
            });
            this.$router.push("/categories");
          },
          err => {
            this.$store.commit("setSnackbar", {
              text: "Fehler beim Editieren der Kategorie",
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
        `/graphql?query={category(id:"${params.id}"){name,description, iconfilename, imagefilename, iconpath, imagepath}}`
        )
        .then(res => {
          store.commit("settoolbarTitle", `Kategorie ${res.data.data.category.name}`)
          store.commit("setCategory", {
            name: res.data.data.category.name,
            description: res.data.data.category.description,
            bigImage:
              process.env.apiUrl + "/category" + res.data.data.category.imagepath,
            smallImage:
              process.env.apiUrl + "/category" + res.data.data.category.iconpath,
            imagefilename: res.data.data.category.imagefilename,
            iconfilename: res.data.data.category.iconfilename
          });
        })
        .catch(error => {
          store.commit("setCategories", []);
          console.log(error);
        });
    }

    // async asyncData({ params, error }) {
    //   try {
    //     const { data } = await axios.get(
    //       `/graphql?query={category(id:"${params.id}"){name,description, iconfilename, imagefilename, iconpath, imagepath}}`
    //     );
    //     return {
    //       name: data.data.category.name,
    //       description: data.data.category.description,
    //       bigImage:
    //         "/category" + data.data.category.imagepath,
    //       smallImage:
    //         "/category" + data.data.category.iconpath,
    //       imagefilename: data.data.category.imagefilename,
    //       iconfilename: data.data.category.iconfilename
    //     };
    //   } catch (e) {
    //     error({ message: "User not found", statusCode: 404 });
    //   }
    // }
  };
</script>


<style>
  input[type="file"] {
    display: none;
  }
</style>