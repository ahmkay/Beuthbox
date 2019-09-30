<template>
    <v-card>
        <v-card-title primary-title>
            <h3 class="headline mb-0">{{title}}</h3>
        </v-card-title>
        <v-card-text v-if="videos.length > 0">

            <v-container fluid grid-list-md>
                <v-layout row wrap v-for="video in videos" :key="video._id" @click="$router.push(link + video._id )" class="video-card-list__item">
                    <v-flex class="video-card-list__item--media" d-flex xs4>
                        <img :src="video.posterImagePath" height="90" v-if="video.posterImagePath.indexOf('engage-player') > 1">
                        <img :src="apiUrl + '/videos' + video.posterImagePath" height="90" v-else>
                    </v-flex>
                    <v-flex class="" d-flex xs8>
                        <v-layout row wrap style="max-width: 100%">
                            <v-flex class="title grey--text data-table-desc" xs12>
                                {{video.name}}
                            </v-flex>
                            <v-flex class="body-1 grey--text" xs12>
                                <v-tooltip bottom>
                                    <v-icon slot="activator">timeline</v-icon>
                                    <span>Views</span>
                                </v-tooltip>
                                {{video.views}}
                            </v-flex>
                            <v-flex class="body-1 grey--text" xs12>
                                <v-tooltip bottom>
                                    <v-icon slot="activator">today</v-icon>
                                    <span>Uploaddatum</span>
                                </v-tooltip>
                                {{video.uploaded | formatDateDT}}
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>

        </v-card-text>

        <v-card-text v-else>
            There are no videos...Add one!
            <v-btn color="error" nuxt to="link + '/add-new'" small>
                <v-icon left>add</v-icon>Video hochladen
            </v-btn>

        </v-card-text>

        <v-card-actions>
            <v-btn flat color="primary" nuxt :to="link">Go to videos</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        props: ['videos', 'title', 'link'],
        data() {
            return {
                apiUrl: process.env.apiUrl,
            }
        }
    };
</script>

<style>
      .video-card-list__item:hover {
    cursor: pointer;
    background: #eee
  }
</style>