<template>
  <v-dialog v-model="dialog" persistent transition="dialog-top-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="secondary" class="mr-1" v-bind="attrs" v-on="on" small @click="set_form(dado)">mdi-pencil</v-icon>
    </template>

    <v-card class="rounded-lg">
      <v-toolbar dark class="rounded-lg" color="primary">
        Atualizar::{{ form.id }}
      </v-toolbar>

      <br />

      <v-card-text>
        <v-form ref="form">
          <v-textarea v-model="form.ds_descricao" label="Descrição" :rules="[rules.obrigatorio]" :counter="100"
            :maxlength="100" rows="3" clear-icon="mdi-close-circle" clearable></v-textarea>

            
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
  name: "AtualizarComp",

  props: {
    dado: Object,
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
    salvar(dado_alterado) {
      if (this.$refs.form.validate()) {
        api
          .put(`tarefas/${this.dado.id}/`, dado_alterado)
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

    set_form(dado) {
      this.form = { ...dado };
      this.form.fk_responsavel = this.form.fk_responsavel.id
    },
  },
};
</script>
