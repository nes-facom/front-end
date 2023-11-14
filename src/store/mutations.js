let mutations = {
    setNomeArquivo(state, nome) {
        state.nomeArquivo = nome;
    },

    setArquivo(state, arquivo) {
        state.arquivo = arquivo;
    },

    limparNomeArquivo(state) {
        state.nomeArquivo = '';
    },

    limparArquivo(state) {
        state.arquivo = null;
    },

    setLogado(state, logado) {
        state.usuarioLogado = logado;
    },
}

export default mutations;