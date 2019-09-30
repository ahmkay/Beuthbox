<template>
  <v-container grid-list-md>
    <v-layout row justify-center wrap>

Redirecting to Home!

    </v-layout>
  </v-container>
</template>


<script>

  export default {
    middleware: 'authenticated-channel',

    layout: "dashboard-channel",

    created() {
      this.$router.push("/channel/home");
    },


  };
</script>