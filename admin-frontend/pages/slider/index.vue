<template>
    <v-layout column align-center>
        <v-container fluid grid-list-md>
            <v-layout row wrap>

                <v-flex xs12>
                    <v-card>
                        <v-card-text>
                            <div class="headline">Slider</div>
                            <span class="grey--text">Hier können die Slider erstellt und bearbeitet werden, die auf der Beuthbox zu sehen sind. Carousel-Slider die Blöcke, die
                                auf der Startseite angezeigt werden. Unter Slider lässt sich der Hauptslider auf der Startseite anpassen.</span>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs6>
                    <v-card>
                        <v-card-media src="/dashboard/carouselcard.bmp" height="200px"></v-card-media>
                        <v-card-title primary-title>
                            <div class="headline">Carousel-Slider</div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat light color="primary" nuxt to="/slider/carousel">Go To</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

                <v-flex xs6>
                    <v-card>
                        <v-card-media src="/dashboard/slidercard.bmp" height="200px"></v-card-media>
                        <v-card-title primary-title>
                            <div class="headline">Main-Slider</div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat light color="primary" nuxt to="/slider/main-slider">Go To</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>
    </v-layout>
</template>

<script>
    export default {
        middleware: 'authenticated',
        layout: "dashboard",
        created() {

            this.$store.commit("settoolbarTitle", "Slider");
        },


    };
</script>