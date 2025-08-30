import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarLivroPorId } from "../services/googleBooksService";

export function DetalheLivro() {
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const { livroId } = useParams();

  useEffect(() => {
    const carregarDetalhes = async () => {
      setCarregando(true);
      const dadosDoLivro = await buscarLivroPorId(livroId);
      setLivro(dadosDoLivro);
      setCarregando(false);
    };

    carregarDetalhes();
  }, [livroId]);

  if (carregando) {
    return (
      <div className="feedback-usuario">Carregando detalhes do livro...</div>
    );
  }

  if (!livro) {
    return (
      <div className="feedback-usuario">
        <p>Livro não encontrado ou erro ao carregar.</p>
        <Link to="/" className="botao">
          Voltar para a Coleção
        </Link>
      </div>
    );
  }

  return (
    <section className="detalhe-livro-container">
      <Link to="/" className="botao-voltar">
        ← Voltar
      </Link>
      <div className="detalhe-livro-header">
        <img
          src={livro.capaUrl}
          alt={`Capa de ${livro.titulo}`}
          className="detalhe-livro-capa"
        />
        <div className="detalhe-livro-info">
          <h1>{livro.titulo}</h1>
          {livro.subtitulo && <h2>{livro.subtitulo}</h2>}
          <p className="autor">
            <strong>Autor:</strong> {livro.autor}
          </p>
          <p>
            <strong>Editora:</strong> {livro.editora || "Não informado"}
          </p>
          <p>
            <strong>Publicado em:</strong>{" "}
            {livro.anoPublicacao || "Não informado"}
          </p>
          <p>
            <strong>Nº de Páginas:</strong>{" "}
            {livro.numPaginas || "Não informado"}
          </p>
        </div>
      </div>
      <div className="detalhe-livro-sinopse">
        <h3>Sinopse</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: livro.sinopse || "Sinopse não disponível.",
          }}
        />
      </div>
    </section>
  );
}
