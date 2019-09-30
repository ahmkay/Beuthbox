<template>
    <div>
        <v-layout row justify-center>

            <v-flex xs10>
                <h5>Neues Video hochladen</h5>
                <div v-if="progressValue == 100 && !showProgressbar">
                    <v-btn color="error" nuxt to="/channel/videos/add-new" small v-if="!currentChannel">
                        <v-icon left>add</v-icon>Weiteres Video hochladen
                    </v-btn>
                    <v-btn color="error" nuxt to="/channel/videos/add-new" small v-if="!currentChannel">
                        <v-icon left>add</v-icon>Weiteres Video hochladen
                    </v-btn>
                </div>
                <v-layout row wrap align-center v-if="showProgressbar">
                    <v-flex class="flex-grow">
                        <v-progress-linear v-model="progressValue"></v-progress-linear>
                    </v-flex>
                    <v-flex class="flex-shrink primary--text body-2">
                        {{progressValue}}%
                    </v-flex>
                </v-layout>


                <v-stepper v-model="step" non-linear>
                    <v-stepper-header>
                        <v-stepper-step step="1" :complete="step > 1" editable :rules="[() => checkStep1]">Files & Attachments</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="2" :complete="step > 2" editable :rules="[() => checkStep2]">Metadata</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step v-if="!this.$store.state.user.currentChannel" step="3" :complete="step > 3" editable>Channel, Kategorien & Tags</v-stepper-step>
                        <v-stepper-step v-else step="3" :complete="step > 3" editable>Kategorien & Tags</v-stepper-step>

                        <v-divider></v-divider>
                        <v-stepper-step step="4" editable>Access & Auth</v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">

                            <v-card flat>
                                <v-card-text>
                                    <form ref="fileform" enctype="multipart/form-data">
                                        <v-text-field @click.native="onFocus('videofile')" label="Video File" v-model="videofilename" placeholder="Bitte hier klicken um Video auszuwählen" required
                                            :rules="requiredRule"></v-text-field>
                                        <input type="file" name="presenter" ref="videofile" @change="onFileChange($event, 'videofilename')" />
                                    </form>
                                    <form ref="imageform" enctype="multipart/form-data">
                                        <v-text-field @click.native="onFocus('posterimage')" label="Poster Image" v-model="posterimagename" placeholder="Bitte hier klicken um Bild auszuwählen"
                                            hint="Falls Sie kein Poster-Image hochladen, wird automatisch eins aus dem ersten Frame des Videos generiert."
                                            persistent-hint></v-text-field>
                                        <input type="file" name="poster-image" ref="posterimage" @change="onFileChange($event, 'posterimagename')" />
                                    </form>
                                </v-card-text>
                            </v-card>
                            <v-btn color="primary" @click.native="step = 2">Weiter</v-btn>
                            <v-btn color="primary" @click.native="test">Test</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-card flat>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field v-model.lazy="video.name" label="Video Title" required :rules="requiredRule"></v-text-field>
                                        <v-text-field v-model.lazy="video.presenter" label="Presentatoren"></v-text-field>
                                        <v-text-field v-model.lazy="video.description" label="Beschreibung"></v-text-field>
                                        <v-menu lazy :close-on-content-click="false" v-model="menu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                                            <v-text-field slot="activator" label="Erstellt am / Produktionsdatum" v-model="video.created" readonly></v-text-field>
                                            <v-date-picker v-model="video.created" no-title scrollable actions>
                                                <template scope="{ save, cancel }">
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                                        <v-btn flat color="primary" @click="save">OK</v-btn>
                                                    </v-card-actions>
                                                </template>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                            <v-btn color="primary" @click.native="step = 3">Weiter</v-btn>
                            <v-btn flat @click.native="step = 1">Zurück</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <v-card flat>
                                <v-card-text>

                                    <v-select v-if="!currentChannel" v-bind:items="channels" v-model="video.channel" label="Channel" item-text="name" item-value="_id"
                                        autocomplete clearable>
                                        <template slot="item" scope="data">

                                            <v-list-tile-avatar style="height: 40px; width: 40px">
                                                <img :src="apiUrl + '/channel' + data.item.iconpath" />
                                            </v-list-tile-avatar>
                                            <v-list-tile-content class="pt-1">
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>

                                        </template>
                                    </v-select>

                                    <v-select :items="categories" v-model="video.categories" item-text="name" no-data-text="nichts gefunden" label="Kategorien" multiple chips autocomplete
                                        item-value="_id">
                                        <template slot="selection" scope="data">
                                            <v-chip close @input="data.parent.selectItem(data.item)" class="chip--select-multi" :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)">
                                                <v-avatar>
                                                    <img :src="apiUrl + '/category' + data.item.iconpath">
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>

                                        <template slot="item" scope="data">

                                            <v-list-tile-avatar style="height: 40px; width: 40px">
                                                <img :src="apiUrl + '/category' + data.item.iconpath" />
                                            </v-list-tile-avatar>
                                            <v-list-tile-content class="pt-1">
                                                <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                            </v-list-tile-content>

                                        </template>

                                    </v-select>

                                    <v-select label="Tags" chips tags append-icon="" clearable v-model="video.tags" hint="Tag eingeben und mit Enter bestätigen">
                                        <template slot="selection" scope="data">
                                            <v-chip close @input="remove(data.item)" :selected="data.selected">
                                                <v-avatar class="primary">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
                                                {{ data.item }}
                                            </v-chip>
                                        </template>
                                    </v-select>

                                    <v-checkbox label="Mit Bauchbinden / Zusatzinfos (experimentell)" light v-if="currentChannel && currentChannel.canAddLowerThirds || this.$store.state.user.userData.group == 'admin'" v-model="video.hasLowerThirds"></v-checkbox>

                                </v-card-text>
                            </v-card>
                            <v-btn color="primary" @click.native="step = 4">Weiter</v-btn>
                            <v-btn flat @click.native="step = 2">Zurück</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="4">
                            <v-card flat>
                                <v-card-text>
                                    <v-select :items="accessSelectNoPublic" v-model="video.access" label="Access" v-if="currentChannel && currentChannel.videosOnlyPrivate"></v-select>
                                    <v-select :items="accessSelect" v-model="video.access" label="Access" v-else></v-select>
                                </v-card-text>
                            </v-card>
                            <v-btn color="primary" @click.native="submit" :disabled="!checkStep1 || !checkStep2">Submit</v-btn>
                            <v-btn flat @click.native="step = 3">Zurück</v-btn>
                        </v-stepper-content>

                    </v-stepper-items>
                </v-stepper>

            </v-flex>

        </v-layout>

    </div>
