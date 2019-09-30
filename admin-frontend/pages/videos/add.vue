<template>
    <videoupload/>
  </template>
  
  <script>
    import videoupload from "~/components/video-upload.component.vue";
  
    export default {
      middleware: 'authenticated',
      layout: "dashboard",
      components: {
        videoupload
      },
  
      
    };
  </script>
  
  <style>
  </style>