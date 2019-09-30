<template>

  <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs6>
            <videolist :title="'Latest Videos'" :videos="latestVideos" :link="'/videos/'"></videolist>
          </v-flex>
    
          <v-flex xs6>
            <videolist :title="'Most Viewed Videos'" :videos="mostedViewed" :link="'/videos/'"></videolist>
          </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import axios from "~/plugins/axios";
  import videolist from "~/components/video-list.component.vue";
  
  export default {
    middleware: 'authenticated',
    layout: "dashboard",

    components: {
      videolist
    },

    created() {
      this.$store.commit("setDrawerOpen", { isOpen: true });
      this.$store.commit("settoolbarTitle", "Admin Dashboard");
    },


    async asyncData({ query, error }) {
      let [mostedViewedResponse, latestVideosResponse] = await Promise.all([
      axios.get(`/graphql?query={videos(filter: {limit: "5", sort: "-views"}){name, posterImagePath, _id, views, uploaded} }`),
      axios.get(`/graphql?query={videos(filter: {limit: "5", sort: "-uploaded"}){name, posterImagePath, _id, views, uploaded} }`)
      ])
      return {
        mostedViewed: mostedViewedResponse.data.data.videos,
        latestVideos: latestVideosResponse.data.data.videos
      }
    }
  };
</script>