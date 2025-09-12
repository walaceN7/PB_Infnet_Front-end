import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cadastrarUsuario } from "../services/usuarioService";

export function Cadastro() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleCadastro(e) {
    e.preventDefault();
    try {
      await cadastrarUsuario(usuario, email, senha);
      toast.success("Usuário criado com sucesso! Faça login.");
      navigate("/login");
    } catch (err) {
      if (err.includes("Este e-mail já está em uso.")) {
        toast.error("Este e-mail já está em uso.");
      }
      toast.error("Erro ao cadastrar usuário");
    }
  }

  return (
    <section className="login-container">
      <h2>📝 Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <label htmlFor="usuario-cadastro" className="sr-only">
          Senha
        </label>
        <input
          id="usuario-cadastro"
          type="text"
          value={usuario}
          placeholder="Usuário"
          onChange={(e) => setUsuario(e.target.value)}
          required
          className="input"
        />

        <label htmlFor="email-cadastro" className="sr-only">
          Senha
        </label>
        <input
          id="email-cadastro"
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />

        <label htmlFor="senha-cadastro" className="sr-only">
          Senha
        </label>
        <input
          id="senha-cadastro"
          type="password"
          value={senha}
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
          required
          className="input"
        />
        <button className="botao botao--primario" type="submit">
          Cadastrar
        </button>
        <p>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </section>
  );
}
