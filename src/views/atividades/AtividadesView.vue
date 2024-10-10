<template>
    <v-card class="rounded-lg">
        <v-card-title>
            {{ titulo }}

            <v-spacer></v-spacer>

            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                hide-details></v-text-field>

            <v-spacer></v-spacer>

            <NovoComp @form-submit="add_dados" :tarefas="tarefas" />
        </v-card-title>

        <v-data-table :headers="headers" :items="dados" :search="search"
            :footer-props="{ 'items-per-page-options': paginacao }" class="elevation-1 rounded-lg">

            <template v-slot:[`item.actions`]="{ item }">
                <RemoverComp :id="item.id" @form-submit="remover_dados" />
                <AtualizarComp :dado="item" :tarefas="tarefas" @form-submit="atualizar_dados" />
            </template>

            <template v-slot:no-data> Sem registros cadastrados! </template>
        </v-data-table>
    </v-card>
</template>

<script>
import api from '@/services/api'
import NovoComp from '@/views/atividades/components/NovoComp'
import RemoverComp from '@/views/atividades/components/RemoverComp'
import AtualizarComp from '@/views/atividades/components/AtualizarComp'

export default {
    name: 'AtividadesView',

    components: {
        NovoComp,
        RemoverComp,
        AtualizarComp,
    },

    data: () => ({
        titulo: "Atividades",
        paginacao: [10, 30, -1],
        search: "",
        headers: [
            { text: "Código", align: "center", value: "id" },
            { text: "Descrição", align: "start", value: "ds_descricao" },
            { text: "Tarefa", align: "start", value: "fk_tarefa.ds_descricao" },
            { text: "Responsável", align: "start", value: "fk_tarefa.fk_responsavel.no_nome" },
            { text: "Dt. Iniciada", align: "start", value: "dt_inicio" },
            { text: "Dt. Finalizada", align: "start", value: "dt_fim" },
            { text: "Tempo Trabalhado", align: "start", value: "nu_tempo_trabalhado" },
            { text: "Dt. Cadastro", align: "start", value: "dt_cadastro" },
            { text: "Dt. Alteração", align: "start", value: "dt_alteracao" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        dados: [],
        tarefas: [],
    }),

    created() {
        this.get_tarefas();
        this.get_dados();
    },

    methods: {
        get_tarefas() {
            api
                .get("tarefas/")
                .then((response) => {
                    this.tarefas = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        get_dados() {
            api
                .get("atividades/")
                .then((response) => {
                    this.dados = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        add_dados(novo_dado) {
            this.dados.push(novo_dado);
        },

        remover_dados(dados_id) {
            this.dados = this.dados.filter((item) => item.id != dados_id);
        },

        atualizar_dados(dado_atualizado) {
            this.dados = this.dados.map((item) => {
                return item.id === dado_atualizado.id ? dado_atualizado : item;
            });
        }
    },
}
</script>
