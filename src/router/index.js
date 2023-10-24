import Vue from 'vue'
import VueRouter from 'vue-router'
import TelaLogin from '@/views/TelaLogin.vue'
import TelaEmprestimos from '@/views/TelaEmprestimos.vue'
import TelaCadastrarBibliotecario from '@/views/TelaCadastrarBibliotecario.vue'
import TelaLeitores from '@/views/TelaLeitores.vue'
import TelaCadastrarLeitores from '@/views/TelaCadastrarLeitores.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/leitores',
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
      path: '/leitores',
      name: 'Leitores',
      component: TelaLeitores,
    },
    {
      path: '/leitores/cadastrar',
      name: 'CadastrarLeitores',
      component: TelaCadastrarLeitores,
    },
  ]
})

export default router
