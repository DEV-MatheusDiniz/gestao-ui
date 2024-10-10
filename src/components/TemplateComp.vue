<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32">
          <v-icon dark>
            mdi-account
          </v-icon>
        </v-avatar>

        <v-btn v-for="item in links" :key="item.label" text :to="item.link">
          {{ item.label }}
        </v-btn>

        <v-spacer></v-spacer>

        <span>Registro de Atividades</span>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="80vh" rounded="lg">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'TemplateComp',

  data: () => ({
    links: [
      {
        label: 'Usuários',
        link: '/usuarios'
      },
      {
        label: 'Tarefas',
        link: '/tarefas'
      },
      {
        label: 'Atividades',
        link: '/atividades'
      },
    ],
  }),
}
</script>