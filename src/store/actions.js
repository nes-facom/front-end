let actions = {
    atualizarUsuarioLogado({ commit }, logado) {
        commit("setLogado", logado);
    },

    salvarArquivo({ commit }, arquivo) {
        commit("setArquivo", arquivo);
    },

    salvarNomeArquivo({ commit }, nomeArquivo) {
        commit("setNomeArquivo", nomeArquivo);
    },
}

export default actions;