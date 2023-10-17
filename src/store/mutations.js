let mutations = {
    nomeArquivoSenhaBibliotecario(state, nome) {
        state.nomeArquivoSenhaBibliotecario = nome;
    },

    salvarArquivoSenhaBibliotecario(state, arquivo) {
        state.arquivoSenhaBibliotecario = arquivo;
    },
}

export default mutations;