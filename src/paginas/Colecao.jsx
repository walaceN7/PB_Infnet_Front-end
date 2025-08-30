import { CartaoLivro } from "../componentes/CartaoLivro";
import { BarraProgresso } from "../componentes/BarraProgresso";
import { AvaliacaoEstrelas } from "../componentes/AvaliacaoEstrelas";
import { Link } from "react-router-dom";

export function Colecao({ livros, onRemover, onAtualizar }) {
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
        {livros.length === 0 ? (
          <p className="feedback-usuario">
            Sua coleção está vazia. Que tal{" "}
            <Link to="/buscar" className="link-navegacao">
              buscar novos livros
            </Link>
            ?
          </p>
        ) : (
          <div className="grid-livros">
            {livros.map((livro) => (
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
