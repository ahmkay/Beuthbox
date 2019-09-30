<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" persistent app disable-route-watcher class="grey lighten-4 drawer">
      <v-list dense class="pt-0">
        <template v-for="item in items">
          <v-list-group v-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" nuxt :to="child.to">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.title }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

          <v-list-tile v-else :key="item.title" nuxt :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <navbar/>

    <v-toolbar color="primary" light dense app clipped-left>
      <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
      <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
      <ul class="breadcrumb">
        <li v-for="(breadcrumb, index) in breadcrumbs">
          <nuxt-link :to="breadcrumb.address">
            <span itemprop="name">{{breadcrumb.name}}</span>
          </nuxt-link>

        </li>
      </ul>

      <!-- <v-breadcrumbs icons divider="forward">
                    <v-breadcrumbs-item v-for="item in breadcrumbs" :key="item.name" nuxt :to="item.address" :disabled="false">
                      {{ item.name }}
                    </v-breadcrumbs-item>
                  </v-breadcrumbs> -->
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <nuxt />
        </v-container>
      </v-content>
    </main>
    

    <v-snackbar :timeout="6000" v-model="snackbar" :color="$store.state.snackbar.color">
      {{ $store.state.snackbar.text }}
      <v-btn dark flat color="primary" @click.native="$store.commit('unsetSnackbar', false)">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import navbar from "~/components/global-navbar.vue";

export default {
  components: {
    navbar
  },
  data() {
    return {
      items: [
        { title: "Admin Dashboard", icon: "dashboard", to: "/home" },
        { title: "Kategorien", icon: "label", to: "/categories" },
        { title: "User", icon: "people", to: "/users" },
        { title: "Channel", icon: "account_circle", to: "/channels" },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          title: "Videos",
          model: false,
          children: [
            { title: "Videos", icon:"video_library", to:"/videos" },
            { title: "Import", icon:"cloud_download", to:"/videos/import" },
          ]
        }
      ]
    };
  },

  methods: {
    toggleDrawer() {
      this.$store.commit("setDrawerOpen", { isOpen: !this.drawer });
    }
  },

  computed: {
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
          address: "/",
          name: "Home"
        }
      ];
      let address = "";
      var split = this.$route.path.split("/");
      split.forEach(function(crumb, index) {
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
.drawer {
  padding-top: 115px !important;
  
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
ul.breadcrumb li + li:before {
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