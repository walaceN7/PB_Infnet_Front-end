import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUsuario } from "../services/usuarioService";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const usuario = await loginUsuario(email, senha);
      toast.success("Login realizado!");
      onLogin(usuario);
      navigate("/");
    } catch (err) {
      toast.error("E-mail ou senha inválidos");
    }
  }

  return (
    <section className="login-container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          value={senha}
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
          required
          className="input"
        />
        <button className="botao botao--primario" type="submit">
          Entrar
        </button>
        <p>
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </section>
  );
}
