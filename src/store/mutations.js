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
}

export default mutations;