import Vue from 'vue'
import VueRouter from 'vue-router'
import TelaLogin from '@/views/TelaLogin.vue'
import TelaEmprestimos from '@/views/TelaEmprestimos.vue'
import TelaCadastrarBibliotecario from '@/views/TelaCadastrarBibliotecario.vue'
import WebcamTest from '@/views/WebcamTest.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: TelaLogin,
    },
    {
      path: '/emprestimos',
      name: 'Emprestimos',
      component: TelaEmprestimos,
    },
    {
      path: '/bibliotecario',
      name: 'Bibliotecario',
      component: TelaCadastrarBibliotecario,
    },
    {
      path: '/webcamtest',
      name: 'WebcamTest',
      component: WebcamTest
    }
  ]
})

export default router
