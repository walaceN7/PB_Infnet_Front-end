import { useState, useCallback } from "react";
import { buscarLivrosExternos } from "../services/googleBooksService";

const ITENS_POR_PAGINA = 12;

export function useBuscaDeLivros() {
  const [termoBusca, setTermoBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const executarBusca = useCallback(async (termo, pagina) => {
    if (!termo) return;

    setCarregando(true);
    setResultados([]);
    setBuscaRealizada(true);

    const { livros, totalItems } = await buscarLivrosExternos(termo, pagina);

    setResultados(livros);
    setTotalResultados(totalItems);
    setPaginaAtual(pagina);
    setCarregando(false);
  }, []);

  const pesquisar = (e) => {
    if (e) e.preventDefault();
    executarBusca(termoBusca, 1);
  };

  const irParaProximaPagina = () => {
    executarBusca(termoBusca, paginaAtual + 1);
  };

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 1) {
      executarBusca(termoBusca, paginaAtual - 1);
    }
  };

  const haMaisPaginas = paginaAtual * ITENS_POR_PAGINA < totalResultados;
  const nenhumResultado = resultados.length === 0;

  return {
    termoBusca,
    setTermoBusca,
    resultados,
    carregando,
    pesquisar,
    paginaAtual,
    irParaProximaPagina,
    irParaPaginaAnterior,
    haMaisPaginas,
    nenhumResultado,
    buscaRealizada,
  };
}
