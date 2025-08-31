import { CartaoLivro } from "../componentes/CartaoLivro";
import { BarraProgresso } from "../componentes/BarraProgresso";
import { AvaliacaoEstrelas } from "../componentes/AvaliacaoEstrelas";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

export function Colecao({ livros, onRemover, onAtualizar }) {
  const [filtroAtivo, setFiltroAtivo] = useState("Lendo");
  const filtros = ["Lendo", "Lido", "Quero Ler", "Desisti", "Todos"];

  const livrosFiltrados = useMemo(() => {
    if (filtroAtivo === "Todos") {
      return livros;
    }
    return livros.filter((livro) => livro.status === filtroAtivo);
  }, [livros, filtroAtivo]);

  const trocarStatus = (id, novoStatus) => {
    onAtualizar(id, { status: novoStatus });
  };

  const atualizarProgresso = (id, progresso) => {
    onAtualizar(id, { progresso });
  };

  const avaliarLivro = (id, nota) => {
    onAtualizar(id, { nota });
  };

  return (
    <>
      <section>
        <h2>📖 Minha Coleção</h2>

        <div className="filtros-container">
          {filtros.map((filtro) => (
            <button
              key={filtro}
              className={`filtro-botao ${
                filtroAtivo === filtro ? "ativo" : ""
              }`}
              onClick={() => setFiltroAtivo(filtro)}
            >
              {filtro}
            </button>
          ))}
        </div>

        {livros.length === 0 ? (
          <p className="feedback-usuario">
            Sua coleção está vazia. Que tal{" "}
            <Link to="/buscar" className="link-navegacao">
              buscar novos livros
            </Link>
            ?
          </p>
        ) : (
          <div className="grid-livros grid-livros-uniforme">
            {livrosFiltrados.map((livro) => (
              <CartaoLivro
                key={livro.id}
                {...livro}
                onTrocarStatus={(novoStatus) =>
                  trocarStatus(livro.id, novoStatus)
                }
                onRemover={() => onRemover(livro.id)}
              >
                {livro.status === "Lendo" && (
                  <BarraProgresso
                    porcentagem={livro.progresso}
                    onAlterar={(val) => atualizarProgresso(livro.id, val)}
                  />
                )}
                {livro.status === "Lido" && (
                  <AvaliacaoEstrelas
                    nota={livro.nota}
                    onAvaliar={(nota) => avaliarLivro(livro.id, nota)}
                  />
                )}
              </CartaoLivro>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
