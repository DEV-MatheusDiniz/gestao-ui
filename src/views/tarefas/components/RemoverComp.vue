<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="dialog-top-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="secondary" class="mr-1" v-bind="attrs" v-on="on" small
        >mdi-delete</v-icon
      >
    </template>

    <v-card class="rounded-lg">
      <v-toolbar dark class="rounded-lg" color="primary">
        Remover::{{ id }}
      </v-toolbar>

      <br />

      <v-card-text>
        <h1>Tem certeza que deseja remover?</h1>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="dialog = false"> Cancelar </v-btn>
        <v-btn text @click="remover()"> Remover </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";

export default {
  name: "RemoverComp",

  props: {
    id: Number,
  },

  data: () => ({
    dialog: false,
  }),

  methods: {
    remover() {
      api
        .delete(`tarefas/${this.id}/`)
        .then(() => {
          this.$emit("form-submit", this.id);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // Resetar
          this.dialog = false;
        });
    },
  },
};
</script>
