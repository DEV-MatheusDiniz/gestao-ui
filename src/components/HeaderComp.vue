<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Registro de Atividades</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4" v-for="item in links" :key="item.label">
          <v-list-item :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'HeaderComp',

  data: () => ({
    links: [
      {
        label: 'Usuários',
        link: '/usuarios',
        icon: 'mdi-account-group',
      },
      {
        label: 'Tarefas',
        link: '/tarefas',
        icon: 'mdi-format-list-bulleted-square',
      },
      {
        label: 'Atividades',
        link: '/atividades',
        icon: 'mdi-ticket',
      },
    ],
    drawer: false,
    group: null,
  }),
}
</script>
