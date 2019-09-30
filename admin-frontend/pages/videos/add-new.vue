<template>
  <v-container grid-list-md>
    <v-layout row justify-center wrap>


        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="primary"></v-progress-circular>

    </v-layout>
  </v-container>
</template>


<script>

  export default {
    middleware: 'authenticated',

    layout: "dashboard",

    beforeCreate() {
      this.$router.push("/videos/add");
    },


  };
</script>