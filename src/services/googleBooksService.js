import axios from "axios";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const ITENS_POR_PAGINA = 12;

export async function buscarLivrosExternos(termo, pagina = 1) {
  try {
    const startIndex = (pagina - 1) * ITENS_POR_PAGINA;

    const resposta = await axios.get(
      `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(
        termo
      )}&maxResults=${ITENS_POR_PAGINA}&startIndex=${startIndex}&printType=books&langRestrict=pt`
    );

    const totalItems = resposta.data.totalItems || 0;

    if (!resposta.data.items) {
      return { livros: [], totalItems: 0 };
    }

    const livrosFormatados = resposta.data.items.map((item) => ({
      id: item.id,
      titulo: item.volumeInfo.title,
      autor: item.volumeInfo.authors?.join(", ") || "Autor desconhecido",
      capaUrl: item.volumeInfo.imageLinks?.thumbnail || "",
      sinopse: item.volumeInfo.description,
    }));

    return { livros: livrosFormatados, totalItems };
  } catch (error) {
    console.error("Erro ao buscar livros no Google Books:", error);
    return { livros: [], totalItems: 0 };
  }
}

export async function buscarLivroPorId(livroId) {
  try {
    const resposta = await axios.get(`${GOOGLE_BOOKS_API_URL}/${livroId}`);

    const item = resposta.data;
    if (!item) return null;

    const livroFormatado = {
      id: item.id,
      titulo: item.volumeInfo.title,
      subtitulo: item.volumeInfo.subtitle,
      autor: item.volumeInfo.authors?.join(", ") || "Autor desconhecido",
      capaUrl: item.volumeInfo.imageLinks?.thumbnail || "",
      sinopse: item.volumeInfo.description,
      editora: item.volumeInfo.publisher,
      anoPublicacao: item.volumeInfo.publishedDate,
      numPaginas: item.volumeInfo.pageCount,
    };

    return livroFormatado;
  } catch (error) {
    console.error("Erro ao buscar detalhes do livro:", error);
    return null;
  }
}
