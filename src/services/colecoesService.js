import { httpClient } from "../app/http";

export async function getColecao(emailUsuario) {
  const { data } = await httpClient.get(`colecoes?email=${emailUsuario}`);
  return data.length ? data[0].livros : [];
}

export async function salvarColecao(emailUsuario, livros) {
  try {
    const { data } = await httpClient.get(`/colecoes?email=${emailUsuario}`);

    if (data.length > 0) {
      const colecaoId = data[0].id;
      await httpClient.put(`/colecoes/${colecaoId}`, {
        email: emailUsuario,
        livros,
      });
    } else {
      await httpClient.post("/colecoes", {
        email: emailUsuario,
        livros,
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      await httpClient.post("/colecoes", {
        email: emailUsuario,
        livros,
      });
    } else {
      throw error;
    }
  }
}
