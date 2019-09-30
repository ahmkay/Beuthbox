<template>
  <div id="main-drawer">
    <v-navigation-drawer class="blue-grey darken-4" dark :mini-variant="mini" app floating height="auto" v-model="drawer">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-action>
              <img @click="mini = !mini" src="/dashboard/beuthbox-logo.svg" height=30 class="drawer-title--img">
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-1">
        <v-divider></v-divider>
        <template v-for="item in items" v-if="mini">
          <v-menu v-if="item.children" open-on-hover right offset-x open-delay="300" content-class="drawer__submenu">
            <v-list-tile nuxt :to="item.to" slot="activator">
              <v-list-tile-action style="align-items: center">
                <v-icon medium>{{item.icon}}</v-icon>
                <span class="list__custom__action--text">{{item.title}}</span>
              </v-list-tile-action>
            </v-list-tile>
            <v-list class="blue-grey darken-4 pt-0 pb-0 drawer__submenu" dark dense>
              <v-list-tile v-for="(child, i) in item.children" :key="i" nuxt :to="child.to">
                <v-list-tile-avatar>
                  <v-icon class="white--text">{{ child.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-list-tile v-else :key="item.title" nuxt :to="item.to" avatar>
            <v-list-tile-action style="align-items: center">
              <v-icon medium>{{item.icon}}</v-icon>
              <span class="list__custom__action--text">{{item.title}}</span>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>

        <template v-for="item in items" v-if="!mini">
          <v-list-group v-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.iconexp : item['icon-alt'] }}</v-icon>
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
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        showMenu: false,
        mini: true,
        items: [
          { title: "Home", icon: "home", to: "/home" },
          { title: "Kategorien", icon: "label", to: "/categories" },
          { title: "User", icon: "people", to: "/users" },
          { title: "Channel", icon: "account_circle", to: "/channels" },
          {
            icon: "video_library",
            iconexp: "keyboard_arrow_up",
            "icon-alt": "keyboard_arrow_down",
            title: "Videos",
            to: "/videos",
            model: false,
            children: [
              { title: "add Video", icon: "add", to: "/videos/add-new" },
              {
                title: "Import",
                icon: "cloud_download",
                to: "/videos/import"
              }
            ]
          },
          {
            icon: "view_day",
            iconexp: "keyboard_arrow_up",
            "icon-alt": "keyboard_arrow_down",
            title: "Slider",
            to: "/slider",
            model: false,
            children: [
              { title: "Carousels", icon: "view_carousel", to: "/slider/carousel" },
              { title: "Main-Slider", icon: "video_label", to: "/slider/main-slider" },
            ]
          }
        ]
      };
    },

    computed: {
      drawer: {
        get() {
          return this.$store.state.drawerOpen;
        },
        set(isOpen) {
          this.$store.commit("setDrawerOpen", { isOpen });
        }
      }
    }
  };
</script>

<style>
  #main-drawer .drawer-title--img:hover {
    cursor: pointer;
  }

  #main-drawer .menu {
    display: unset !important;
  }

  .drawer__submenu {
    overflow-y: hidden;
    box-shadow: unset !important;
    -webkit-box-shadow: unset !important;
  }

 
  .drawer__submenu .list__tile--active {
    color: #fff !important;
    background: #00a5a5;
  }

  #main-drawer .navigation-drawer {
    max-height: max-content !important;
    min-height: 100%;
  }

  #main-drawer .list__tile__content {
    padding-right: 15px;
  }

  #main-drawer .list__tile--active {
    color: #fff !important;
    background: #00a5a5;
  }

  #main-drawer .list__tile--active:hover {
    background: #00a5a5;
  }

  #main-drawer .list__tile--link:hover {
    background: #00a5a5;
  }

  .drawer__submenu .list__tile--link:hover {
    background: #00a5a5;
  }

  #main-drawer .list__tile {
    height: 64px;
  }

  #main-drawer .list__custom__action--text {
    font-size: 12px;
    font-weight: lighter;
  }

  #main-drawer .menu__activator--active {
    background: #00a5a5;
  }

  #main-drawer .menu__activator--active::after {
    border-width: 4px;
    border-right-color: #263238;
    right: 0;
    border: 8px solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;

    pointer-events: none;
    border-right-color: #263238;
    top: 50%;
    margin-top: -8px;
  }
</style>