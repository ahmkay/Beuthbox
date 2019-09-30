<template>
    <div>
        <v-layout row justify-center>
            <v-flex xs12>

                <v-card>
                    <v-card-text>
                        <div class="headline">Neuen Carousel-Slider anlegen</div>
                        <v-form>
                            <v-container grid-list-md>
                                <v-layout row wrap justify-center>
                                    <v-flex xs3>
                                        <v-text-field v-model="slider.name" label="Slider Titel"></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-text-field v-model="slider.position" label="Position"></v-text-field>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-select v-model="slider.occurrence" :items="occurranceSelect" label="Occurrance" multiple></v-select>
                                    </v-flex>
                                    <v-flex xs3>
                                        <v-select v-model="slider.active" :items="activeSelect" label="Activ"></v-select>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>

                        <v-layout row wrap>
                            <div style="width: 45%">
                                <v-card>
                                    <v-card-text>

                                        <div class="headline">Alle Videos</div>
                                        <span class="grey--text">Wähle Videos aus, die im Carousel angezeigt werden sollen.</span>

                                        <v-text-field append-icon="search" hide-details single-line v-model="searchAdd"></v-text-field>
                                    </v-card-text>
                                    <v-data-table v-bind:headers='headersAdd' :items='videos' :search='searchAdd' v-model="selectedAdd" select-all item-key="name">
                                        <template slot="items" scope="props">
                                            <td style="width:10%">
                                                <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                                            </td>
                                            <td>{{ props.item.name }}</td>
                                        </template>
                                    </v-data-table>

                                </v-card>
                            </div>

                            <div style="width: 10%" class="button-group">
                                <v-btn fab dark small color="primary" @click="add">
                                    <v-icon dark>chevron_right</v-icon>
                                </v-btn>

                                <v-btn fab dark small color="primary" @click="remove">
                                    <v-icon dark>chevron_left</v-icon>
                                </v-btn>
                            </div>

                            <div style="width: 45%">
                                <v-card>
                                    <v-card-text>

                                        <div class="headline">Gewählte Videos</div>
                                        <span class="grey--text">Diese Videos werden im Carousel angezeigt.</span>
                                        <v-text-field append-icon="search" hide-details single-line v-model="searchCurrent"></v-text-field>

                                    </v-card-text>
                                    <v-data-table v-bind:headers='headersCurrent' :items='slider.videos' :search='searchCurrent' v-model="selectedCurrent" select-all item-key="name">
                                        <template slot="items" scope="props">
                                            <td style="width:10%">
                                                <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                                            </td>
                                            <td>
                                                {{ props.item.name }}
                                            </td>
                                            <td>
                                                <v-edit-dialog lazy> {{ props.item.position }}
                                                    <v-text-field slot="input" label="Edit" v-model="props.item.position" single-line></v-text-field>
                                                </v-edit-dialog>
                                            </td>
                                        </template>
                                    </v-data-table>
                                </v-card>
                            </div>

                        </v-layout>

                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="submit" color="primary">submit</v-btn>
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
        middleware: 'authenticated',
        layout: "dashboard",
        created() {
            this.$store.commit("settoolbarTitle", `Slider - Carousels hinzufügen`);
        },

        data() {
            return {
                activeSelect: [true, false],
                occurranceSelect: ["Home", "Playerseite"],
                searchAdd: "",
                selectedAdd: [],
                searchCurrent: "",
                selectedCurrent: [],
                slider: {
                    name: "",
                    position: "",
                    active: false,
                    videos: [],
                    occurrence: []
                },
                currentVideos: [],
                headersAdd: [
                    { text: "Name", value: "name", align: "left", sortable: true },
                ],
                headersCurrent: [
                    { text: "Name", value: "name", align: "left", sortable: true },
                    { text: "Position", value: "position", align: "left", sortable: true },
                ],
            };
        },

        computed: {
            videos() {
                return this.$store.state.videos;

            }
        },

        methods: {
            test() {
                console.log(this.currentVideos)
            },
            remove() {
                this.$store.commit("concatVideos", this.selectedCurrent);
                this.slider.videos = this.slider.videos.filter(item => !this.selectedCurrent.includes(item));

                this.selectedCurrent = [];
            },
            add() {
                this.$store.commit("filterVideos", this.selectedAdd);
                let newVideos = this.selectedAdd.map((obj) => {
                    obj.position = '99';
                    return obj;
                })
                let parsedVideos = JSON.parse(JSON.stringify(newVideos));
                this.slider.videos = this.slider.videos.concat(parsedVideos);

                this.selectedAdd = [];


            },
            submit({ store }) {

                axios.post(`/carousel`, this.slider).then(
                    response => {
                        this.$store.commit("setSnackbar", {
                            text: "Slider wurde erstellt",
                            color: ""
                        });

                        this.$router.push("/slider/carousel");
                    },
                    err => {
                        this.$store.commit("setSnackbar", {
                            text: "Fehler beim Erstellen des Sliders",
                            color: "error"
                        });
                        console.log(err);
                    }
                );
            },
        },

        fetch({ store, params }) {
            return axios
                .get(
                '/graphql?query={videos(filter: {status: "finished"}){name, _id}}'
                )
                .then(res => {

                    store.commit("setVideos", res.data.data.videos);
                })
                .catch(error => {
                    store.commit("setVideos", []);
                    console.log(error);
                });
        }
    };


</script>

<style>
    .button-group {
        padding-top: 200px;
        display: flex;
        flex-direction: column;
        align-items: center
    }
</style>