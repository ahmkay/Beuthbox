<template>
  <v-app>
    <navbar/>
    <!-- <main>
      
        <v-container fluid grid-list-xl>
          <v-layout row wrap>
          <nuxt />
          </v-layout>
        </v-container>
      
    </main> -->
    <main>
      <v-content>
        <v-container fluid>
          <nuxt />
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import navbar from '~/components/global-navbar.vue'
export default {
  components: {
    navbar
  }
}
</script>
