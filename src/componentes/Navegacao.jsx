import { NavLink } from "react-router-dom";

export function Navegacao({ usuario, onLogout }) {
  return (
    <nav className="navegacao">
      <NavLink to="/">Minha Coleção</NavLink>
      <NavLink to="/buscar">Buscar Livros</NavLink>
      <NavLink to="/feed">Feed de Amigos</NavLink>

      <div className="usuario-info">
        <span>Olá, {usuario}</span>
        <button onClick={onLogout} className="botao botao--logout">
          Sair
        </button>
      </div>
    </nav>
  );
}
