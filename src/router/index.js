import Vue from 'vue'
import VueRouter from 'vue-router'
import UsuariosView from '@/views/usuarios/UsuariosView'
import TarefasView from '@/views/tarefas/TarefasView'
import AtividadesView from '@/views/atividades/AtividadesView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/usuarios'
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView
  },
  {
    path: '/tarefas',
    name: 'tarefas',
    component: TarefasView
  },
  {
    path: '/atividades',
    name: 'atividades',
    component: AtividadesView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
