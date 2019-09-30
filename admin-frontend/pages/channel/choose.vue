<template>
    <v-container fluid grid-list-md>
        <v-layout row justify-center wrap>
            <v-flex xs12 class="text-xs-center">
                <h3 class="headline mb-0">You are logged in. Please choose your Channel:</h3>
            </v-flex>
            <v-flex xs3 v-for="(channel, i) in user.channels" :key="i">
                <v-card class="choose-card">
                    <v-card-media :src="apiUrl + '/channel' + channel.imagepath" height="150px" @click="chooseChannel(i)">
                    </v-card-media>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{channel.name}}</h3>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn color="primary" block @click="chooseChannel(i)">Auswählen</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>


<script>
import axios from '~/plugins/axios'

    export default {
        middleware: 'authenticated-channel',
        data() {
            return {
                apiUrl: process.env.apiUrl,
            }
        },
        computed: {
            user() {
                return this.$store.state.user.userData;
            },
        },

        methods: {
            chooseChannel(index) {
                let channelId = this.user.channels[index]._id
                axios
                    .get(
                    `/graphql?query={channel(id:"${channelId}"){_id, name,description, iconfilename, imagefilename, iconpath, imagepath, liveenabled, ispublic, views, videosOnlyPrivate, canAddLowerThirds, canChangeTitle, canChangeAccessToChannel, users{username, _id}, liveevent{islive, title, subtitle, description, date, time, duration, haspassword, password, key, url}}}`
                    )
                    .then(res => {
                        this.$store.commit("user/SET_CHANNEL", res.data.data.channel)
                        setTimeout(() => { this.$router.replace('/channel/home'); }, 500);
                    })
                    .catch(e => {
                        error({ statusCode: 404, message: "Something went wrong" });
                    });
            }
        }
    }
</script>

<style>
    .choose-card .card__media__content:hover {
        cursor: pointer
    }
</style>