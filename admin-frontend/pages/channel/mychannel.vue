<template>
    <v-layout row justify-center>
        <v-flex xs12>

            <v-card>
                <v-card-title primary-title>
                    <div class="headline mb-2">Channel "{{channel.name}}" ändern</div>
                </v-card-title>

                <v-card-text>
                    <form ref="myForm" enctype="multipart/form-data">
                        <v-container fluid grid-list-md>
                            <v-layout row wrap justify-center>
                                <v-flex xs4>
                                    <v-text-field name="name" label="Channel Name" v-model="channel.name" required :rules="requiredRule" :disabled="!channel.canChangeTitle"></v-text-field>
                                </v-flex>
                                <v-flex xs8>
                                    <v-layout row wrap justify-center align-items style="padding: 15px; margin-bottom: -15px">
                                        <v-flex xs4 v-if="channel.canChangeAccessToChannel">
                                            <v-tooltip bottom>
                                                <v-switch label="Make public" v-model="channel.ispublic" slot="activator"></v-switch>
                                                <span>Public Channel werden in der Suche und auf der Übersicht angezeigt. Private sind nur über einen Link aufrufbar.</span>
                                            </v-tooltip>
                                        </v-flex>
                                        <v-flex xs8>
                                            <span class="body-2 grey--text">Link zum Channel: <a :href="frontendUrl + '/channel/' + channel._id" rel="noopener" target="_blank" class="caption">View Channel</a></span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>

                            <v-text-field name="description" label="Beschreibung" multi-line v-model="channel.description" rows="2"></v-text-field>


                            <v-layout row align-center wrap>

                                <v-flex class="flex-shrink">
                                    <v-avatar size="50px" slot="activator" @click.stop="openDialog(smallImage)" class="zoom-img">
                                        <img :src="smallImage">
                                    </v-avatar>
                                </v-flex>

                                <v-flex xs5>
                                    <v-text-field @click.native="onFocus('smallImage')" label="Avatar Icon" v-model="iconfilename" placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                                    <input type="file" name="channel-icon" ref="smallImage" @change="onFileChange($event, 'iconfilename', 'smallImage')" />
                                </v-flex>


                                <v-flex class="flex-shrink">
                                    <v-avatar size="50px" slot="activator" @click.stop="openDialog(bigImage)" class="zoom-img">
                                        <img :src="bigImage">
                                    </v-avatar>
                                </v-flex>

                                <v-flex xs5>
                                    <v-text-field @click.native="onFocus('bigImage')" label="Großes Cover Image" v-model="imagefilename" placeholder="Bitte hier klicken um Bild auszuwählen"></v-text-field>
                                    <input type="file" name="channel-image" ref="bigImage" @change="onFileChange($event, 'imagefilename', 'bigImage')" />
                                </v-flex>

                            </v-layout>


                        </v-container>
                    </form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="submit" color="primary" :disabled="checkFormRules">änderungen speichern</v-btn>
                </v-card-actions>
            </v-card>

        </v-flex>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-media :src="dialogImg" height="500px">
                </v-card-media>
            </v-card>
        </v-dialog>

    </v-layout>

</template>

<script>
    import axios from '~/plugins/axios'
    export default {
        middleware: 'authenticated-channel',
        layout: "dashboard-channel",
        data() {
            return {
                frontendUrl: process.env.frontendUrl,
                imagefilename: "",
                iconfilename: "",
                bigImage: "",
                smallImage: "",
                dialogImg: "",
                dialog: false,
                requiredRule: [
                    (v) => !!v || 'This field is required',
                ],
            };
        },

        computed: {
            checkFormRules() {
                return this.channel.name == ""
            },

        },
        methods: {
            openDialog(img) {
                this.dialogImg = img;
                console.log(img)
                this.dialog = true
            },

            test() {
                console.log(this.channel)
            },

            submit() {
                let itemId = this.$store.state.user.currentChannel._id;
                const otherForm = new FormData(this.$refs.myForm);
                otherForm.append("ispublic", this.channel.ispublic);

                axios.put(`/channel/${itemId}`, otherForm).then(
                    response => {
                        this.$store.commit("settoolbarTitle", `Channel "${response.data.name}"`);
                        this.$store.commit("user/SET_CHANNEL", response.data)
                        this.$store.commit("setSnackbar", {
                            text: "Channel wurde geändert",
                            color: ""
                        });
                        // this.$router.push("/channel");
                    },
                    err => {
                        this.$store.commit("setSnackbar", {
                            text: "Fehler beim Editieren des Channels",
                            color: "error"
                        });
                        console.log(err);
                    }
                );
            },
            onFocus(ref) {
                this.$refs[ref].click();
            },

            onFileChange($event, filename, src) {
                this[filename] = $event.target.value.split("\\").pop();
                var input = event.target;

                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    var vm = this;

                    reader.onload = function (e) {
                        vm[src] = e.target.result;
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }
        },
        asyncData({ params, error, store }) {
            return axios
                .get(
                `/graphql?query={channel(id:"${store.state.user.currentChannel._id}"){name,description, _id, iconfilename, imagefilename, iconpath, imagepath, liveenabled, ispublic, canChangeTitle, canChangeAccessToChannel, users{username, _id}}}`
                )
                .then(res => {
                    store.commit("settoolbarTitle", `Channel "${res.data.data.channel.name}"`);
                    return {
                        channel: res.data.data.channel,
                        
                        bigImage:
                            process.env.apiUrl + "/channel" + res.data.data.channel.imagepath,
                        smallImage:
                            process.env.apiUrl + "/channel" + res.data.data.channel.iconpath,
                        imagefilename: res.data.data.channel.imagefilename,
                        iconfilename: res.data.data.channel.iconfilename
                    };
                })
                .catch(e => {
                    error({ statusCode: 404, message: "Post not found" });
                });
        },


    };
</script>


<style>
    input[type="file"] {
        display: none;
    }
    .zoom-img {
        cursor: zoom-in;
    }
</style>