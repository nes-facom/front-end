import axios from "axios";
import { config } from "../../config/config.js";
const BASE_URL = config.BASE_URL;

export async function fazerLogin(dadosLogin) {
    try {
        const requisicao = await axios.post(BASE_URL + "/auth/login", dadosLogin);

        if(requisicao.status === 200) {
            localStorage.setItem("token_acesso", requisicao.data.token);
            return requisicao.status;
        }
    } catch (erro) {
        return erro;
    }
}