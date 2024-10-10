<template>
  <v-dialog v-model="dialog" persistent transition="dialog-top-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" class="rounded-lg" v-bind="attrs" v-on="on" dark>NOVA TAREFA</v-btn>
    </template>

    <v-card class="rounded-lg">
      <v-toolbar dark class="rounded-lg" color="primary">
        Nova Tarefa
      </v-toolbar>

      <br />

      <v-card-text>
        <v-form ref="form">
          <v-textarea v-model="form.ds_descricao" label="Descrição" :rules="[rules.obrigatorio]" counter rows="3"
            clear-icon="mdi-close-circle" clearable></v-textarea>

          <v-select v-model.trim="form.fk_responsavel" :items="responsaveis" item-text="no_nome" item-value="id"
            label="Responsável" :rules="[rules.obrigatorio]" required></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="dialog = false"> Cancelar </v-btn>
        <v-btn text @click="salvar(form)"> Salvar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";

export default {
  name: "NovoComp",

  props: {
    responsaveis: Array,
  },

  data: () => ({
    dialog: false,
    form: {},
    rules: {
      obrigatorio: (v) => !!v || "Este campo é obrigatório",
    },
  }),

  methods: {
    salvar(form) {
      if (this.$refs.form.validate()) {
        api
          .post("tarefas/", form)
          .then((response) => {
            this.$emit("form-submit", response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // Resetar
            this.dialog = false;
            this.form = {};
          });
      }
    },
  },
};
</script>
