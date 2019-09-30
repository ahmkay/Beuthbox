<template>
    <v-dialog v-model="dialog.status" v-if="dialog">
        <v-card>
            <v-card-title class="headline">
                {{dialog.title}} löschen
            </v-card-title>
            <v-card-text> Wirklich "{{dialog.deleteItem}}" löschen</v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click.native="dialog.status = false">Abbrechen</v-btn>
                <v-btn color="primary" flat @click="$emit('closeDialog'); dialog.status = false">Löschen</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ["dialog"]
};
</script>
