let mutations = {
    nomeArquivoSenhaBibliotecario(state, nome) {
        state.nomeArquivoSenhaBibliotecario = nome;
    },

    salvarArquivoSenhaBibliotecario(state, arquivo) {
        state.arquivoSenhaBibliotecario = arquivo;
    },

    limparNomeArquivoSenhaBibliotecario(state) {
        state.nomeArquivoSenhaBibliotecario = '';
    },

    limparSalvarArquivoSenhaBibliotecario(state, arquivo) {
        state.arquivoSenhaBibliotecario = null;
    },

    setLogado(state, logado) {
        state.usuarioLogado = logado;
    },
}

export default mutations;