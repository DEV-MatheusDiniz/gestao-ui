<template>
  <div>
    <v-app id="inspire">
      <v-main class="grey lighten-3">
        <HeaderComp />

        <v-container>
          <v-row>
            <v-col>
              <v-sheet min-height="90vh" rounded="lg">
                <RouterView />
              </v-sheet>
            </v-col>
          </v-row>
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
