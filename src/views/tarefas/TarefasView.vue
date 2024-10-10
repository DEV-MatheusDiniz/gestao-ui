<template>
    <v-card class="rounded-lg">
        <v-card-title>
            {{ titulo }}

            <v-spacer></v-spacer>

            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                hide-details></v-text-field>

            <v-spacer></v-spacer>

            <NovoComp @form-submit="add_dados" :responsaveis="responsaveis" />
        </v-card-title>

        <v-data-table :headers="headers" :items="dados" :search="search"
            :footer-props="{ 'items-per-page-options': paginacao }" class="elevation-1 rounded-lg">

            <template v-slot:[`item.actions`]="{ item }">
                <RemoverComp :id="item.id" @form-submit="remover_dados" />
                <AtualizarComp :dado="item" :responsaveis="responsaveis" @form-submit="atualizar_dados" />
            </template>

            <template v-slot:no-data> Sem registros cadastrados! </template>
        </v-data-table>
    </v-card>
</template>

<script>
import api from '@/services/api'
import NovoComp from '@/views/tarefas/components/NovoComp'
import RemoverComp from '@/views/tarefas/components/RemoverComp'
import AtualizarComp from '@/views/tarefas/components/AtualizarComp'

export default {
    name: 'TarefasView',

    components: {
        NovoComp,
        RemoverComp,
        AtualizarComp,
    },

    data: () => ({
        titulo: "Tarefas",
        paginacao: [10, 30, -1],
        search: "",
        headers: [
            { text: "Código", align: "center", value: "id" },
            { text: "Descrição", align: "start", value: "ds_descricao" },
            { text: "Responsável", align: "start", value: "fk_responsavel.no_nome" },
            { text: "Dt. Cadastro", align: "start", value: "dt_cadastro" },
            { text: "Dt. Alteração", align: "start", value: "dt_alteracao" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        dados: [],
        responsaveis: []
    }),

    created() {
        this.get_dados();
        this.get_responsaveis();
    },

    methods: {
        get_dados() {
            api
                .get("tarefas/")
                .then((response) => {
                    this.dados = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        get_responsaveis() {
            api
                .get("usuarios/")
                .then((response) => {
                    this.responsaveis = response.data;
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
