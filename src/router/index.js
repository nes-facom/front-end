import Vue from 'vue'
import VueRouter from 'vue-router'
import TelaLogin from '@/views/TelaLogin.vue'
import TelaEmprestimos from '@/views/TelaEmprestimos.vue'
import TelaCadastrarBibliotecario from '@/views/TelaCadastrarBibliotecario.vue'
import WebcamTest from '@/views/WebcamTest.vue'
import TelaLeitores from '@/views/TelaLeitores.vue'
import TelaLivros from '@/views/TelaLivros.vue'
import TelaCadastrarLeitores from '@/views/TelaCadastrarLeitores.vue'
import TelaDetalhesLeitor from '@/views/TelaDetalhesLeitor.vue'
import TelaCadastrarLivro from '@/views/TelaCadastrarLivro.vue'
import TelaEditarLeitor from '@/views/TelaEditarLeitor.vue'
import TelaEditarLivro from '@/views/TelaEditarLivro.vue'

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
      path: '/livros/cadastrar',
      name: 'CadastrarLivros',
      component: TelaCadastrarLivro,
    },
    {
      path: '/livros/editar/:id',
      name: 'EditarLivro',
      component: TelaEditarLivro,
    },
    {
      path: '/livros/detalhes/id',
      name: 'DetalhesLivro',
      component: TelaCadastrarLivro,
    },
    {
      path: '/leitores/cadastrar',
      name: 'CadastrarLeitores',
      component: TelaCadastrarLeitores,
    },
    {
      path: '/leitores/editar/:id',
      name: 'EditarLeitor',
      component: TelaEditarLeitor,
      props: true
    },
    {
      path: '/leitores/detalhes/:id',
      name: 'DetalhesLeitor',
      component: TelaDetalhesLeitor,
    },
  ]
})

export default router