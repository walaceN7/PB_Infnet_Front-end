import { httpClient } from "../app/http";

export async function loginUsuario(email, senha) {
  const { data } = await httpClient.get(`/usuarios?email=${email}`);

  if (data.length > 0 && data[0].senha === senha) {
    localStorage.setItem("usuario", JSON.stringify(data[0]));
    return data[0];
  } else {
    throw new Error("E-mail ou senha inválidos");
  }
}

export async function cadastrarUsuario(usuario, email, senha) {
  const usuarioExistente = await buscarUsuarioPorEmail(email);
  if (usuarioExistente) {
    throw new Error("Este e-mail já está em uso.");
  }

  const dados = { usuario: usuario, email: email, senha: senha };
  const { data } = await httpClient.post("/usuarios", dados);
  return data;
}

export async function buscarUsuarioPorEmail(email) {
  try {
    const { data } = await httpClient.get(`/usuarios?email=${email}`);
    return data.length ? data[0] : null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error("Ocorreu um erro inesperado ao buscar o usuário:", error);
    throw error;
  }
}
