<template>
    <v-layout row justify-center wrap>
        <v-flex xs12 class="mb-3">

            <v-toolbar dense flat class="elevation-1" color="white">
                <v-flex xs3>
                    <v-text-field append-icon="search" hide-details single-line v-model="search"></v-text-field>
                </v-flex>

                <v-spacer></v-spacer>
                <v-btn fab small color="error" nuxt to="/slider/carousel/add" class="elevation-2">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>
        </v-flex>
        <v-flex xs12>

            <v-card>
                <v-data-table v-bind:headers='headers' :items='sliders' :search='search'>
                    <template slot="items" scope="props">

                        <td style="width:25%">{{ props.item.name }}</td>
                        <td style="width:25%">{{ props.item.occurrence | arrayToString}}</td>
                        <td style="width:10%">{{ props.item.position }}</td>
                        <td style="width:10%">{{ props.item.active}}</td>
                        <td style="width:10%">{{ props.item.created | formatDate }}</td>
                        <td style="width:20%" class="text-xs-right">
                            <v-btn flat icon color="primary" nuxt :to="'/slider/carousel/' + props.item._id">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn flat icon color="primary" @click="openDeleteDialog(props.item._id, props.item.name)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>


            <deletedialog v-if="dialog.status" :dialog="dialog" @closeDialog="onCloseDialog()"></deletedialog>

        </v-flex>
    </v-layout>
</template>


<script>
    import axios from '~/plugins/axios'
    import deletedialog from "~/components/deleteDialog.vue";

    export default {
        middleware: 'authenticated',
        components: {
            deletedialog
        },
        layout: "dashboard",
        data() {
            return {
                pagination: {},
                headers: [
                    { text: "Name", value: "name", align: "left", sortable: true },
                    { text: "Occurrence", value: "date", align: "left", sortable: true },
                    { text: "Position", value: "date", align: "left", sortable: true },
                    { text: "Aktiv", value: "date", align: "left", sortable: true },
                    { text: "Erstellt am", value: "date", align: "left", sortable: true },
                ],
                search: "",
                dialog: {
                    status: false,
                    title: "Slider",
                    deleteItem: "Slidername",
                    itemId: ""
                }
            };
        },

        computed: {
            sliders() {
                return this.$store.state.sliders;
            },
        },

        created() {
            this.$store.commit("settoolbarTitle", "Slider - Carousels");
        },

        methods: {
            openDeleteDialog(itemId, itemName) {
                console.log("Dialog?", this.dialog);
                this.dialog.deleteItem = itemName;
                this.dialog.itemId = itemId;
                this.dialog.status = true;
            },
            onCloseDialog() {
            
                axios.delete(`/carousel/${this.dialog.itemId}`).then(
                    response => {
                        this.$store.commit(
                            "setSnackbar",
                            { text: `Slider ${this.dialog.deleteItem} wurde gelöscht`, color: '' }
                        );
                        axios
                            .get(
                            "/carousel"
                            )
                            .then(res => {
                                this.$store.commit("setSliders", res.data);
                            })
                            .catch(error => {
                                this.$store.commit("setSliders", []);
                                console.log(error);
                            });
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        },

        fetch({ store, params }) {
            return axios
                .get(
                "/carousel"
                )
                .then(res => {
                  
                    store.commit("setSliders", res.data);
                })
                .catch(error => {
                    store.commit("setSliders", []);
                    console.log(error);
                });
        }
    };
</script>

<style>
    .toolbar-input-divider {
        height: 100%;
        width: 1px;
        background-color: rgba(0, 0, 0, .12);
        margin: 0 5px;
    }
</style>