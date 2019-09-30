<template>
  <v-app>

    <navdrawer></navdrawer>

    <v-toolbar light dense app class="grey lighten-2 main-toolbar">
      <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
      <ul class="breadcrumb">
        <li v-for="(breadcrumb, index) in breadcrumbs">
          <nuxt-link :to="breadcrumb.address">
            <span itemprop="name">{{breadcrumb.name}}</span>
          </nuxt-link>

        </li>
      </ul>
      <v-spacer></v-spacer>
      
      <v-menu bottom right offset-x offset-y>
        <v-btn icon slot="activator">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile nuxt to="/auth/logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
            <nuxt></nuxt>
            
        </v-container>
      </v-content>
    </main>
    <div name="notifications" class="notifications">

      <v-snackbar :timeout="6000" v-model="snackbar" :color="$store.state.snackbar.color" :key="snackbar.text">
        {{ $store.state.snackbar.text }}
        <v-btn dark flat color="primary" @click.native="$store.commit('unsetSnackbar', false)">Close</v-btn>
      </v-snackbar>

      <v-snackbar v-for="notification in notifications" v-model="notification.show" :key="notification.id" :value="true" :timeout="0" class="snackbar-progress">
        {{ notification.text }}
        <v-progress-linear v-model="notification.uploadProgess"></v-progress-linear>
        <v-btn light icon @click.native="removeNotification(notification.id)">
          <v-icon light>close</v-icon>
        </v-btn>
      </v-snackbar>

    </div>

  </v-app>
</template>

<script>
  import navdrawer from "~/components/nav-drawer.vue";
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      navdrawer
    },

    mounted() {
      window.addEventListener('beforeunload', this.checkForFileUpload)
    },

    methods: {
      checkForFileUpload: function checkForFileUpload(e) {
        if (this.notifications.length > 0) {
          e = e || window.event;
          // For IE and Firefox prior to version 4
          if (e) {
            e.returnValue = 'Sure?';
          }
          // For Safari
          return 'Sure?';
        }
      },
      toggleDrawer() {
        this.$store.commit("setDrawerOpen", { isOpen: !this.drawer });
      },
      ...mapMutations(['removeNotification'])
    },

    computed: {
      ...mapState(['notifications']),
      drawer: {
        get() {
          return this.$store.state.drawerOpen;
        },
        set(isOpen) {
          this.$store.commit("setDrawerOpen", { isOpen });
        }
      },
      snackbar: {
        get() {
          return this.$store.state.showsnack;
        },
        set(value) {
          this.$store.commit("unsetSnackbar", value);
        }
      },

      toolbarTitle() {
        return this.$store.state.toolbarTitle;
      },

      breadcrumbs() {
        let output = [
          {
            address: "/home",
            name: "Home"
          }
        ];
        let address = "";
        var split = this.$route.path.split("/");
        split.forEach(function (crumb, index) {
          if (crumb == "home") {
            return output;
          }
          if (crumb == "add-new") {
            return output;
          }
          if (crumb !== "") {
            address += "/" + crumb;
            output.push({
              address: address,
              name: crumb.replace(/-/g, " ")
            });
          }
        });

        return output;
      }
    }
  };
</script>

<style>
  .notifications {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 50%;
    margin-left: -284px;
  }

  .notifications .snack {
    display: block;
    height: auto;
    position: relative;
  }

  .snack__content {
    width: 100vw;
    text-align: center;
  }

  .snack--bottom {
    bottom: 0;
  }

  /* Style the list */

  ul.breadcrumb {
    padding: 10px 16px;
    list-style: none;
  }

  /* Display list items side by side */

  ul.breadcrumb li {
    display: inline;
    font-size: 10px;
    text-transform: capitalize;
  }

  /* Add a slash symbol (/) before/behind each list item */

  ul.breadcrumb li+li:before {
    padding: 8px;
    content: "\003e";
  }

  /* Add a color to all links inside the list */

  ul.breadcrumb li a {
    color: inherit;
    text-decoration: none;
  }

  /* Add a color on mouse-over */

  ul.breadcrumb li a:hover {
    color: inherit;
    opacity: 0.7;
    text-decoration: none;
  }
</style>