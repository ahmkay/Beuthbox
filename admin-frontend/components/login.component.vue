<template>
    <v-layout row justify-center>
        <v-flex xs4>
            <v-card>
                <v-toolbar flat dark color="primary">
                    <v-toolbar-title>Login</v-toolbar-title>
                </v-toolbar>
                <v-alert color="error" icon="warning" dismissible value="true" v-if="formError">
                    {{ formError }}
                </v-alert>
                <div v-if="!loading">
                    <div v-if="!$store.state.user.userData">
                        <v-card-text>
                            <v-form @submit.prevent="login">
                                <v-text-field label="Username" type="text" v-model="formUsername" name="username" />
                                <v-text-field label="Passwort" type="password" v-model="formPassword" name="password" />
                                <v-btn @click="login" dark color="accent" type="submit">Login</v-btn>
                            </v-form>
                        </v-card-text>

                    </div>
                    <div v-else>
                        <v-card-text primary-title class="text-xs-center">
                            <v-icon x-large color="success" class="mb-3">check_circle</v-icon>
                            <h3 class="headline mb-0">You are logged in!</h3>
                        </v-card-text>
                    </div>
                </div>
                <div v-if="loading">
                    <v-card-text class="text-xs-center">
                        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="primary"></v-progress-circular>
                        <h5>Loading...</h5>
                    </v-card-text>
                </div>
            </v-card>

        </v-flex>
    </v-layout>
</template>

<script>
    import axios from '~/plugins/axios'
    export default {
        data() {
            return {
                formError: null,
                formUsername: "",
                formPassword: "",
                loading: false
            };
        },


        methods: {

            login() {
                this.loading = true;
                this.$store.dispatch("user/login", {
                    username: this.formUsername,
                    password: this.formPassword
                }).then(user => {

                    this.formUsername = "";
                    this.formPassword = "";
                    this.formError = null;
                    this.loading = false;
                    if (user.group == "admin") {
                        setTimeout(() => { this.$router.replace('/home'); }, 2000);
                    }
                    if (user.group == "channel") {
                        if (user.channels.length > 1) {
                            console.log("choose your channel")

                            this.$router.replace('/channel/choose')
                        }
                        else if (user.channels.length == 1) {
                            this.$store.commit("user/SET_CHANNEL", user.channels[0])
                            setTimeout(() => { this.$router.replace('/channel/home'); }, 2000);
                        }
                        else {
                            this.formError = "You don't have a Channel associated! Please conntact your Admin"
                        }
                      

                    }
                    //     setTimeout(() => { this.$router.replace('/home'); }, 2000);
                
                }, error => {
                    this.formError = error.message;
                    this.loading = false;
                })
            }

        }
    };
</script>

<style>
</style>