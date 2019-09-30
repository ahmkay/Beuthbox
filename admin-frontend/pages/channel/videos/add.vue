<template>
  <videoupload/>
</template>

<script>
  import videoupload from "~/components/video-upload.component.vue";

  export default {
    middleware: 'authenticated-channel',
    layout: "dashboard-channel",
    components: {
      videoupload
    },

    
  };
</script>

<style>
</style>