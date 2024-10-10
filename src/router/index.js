import Vue from 'vue'
import VueRouter from 'vue-router'
import UsuariosView from '@/views/usuarios/UsuariosView'

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
