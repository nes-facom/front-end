import axios from "axios";
import { config } from "../../config/config.js";
const BASE_URL = config.BASE_URL;

export async function cadastrarBibliotecario(jsonBibliotecario) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };
  try {
    const requisicao = await axios.post(
      BASE_URL + "/bibliotecarios",
      jsonBibliotecario,
      configHeader
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}

export async function cadastrarDocente(jsonDocente) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };

  try {
    const requisicao = await axios.post(
      BASE_URL + "/leitores",
      jsonDocente,
      configHeader
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}

export async function cadastrarDiscente(jsonDiscente) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };

  try {
    const requisicao = await axios.post(
      BASE_URL + "/leitores",
      jsonDiscente,
      configHeader
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}

export async function getLeitores(jsonDeBusca) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };

  try {
    const requisicao = await axios.get(
      BASE_URL + "/leitores?nome="+ jsonDeBusca.nome + "&tipo=" + jsonDeBusca.tipo, 
      configHeader
    );

    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}

export async function getLeitor(idLeitor) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };

  try {
    const requisicao = await axios.get(
      BASE_URL + "/leitores/detalhes/" + idLeitor,
      configHeader
    );

    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}

export async function uploadDiscentes(jsonData) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };

  try {
    const requisicao = await axios.post(
      BASE_URL + "/leitores/upload/",
      jsonData,
      configHeader
    );

    if (requisicao.status === 200) {
      return requisicao
    }

  } catch (erro) {
    return erro;
  }
}

export async function getHistoricoEmprestimo(idLeitor) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };

  try {
    const requisicao = await axios.get(
      BASE_URL + "/emprestimos/historico/" + idLeitor,
      configHeader
    );

    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}

export async function updateLeitor(idLeitor, jsonLeitor) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };

  try {
    const requisicao = await axios.put(
      BASE_URL + "/leitores/" + idLeitor,
      jsonLeitor,
      configHeader
    );

    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}