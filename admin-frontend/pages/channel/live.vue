<template>
    <v-container grid-list-md>
        <v-layout row justify-center wrap>

            <v-flex xs12>
                <v-card class="text-xs-center">
                    <v-card-title primary-title>
                        <div style="width: 100%">
                            <h3 class="display-1 mb-0">
                                Live Streaming
                                <v-icon color="error" large>fiber_manual_record</v-icon>
                            </h3>
                            <div class="subheading">Mit Beuthbox-Live können Sie jederzeit einen Livestream starten. Der Live-Stream ist unter Ihrer Channel-Seite erreichbar.

                            </div>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-layout row justify-center wrap>
                            <v-flex xs12>
                                Für den Livestream benötigen Sie einen Encoder wie bspw. OBS Studio. Der Stream wird über Wowza in HLS umgewandelt. Dabei wird das Video in 720p gestreamt.
                                Kleinere Auflösungen werden nicht upgescalelt, größere Auflösungen allerdings auf 720p reduziert.
                                <br>
                                <v-btn color="primary" class="ma-3" @click="test">Tutorial anschauen</v-btn>
                                <br>
                            </v-flex>

                            <v-flex xs6 class="text-xs-left" v-if="this.channel.liveevent.islive == 'false' || !this.channel.liveevent.islive">
                                <v-stepper class="elevation-0" v-model="step" non-linear vertical>

                                    <v-stepper-step step="1" v-bind:complete="step > 1" :rules="[() => checkStep1]" editable>
                                        Live einschalten
                                        <small>Aktivieren Sie Ihren Live-Stream und zeigen Sie so, dass Sie einen Live-Stream schalten bzw. schalten werden.</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="1">
                                        <v-switch label="Live schalten" v-model="liveevent.islive"></v-switch>
                                    </v-stepper-content>

                                    <v-stepper-step step="2" v-bind:complete="step > 2" editable>
                                        Titel und Untertitel eingeben
                                        <small>Versorgen Sie Ihre Zuschauer mit den nötigen Informationen.</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="2">
                                        <v-text-field label="Titel" v-model="liveevent.title"></v-text-field>
                                        <v-text-field label="Untertitel" v-model="liveevent.subtitle"></v-text-field>
                                        <v-text-field label="Beschreibung" v-model="liveevent.description" multi-line row="2"></v-text-field>
                                    </v-stepper-content>

                                    <v-stepper-step step="3" v-bind:complete="step > 3" editable>
                                        Datum und Zeit eingeben
                                        <small>Wann soll der Live-Stream starten?</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="3">
                                        <v-layout row wrap>
                                            <v-flex xs6>
                                                <v-menu lazy :close-on-content-click="true" v-model="datemenu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                                                    <v-text-field slot="activator" label="Datum" v-model="dateFormatted" prepend-icon="event" readonly></v-text-field>
                                                    <v-date-picker v-model="liveevent.date" no-title scrollable :first-day-of-week="1" locale="de-de" @input="formatDate($event)">
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-flex>

                                            <v-flex xs6>
                                                <v-menu lazy :close-on-content-click="false" v-model="timemenu" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" min-width="290px">
                                                    <v-text-field slot="activator" label="Uhrzeit" v-model="liveevent.time" prepend-icon="access_time" readonly></v-text-field>
                                                    <v-time-picker v-model="liveevent.time" autosave format="24hr"></v-time-picker>
                                                </v-menu>
                                            </v-flex>
                                        </v-layout>
                                    </v-stepper-content>

                                    <v-stepper-step step="4" v-bind:complete="step > 4" editable>
                                        Passwort festlegen (optional)
                                        <small>Nur Nutzer mit Passwort haben Zugriff auf den Livestream.</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="4">
                                        <v-checkbox label="Mit Passwortschutz" v-model="liveevent.haspassword" light></v-checkbox>
                                        <transition name="fade">
                                            <div v-if="liveevent.haspassword">
                                                <v-text-field label="Passwort" v-model="liveevent.password" :append-icon="hiddePW ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (hiddePW = !hiddePW)"
                                                    :type="hiddePW ? 'password' : 'text'"></v-text-field>
                                                <span class="body-2 red--text">Denken Sie daran, dass Passwort Ihren Zuschauern mitzuteilen.</span>
                                            </div>
                                        </transition>
                                    </v-stepper-content>

                                    <v-stepper-step step="5" editable>
                                        Stream Key generieren
                                        <small>Key für Ihren Encoder wie bspw. OBS Studio generieren.</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="5">
                                        <v-btn outline color="primary" @click="generateURL" :disabled="liveevent.key.length > 0 || loading" :loading="loading">Stream-Key generieren</v-btn>
                                        <transition name="fade">
                                            <div v-if="liveevent.key">
                                                <v-text-field label="URL" v-model="liveevent.url" readonly append-icon="content_copy" :append-icon-cb="() => doCopy('url')"></v-text-field>
                                                <v-text-field label="Stream Key" v-model="liveevent.key" readonly append-icon="content_copy" :append-icon-cb="() => doCopy('key')"></v-text-field>

                                                <v-btn color="error" @click="submit" :disabled="!checkStep1">Live Event speichern</v-btn>
                                                <br>
                                                <span class="body-2 grey--text">Nach der Speicherung können Sie die Daten auf dieser Seite nochmals einsehen. Nach dem Ende des Live-Streams
                                                    empfiehlt es sich, die Live-Schaltung wieder aufzuheben, sodass dies auch nicht mehr auf Ihrer Channel-Seite
                                                    angezeigt wird.</span>
                                            </div>
                                        </transition>
                                    </v-stepper-content>

                                </v-stepper>
                            </v-flex>

                            <v-flex xs6 class="text-xs-left" v-else>
                                <v-btn color="error" @click="endLiveStream" block large>Live Event beenden
                                    <v-icon right dark>stop</v-icon>
                                </v-btn>
                                <span class="body-1 grey--text mt-2 mb-2">Daten sind nicht änderbar.</span>
                                <v-text-field label="Titel" v-model="channel.liveevent.title" readonly></v-text-field>
                                <v-text-field label="Untertitle" v-model="channel.liveevent.subtitle" v-if="channel.liveevent.subtitle" readonly></v-text-field>
                                <v-text-field label="Beschreibung" v-model="channel.liveevent.description" v-if="channel.liveevent.description" readonly multi-line row="2"></v-text-field>
                                <v-layout row wrap>
                                    <v-flex xs6>
                                        <v-text-field label="Datum" v-model="channel.liveevent.date" prepend-icon="event" readonly></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field label="Uhrzeit" v-model="channel.liveevent.time" prepend-icon="access_time" readonly></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-text-field label="Passwort" v-if="channel.liveevent.haspassword" v-model="channel.liveevent.password" :append-icon="hiddePW ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (hiddePW = !hiddePW)" :type="hiddePW ? 'password' : 'text'"></v-text-field>
                                <v-text-field label="URL" v-model="channel.liveevent.url" readonly append-icon="content_copy" :append-icon-cb="() => doCopy('url')"></v-text-field>
                                <v-text-field label="Stream Key" v-model="channel.liveevent.key" readonly append-icon="content_copy" :append-icon-cb="() => doCopy('key')"></v-text-field>
                            </v-flex>

                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>


