<template>
    <v-card class="rounded-lg">
        <v-card-title>
            {{ titulo }}

            <v-spacer></v-spacer>

            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line
                hide-details></v-text-field>

            <v-spacer></v-spacer>

            <NovoComp @form-submit="add_dados" />
        </v-card-title>

        <v-data-table :headers="headers" :items="dados" :search="search"
            :footer-props="{ 'items-per-page-options': paginacao }" class="elevation-1 rounded-lg">

            <template v-slot:[`item.actions`]="{ item }">
                <RemoverComp :id="item.id" @form-submit="remover_dados" />
                <AtualizarComp :dado="item" @form-submit="atualizar_dados" />
            </template>

            <template v-slot:no-data> Sem registros cadastrados! </template>
        </v-data-table>
    </v-card>
</template>

<script>
import api from '@/services/api'
import NovoComp from '@/views/usuarios/components/NovoComp'
import RemoverComp from '@/views/usuarios/components/RemoverComp'
import AtualizarComp from '@/views/usuarios/components/AtualizarComp'

export default {
    name: 'UsuariosView',

    components: {
        NovoComp,
        RemoverComp,
        AtualizarComp,
    },

    data: () => ({
        titulo: "Usuários",
        paginacao: [10, 30, -1],
        search: "",
        headers: [
            { text: "Código", align: "center", value: "id" },
            { text: "Nome", align: "start", value: "no_nome" },
            { text: "Dt. Cadastro", align: "start", value: "dt_cadastro" },
            { text: "Dt. Alteração", align: "start", value: "dt_alteracao" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        dados: [],
    }),

    created() {
        this.get_init();
    },

    methods: {
        get_dados() {
            api
                .get("usuarios/")
                .then((response) => {
                    this.dados = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        get_init() {
            this.get_dados();
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