</template>

<script>
    import moment from "moment";
    import axios from "axios";
    import axiosApi from "~/plugins/axios";
    axios.defaults.headers.common['Authorization'] = "Basic YWRtaW46b3BlbmNhc3Q=";
    axios.defaults.withCredentials = true;

    export default {
        middleware: "authenticated-channel",
        layout: "dashboard-channel",

        data() {
            return {
                apiUrl: process.env.apiUrl,
                progressValue: 0,
                showProgressbar: false,
                step: 0,
                menu: false,
                categories: [],
                channels: [],
                currentChannel: this.$store.state.user.currentChannel,
                videofilename: "",
                posterimagename: "",
                posterImageFile: "",
                internalId: Date.now(),
                accessSelect: ["public", "private", "channelonly"],
                accessSelectNoPublic: ["private", "channelonly"],
                statusSelect: ["imported", "hold", "transcoding", "finished"],
                video: {
                    name: "",
                    presenter: "",
                    description: "",
                    created: moment().format("YYYY-MM-DD"),
                    channel: [],
                    categories: [],
                    tags: [],
                    status: "transcoding",
                    access: "public",
                    opencastID: "",
                    playerType: "Flowplayer-Single",
                    uploadedByUser: this.$store.state.user.userData.username,
                    hasLowerThirds: false,
                },
                requiredRule: [
                    (v) => !!v || 'This field is required',
                ],
            };
        },

        computed: {
            checkStep1() {
                if (this.step > 1) {
                    return this.videofilename.length > 0
                } else { return true }
            },
            checkStep2() {
                if (this.step > 2) {
                    return this.video.name.length > 0
                } else { return true }
            },
        },

        created() {
            this.$store.commit("settoolbarTitle", "Add Video");
            this.video.channel = this.checkForChannel();
        },


        mounted() {
            this.fetchData();
        },

        beforeDestroy() {
            this.$store.commit("updateNotificationShow", {
                id: this.internalId,
                show: true,
            });
        },
        methods: {
            checkForChannel() {
                if (this.$store.state.user.currentChannel) {
                    return { name: this.$store.state.user.currentChannel.name, _id: this.$store.state.user.currentChannel._id, iconpath: this.$store.state.user.currentChannel.iconpath }
                } else {
                    return []
                };
            },
            test() {
                console.log(this.currentChannel)
            },

            remove(item) {
                this.video.tags.splice(this.video.tags.indexOf(item), 1)
                this.video.tags = [...this.video.tags]
            },

            submit({ store }) {
                this.showProgressbar = true;

                const form = new FormData(this.$refs.fileform);
                form.append("metadata", JSON.stringify([
                    {
                        "flavor": "dublincore/episode",
                        "fields": [
                            {
                                "id": "title",
                                "value": this.video.name
                            },
                            {
                                "id": "description",
                                "value": this.video.description
                            },
                            { "id": "creator", "type": "mixed_text", "value": [`${this.$store.state.user.userData.username}`] }
                        ]
                    }
                ]));
                form.append("processing", JSON.stringify({
                    "workflow": "fast",
                    "configuration": {
                        "comment": "false",
                        "publishToMediaModule": "true",
                        "publishToOaiPmh": "true"
                    }
                }));
                form.append("acl", JSON.stringify([
                    {
                        "action": "read",
                        "allow": true,
                        "role": "ROLE_USER_ADMIN"
                    },
                    {
                        "action": "write",
                        "allow": true,
                        "role": "ROLE_USER_ADMIN"
                    },
                    {
                        "action": "read",
                        "allow": true,
                        "role": "ROLE_ADMIN"
                    },
                    {
                        "action": "write",
                        "allow": true,
                        "role": "ROLE_ADMIN"
                    },
                    {
                        "action": "read",
                        "allow": true,
                        "role": "ROLE_ANONYMOUS"
                    }
                ]));


                this.$store.commit("addNotification", {
                    text: `Uploading Video ${this.video.name}`,
                    uploadProgess: this.progressValue,
                    id: this.internalId,
                    show: false
                });

                let config = {
                    onUploadProgress: progressEvent => {
                        this.progressValue = Math.round(
                            progressEvent.loaded * 100 / progressEvent.total
                        );
                        this.$store.commit("updateNotification", {
                            id: this.internalId,
                            uploadProgess: this.progressValue,
                        });
                    },
                    timeout: 3600000,

                };

                axios.post(`http://beuthbox-opencast.beuth-hochschule.de/api/events/`, form, config).then(
                    response => {
                        console.log(response);
                        this.video.opencastID = response.data.identifier;

                        const form = new FormData();
                        form.append("poster-image", this.posterImageFile, this.posterImageFile.name)
                        form.append("name", this.video.name);
                        form.append("presenter", this.video.presenter);
                        form.append("description", this.video.description);
                        form.append("created", this.video.created);
                        form.append("status", this.video.status);
                        form.append("access", this.video.access);
                        form.append("hasLowerThirds", this.video.hasLowerThirds);
                        form.append("uploadedByUser", this.video.uploadedByUser);
                        form.append("opencastID", this.video.opencastID);
                        form.append("playerType", this.video.playerType);
                        form.append("channel", JSON.stringify(this.video.channel));
                        form.append("categories", JSON.stringify(this.video.categories));
                        form.append("tags", JSON.stringify(this.video.tags));


                        axiosApi.post(`/opencast`, form).then(
                            response => {
                                this.$store.commit("removeNotification", this.internalId);
                                this.showProgressbar = false;
                                this.$store.commit("setSnackbar", {
                                    text: `Video ${this.video.name} wurde erstellt`,
                                    color: ""
                                });

                                // this.$router.push("/admin/videos");
                            },
                            err => {
                                this.$store.commit("setSnackbar", {
                                    text: "Fehler beim Erstellen des Videos",
                                    color: "error"
                                });
                                console.log(err);
                            }
                        );
                        // this.$router.push("/admin/videos");
                    },
                    err => {
                        this.$store.commit("setSnackbar", {
                            text: "Fehler beim Erstellen des Videos",
                            color: "error"
                        });
                        console.log(err);
                    }
                );
            },


            onFocus(ref) {
                this.$refs[ref].click();
            },

            onFileChange($event, filename) {
                this[filename] = $event.target.value.split("\\").pop();
                if (filename == "posterimagename") {
                    console.log("apply to data poster image")
                    this.posterImageFile = $event.target.files[0];
                    console.log(this.posterImageFile.files)
                }
            },

            fetchData() {
                console.log("fetching data")
                axiosApi
                    .get(
                    `/graphql?query={categories{name, _id, iconpath}channels{name, _id, iconpath}}`
                    )
                    .then(res => {
                        this.categories = res.data.data.categories;
                        this.channels = res.data.data.channels
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },



    };
</script>

<style>
    input[type="file"] {
        display: none;
    }

    .list__tile__avatar {
        width: 40px !important;
        height: 40px !important;
    }
</style>
