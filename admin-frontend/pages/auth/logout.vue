<template>
    <v-layout row justify-center>
        <v-flex xs4>
            <v-card>
                <v-toolbar flat dark color="primary">
                    <v-toolbar-title>Loggout</v-toolbar-title>
                </v-toolbar>

                <v-card-text primary-title class="text-xs-center">
                    <v-icon x-large color="success" class="mb-3">check_circle</v-icon>
                    <h3 class="headline mb-0">You are logged out!</h3>
                </v-card-text>
                </div>

            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("user/logout").then(() => {
      setTimeout(() => {
        this.$router.replace("/");
      }, 3000);
    });
  }
};
</script>