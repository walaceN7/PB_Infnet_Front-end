import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Colecao } from "./paginas/Colecao";
import { Busca } from "./paginas/Busca";
import { Feed } from "./paginas/Feed";
import { Navegacao } from "./componentes/Navegacao";
import { Login } from "./paginas/Login";
import { Cadastro } from "./paginas/Cadastro";
import { getColecao, salvarColecao } from "./services/colecoesService";
import "./estilos/App.css";
import toast, { Toaster } from "react-hot-toast";
import { DetalheLivro } from "./paginas/DetalheLivro";

function PageTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Minha Coleção - LêAí";
        break;
      case "/buscar":
        document.title = "Buscar Livros - LêAí";
        break;
      case "/feed":
        document.title = "Feed de Amigos - LêAí";
        break;
      case "/login":
        document.title = "Login - LêAí";
        break;
      default:
        document.title = "LêAí - Clube do Livro";
    }
  }, [location]);

  return null;
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [colecao, setColecao] = useState([]);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  useEffect(() => {
    if (usuario && usuario.email) {
      carregarColecao(usuario.email);
    } else {
      setColecao([]);
    }
  }, [usuario]);

  const carregarColecao = async (email) => {
    try {
      const livrosSalvos = await getColecao(email);
      setColecao(livrosSalvos || []);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setColecao([]);
        return;
      }

      toast.error("Erro ao carregar coleção");
    }
  };

  const adicionarLivro = async (livro) => {
    if (!colecao.find((item) => item.id === livro.id)) {
      const livroComStatus = {
        ...livro,
        status: "Quero Ler",
        progresso: 0,
        nota: 0,
      };

      const novaColecao = [...colecao, livroComStatus];
      setColecao(novaColecao);
      await salvarColecao(usuario.email, novaColecao);
      toast.success("Livro adicionado à coleção!");
    } else {
      toast.error("Este livro já está na sua coleção.");
    }
  };

  const removerLivro = async (id) => {
    const novaColecao = colecao.filter((livro) => livro.id !== id);
    setColecao(novaColecao);
    await salvarColecao(usuario.email, novaColecao);
    toast.error("Livro removido da coleção.");
  };

  const atualizarLivro = async (id, dadosAtualizados) => {
    const novaColecao = colecao.map((livro) =>
      livro.id === id ? { ...livro, ...dadosAtualizados } : livro
    );
    setColecao(novaColecao);
    await salvarColecao(usuario.email, novaColecao);
    if (dadosAtualizados.status) {
      toast.success(`Status alterado para "${dadosAtualizados.status}"!`);
    }
  };

  const fazerLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    setColecao([]);
  };

  return (
    <BrowserRouter>
      <PageTitleUpdater />
      <Toaster position="top-center" />
      <div className="app-container">
        <h1>📚 Clube do Livro - LêAí</h1>
        {usuario && (
          <Navegacao usuario={usuario.usuario} onLogout={fazerLogout} />
        )}

        <main>
          <Routes>
            {!usuario ? (
              <>
                <Route path="/login" element={<Login onLogin={setUsuario} />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <Colecao
                      livros={colecao}
                      onRemover={removerLivro}
                      onAtualizar={atualizarLivro}
                    />
                  }
                />
                <Route
                  path="/buscar"
                  element={<Busca onAdicionar={adicionarLivro} />}
                />
                <Route path="/feed" element={<Feed />} />
                <Route path="/livro/:livroId" element={<DetalheLivro />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
