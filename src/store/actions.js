let actions = {
    atualizarUsuarioLogado({ commit }, logado) {
        commit("setLogado", logado);
    },
}

export default actions;