<script>
    import axios from '~/plugins/axios';
    import moment from 'moment';

    function getDefaultData() {
        return {
            datemenu: false,
            timemenu: false,
            step: 0,
            hiddePW: true,
            loading: false,
            dateFormatted: moment().format('DD.MM.YYYY'),
            liveevent: {
                islive: false,
                title: "",
                subtitle: "",
                description: "",
                date: moment().format("YYYY-MM-DD"),
                time: moment().format("HH:mm"),
                duration: "",
                haspassword: false,
                password: "",
                key: "",
                url: "rtmp://141.64.64.18/beuthbox-live"
            }
        };
    }

    export default {
        middleware: 'authenticated-channel',
        layout: "dashboard-channel",

        data: getDefaultData,

        computed: {
            checkStep1() {
                if (this.step > 1) {
                    return this.liveevent.islive
                } else { return true }
            },
            channel() {
                return this.$store.state.user.currentChannel;
            },
        },

        methods: {
            test() {
                console.log(this.channel.liveevent.islive == "false")
            },
            doCopy(type) {
                this.$copyText(this.liveevent[type] || this.channel.liveevent[type]).then(() => {
                    this.$store.commit("setSnackbar", {
                        text: `Text erfolgreich in die Zwischenablage kopiert.`,
                        color: ""
                    });
                },
                    (error) => {
                        this.$store.commit("setSnackbar", {
                            text: `Fehler beim Kopieren in die Zwischenablage.`,
                            color: "errror"
                        });
                    })
            },
            generateURL() {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.liveevent.key = this.$store.state.user.currentChannel.name.replace(/\W+/g, "_") + "-" + Date.now()
                }, 3000)

            },
            formatDate(date) {
                if (!date) {
                    return null
                }
                this.dateFormatted = moment(date).format('DD.MM.YYYY')
            },
            async submit() {
                let itemId = this.$store.state.user.currentChannel._id;

                const channelResponse = await axios.post(`/channel/${itemId}/live`, this.liveevent);
                const userResponse = await axios.get("/user/me", { withCredentials: true });

                console.log(userResponse.data)

                this.$store.commit("user/SET_CHANNEL", channelResponse.data);
                this.$store.commit("user/SET_USER", userResponse.data);

                this.$store.commit("setSnackbar", {
                    text: "Live-Event wurde erstellt",
                    color: ""
                });

                Object.assign(this.$data, getDefaultData())

            },
            async endLiveStream() {
                let itemId = this.$store.state.user.currentChannel._id;
                let defaultData = getDefaultData();

                const channelResponse = await axios.post(`/channel/${itemId}/live`, defaultData.liveevent);

                this.$store.commit("user/SET_CHANNEL", channelResponse.data);

                this.$store.commit("setSnackbar", {
                    text: "Live-Event wurde beendet",
                    color: ""
                });
            }
        }

    };
</script>

<style>
    .fade-enter-active {
        transition: opacity 1s
    }

    .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>