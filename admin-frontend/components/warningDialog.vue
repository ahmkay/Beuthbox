<template>
    <v-dialog v-model="warningDialog.status" v-if="warningDialog" max-width="500px">
        <v-card class="red darken-3" dark>
            <v-card-title class="headline">
                {{warningDialog.title}}
            </v-card-title>
            <v-card-text> {{warningDialog.text}}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white" @click.native="warningDialog.status = false">Abbrechen</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ["warningDialog"]
};
</script>
