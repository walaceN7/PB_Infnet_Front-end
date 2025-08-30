import { CartaoLivro } from "../componentes/CartaoLivro";
import { useBuscaDeLivros } from "../hooks/useBuscaDeLivros";

export function Busca({ onAdicionar }) {
  const {
    termoBusca,
    setTermoBusca,
    resultados,
    carregando,
    nenhumResultado,
    pesquisar,
    paginaAtual,
    irParaProximaPagina,
    irParaPaginaAnterior,
    haMaisPaginas,
    buscaRealizada,
  } = useBuscaDeLivros();

  return (
    <section>
      <h2>🔎 Encontre Novos Livros</h2>
      <form className="busca-container" onSubmit={pesquisar}>
        <input
          type="text"
          value={termoBusca}
          className="input"
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Digite o título ou autor..."
        />
        <button type="submit" className="botao botao--primario">
          Buscar
        </button>
      </form>

      {carregando && <div className="feedback-usuario">Carregando...</div>}
      {buscaRealizada && nenhumResultado && !carregando && (
        <p className="feedback-usuario">
          Nenhum livro encontrado para "{termoBusca}".
        </p>
      )}

      <div className="grid-livros">
        {resultados.map((livro) => (
          <CartaoLivro key={livro.id} {...livro}>
            <button
              className="botao botao--adicionar"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAdicionar(livro);
              }}
            >
              Adicionar à Coleção
            </button>
          </CartaoLivro>
        ))}
      </div>

      {!carregando && resultados.length > 0 && (
        <div className="paginacao-container">
          <button
            onClick={irParaPaginaAnterior}
            disabled={paginaAtual <= 1}
            className="botao botao-paginacao"
          >
            Anterior
          </button>
          <span>Página {paginaAtual}</span>
          <button
            onClick={irParaProximaPagina}
            disabled={!haMaisPaginas}
            className="botao botao-paginacao"
          >
            Próxima
          </button>
        </div>
      )}
    </section>
  );
}
