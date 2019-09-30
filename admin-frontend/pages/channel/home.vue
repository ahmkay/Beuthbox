<template>
  <v-container grid-list-md>
    <v-layout row justify-center wrap>

      <v-flex xs12 class="mb-3">

        <v-toolbar dense class="elevation-1" color="white" height="100">
          <v-avatar size="80px" tile="tile">
            <img :src="apiUrl + '/channel' + channel.iconpath">
          </v-avatar>
          <v-toolbar-title>{{channel.name}}
            <a :href="frontendUrl + '/channel/' + channel._id" rel="noopener" target="_blank" class="caption">View Channel</a>
            <br>
            <span class="body-2 grey--text">Logged in as User: {{user.username}}</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-title class="text-xs-center" style="margin-right: 16px">{{channel.views}}
            <br>
            <v-tooltip bottom>
              <span class="body-2 grey--text" slot="activator">Visitors</span>
              <span>Anzahl der Besucher Ihrer Channel-Seite</span>
            </v-tooltip>
          </v-toolbar-title>
          <div class="toolbar-input-divider"></div>
          <v-toolbar-title class="text-xs-center" style="margin-right: 16px">{{views}}
            <br>
            <v-tooltip bottom>
              <span class="body-2 grey--text" slot="activator">Views</span>
              <span>Summe der Views Ihrer Videos</span>
            </v-tooltip>
          </v-toolbar-title>
          <div class="toolbar-input-divider"></div>
          <v-toolbar-title class="text-xs-center">{{videos}}
            <br>
            <span class="body-2 grey--text">Videos</span>
          </v-toolbar-title>
        </v-toolbar>
      </v-flex>

      <v-alert color="warning " icon="priority_high " dismissible v-model="showWarn" class="mb-2" style="width: 100%">
        You still have default images as channel icon or channel image. It's highly recommended to change these. Please go to "Channel" on the left pannel to upload
        your own.
      </v-alert>

      <v-flex xs6>
        <videolist :title="'Latest Videos'" :videos="latestVideos" :link="'/channel/videos/'"></videolist>
      </v-flex>

      <v-flex xs6>
        <videolist :title="'Most Viewed Videos'" :videos="mostedViewed" :link="'/channel/videos/'"></videolist>
      </v-flex>

    </v-layout>
  </v-container>
</template>


<script>
  import axios from "~/plugins/axios";
  import { mapGetters } from "vuex";
  import videolist from "~/components/video-list.component.vue";

  export default {
    middleware: 'authenticated-channel',
    layout: "dashboard-channel",

    components: {
      videolist
    },

    data() {
      return {
        apiUrl: process.env.apiUrl,
        frontendUrl: process.env.frontendUrl,
        tile: true,
        views: 0,
        visitors: 0,
        videos: 0,
        mostedViewed: [],
        latestVideos: [],
      };
    },

    computed: {
      user() {
        return this.$store.state.user.userData;
      },
      channel() {
        return this.$store.state.user.currentChannel;
      },

      showWarn: {
        get() {
          return this.$store.getters["user/getWarn"]
        },
        set(warn) {
          this.$store.commit("user/SET_WARN", { warn })
        }
      },
    },

    async mounted() {
      const channelId = this.$store.state.user.currentChannel._id;
      const response = await axios.get(`/graphql?query={channelVideoCount(id: "${channelId}"){_id, total} channelVideoViewCount(id: "${channelId}"){_id, total}}`);
      const mostedViewedResponse = await axios.get(`/graphql?query={videos(filter: {channelid: "${channelId}", limit: "3", sort: "-views"}){name, posterImagePath, _id, views, uploaded} }`);
      const latestVideosResponse = await axios.get(`/graphql?query={videos(filter: {channelid: "${channelId}", limit: "3", sort: "-uploaded"}){name, posterImagePath, _id, views, uploaded} }`);

      this.mostedViewed = mostedViewedResponse.data.data.videos;
      this.latestVideos = latestVideosResponse.data.data.videos;

      this.views = response.data.data.channelVideoViewCount.total;
      this.videos = response.data.data.channelVideoCount.total;
    },

    created() {
      this.$store.commit("settoolbarTitle", `My Channel: ${this.$store.state.user.currentChannel.name}`);
    },

    methods: {
      test() {
        console.log(this.mostedViewed)
      }
    },


  };
</script>

<style>
  .toolbar-input-divider {
    height: 80%;
    width: 1px;
    background-color: rgba(0, 0, 0, .12);
    margin: 0 5px;
  }

  .video-card-list__item:hover {
    cursor: pointer;
    background: #eee
  }
</style>