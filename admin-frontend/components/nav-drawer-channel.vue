<template>
  <div id="main-drawer">
    <v-navigation-drawer class="blue-grey darken-4" dark :mini-variant="mini" app floating height="auto" v-model="drawer">
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-action>
              <a href="http://beuthbox.beuth-hochschule.de/"><img src="/dashboard/beuthbox-logo.svg" height=30 class="drawer-title--img"></a>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-1">
        <v-divider></v-divider>
        <template v-for="item in items" >
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

          <div v-else>
          <v-list-tile  v-if="checkItem(item.title)" :key="item.title" nuxt :to="item.to" avatar>
            <v-list-tile-action style="align-items: center">
              <v-icon medium>{{item.icon}}</v-icon>
              <span class="list__custom__action--text">{{item.title}}</span>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

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
          { title: "Home", icon: "home", to: "/channel/home" },
          { title: "Channel", icon: "account_circle", to: "/channel/mychannel" },
          {
            icon: "video_library",
            iconexp: "keyboard_arrow_up",
            "icon-alt": "keyboard_arrow_down",
            title: "Videos",
            to: "/channel/videos",
            model: false,
            children: [
              { title: "add Video", icon: "add", to: "/channel/videos/add-new" },
            ]
          },
          { title: "Live", icon: "live_tv", to: "/channel/live" },
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
    },

    methods: {
      checkItem(item) {
        if(item == "Live" && !this.$store.state.user.currentChannel.liveenabled){
          return false
        }
        else { return true}
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