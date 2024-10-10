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
          <v-text-field v-model.trim="form.dt_inicio" type="datetime-local" label="Iniciada em"
            :rules="[rules.obrigatorio]" required></v-text-field>

          <v-text-field v-model.trim="form.dt_fim" type="datetime-local" label="Finalizada em"
            :rules="[rules.obrigatorio, rules.dt_fim_maior_dt_inicial]" required></v-text-field>

            <v-textarea v-model="form.ds_descricao" label="Descrição" :rules="[rules.obrigatorio]" counter rows="3"
            clear-icon="mdi-close-circle" clearable></v-textarea>

          <v-select v-model.trim="form.fk_tarefa" :items="tarefas" item-text="ds_descricao" item-value="id"
            label="Tarefa" :rules="[rules.obrigatorio]" required></v-select>
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
    tarefas: Array,
  },

  data: () => ({
    dialog: false,
    form: {},
  }),

  computed: {
    rules() {
      return {
        obrigatorio: (v) => !!v || "Este campo é obrigatório",
        dt_fim_maior_dt_inicial: (v) => {
          if (!this.form.dt_inicio || !this.form.dt_fim) {
            return true; // Deixe passar se uma das datas ainda não estiver preenchida
          }
          const dtInicio = new Date(this.form.dt_inicio);
          const dtFim = new Date(this.form.dt_fim);

          return dtFim > dtInicio || "A data de finalização deve ser maior que a data inicial";
        },
      };
    }
  },

  methods: {
    salvar(dado_alterado) {
      if (this.$refs.form.validate()) {
        dado_alterado.fk_tarefa = dado_alterado.fk_tarefa;

        api
          .put(`atividades/${this.dado.id}/`, dado_alterado)
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

    formatar_data_hora_Local(data_string) {
      // Separar a data e a hora
      const [datePart, timePart] = data_string.split(' ');

      // Separar o dia, mês e ano
      const [day, month, year] = datePart.split('/');

      // Retornar no formato correto: yyyy-MM-ddTHH:mm
      return `${year}-${month}-${day}T${timePart.slice(0, 5)}`;
    },

    set_form(dado) {
      this.form = { ...dado };
      this.form.dt_inicio = this.formatar_data_hora_Local(this.form.dt_inicio);
      this.form.dt_fim = this.formatar_data_hora_Local(this.form.dt_fim);
      this.form.fk_tarefa = this.form.fk_tarefa.id;
    },
  },
};
</script>
