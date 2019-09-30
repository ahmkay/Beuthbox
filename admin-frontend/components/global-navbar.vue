 <template>
  <v-toolbar color="white" light app clipped-left flat height="64">
    <v-toolbar-title>
      <a href="http://beuthbox.beuth-hochschule.de/"><img src="/dashboard/beuthbox-logo.svg" height=30 class="drawer-title--img"></a>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-if="isAuthenticated && !isChannel" nuxt to="/home">Admin</v-btn>
      <v-btn flat v-if="isAuthenticated && isChannel" nuxt to="/channel/home">Channel Dashboard</v-btn>
      <v-btn flat v-if="!isAuthenticated" nuxt to="/auth/login">Login</v-btn>
      <v-btn flat v-else nuxt to="/auth/logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({ isAuthenticated: 'user/isAuthenticated', isChannel: 'user/isChannel' })
};
</script>