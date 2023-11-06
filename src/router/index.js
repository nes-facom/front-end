import Vue from 'vue'
import VueRouter from 'vue-router'
import TelaLogin from '@/views/TelaLogin.vue'
import TelaEmprestimos from '@/views/TelaEmprestimos.vue'
import TelaCadastrarBibliotecario from '@/views/TelaCadastrarBibliotecario.vue'
import TelaLeitores from '@/views/TelaLeitores.vue'
import TelaLivros from '@/views/TelaLivros.vue'
import TelaCadastrarLeitores from '@/views/TelaCadastrarLeitores.vue'
import TelaDetalhesLeitor from '@/views/TelaDetalhesLeitor.vue'

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
      path: '/leitores',
      name: 'Leitores',
      component: TelaLeitores,
    },
    {
      path: '/livros',
      name: 'Livros',
      component: TelaLivros,
    },
    {
      path: '/leitores/cadastrar',
      name: 'CadastrarLeitores',
      component: TelaCadastrarLeitores,
    },
    {
      path: '/leitores/detalhes',
      name: 'DetalhesLeitor',
      component: TelaDetalhesLeitor,
    }
  ]
})

export default router
