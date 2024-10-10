<template>
  <div>
    <v-app id="inspire">
      <v-main class="grey lighten-3">
        <HeaderComp />

        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import HeaderComp from '@/components/HeaderComp'

export default {
  name: 'TemplateComp',

  components: {
    HeaderComp,
  },

  data: () => ({}),
}
</script>
