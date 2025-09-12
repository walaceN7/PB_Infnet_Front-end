import { useState } from "react";
import { Link } from "react-router-dom";

export function CartaoLivro({
  id,
  titulo,
  autor,
  capaUrl,
  status,
  sinopse,
  paginas,
  notaMedia,
  onTrocarStatus,
  onRemover,
  children,
}) {
  const [expandirSinopse, setExpandirSinopse] = useState(false);
  const [editandoStatus, setEditandoStatus] = useState(false);

  const handleStatusChange = (e) => {
    if (onTrocarStatus) {
      onTrocarStatus(e.target.value);
    }
    setEditandoStatus(false);
  };

  const statusClasseMap = {
    Lendo: "lendo",
    Lido: "lido",
    "Quero Ler": "quero-ler",
    Desisti: "desisti",
  };

  return (
    <Link to={`/livro/${id}`} className="cartao-livro-link">
      <div
        className="cartao-livro"
        role="listitem"
        aria-labelledby={`titulo-${id}`}
      >
        {onRemover && (
          <button
            className="botao-remover-card"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemover();
            }}
            aria-label="Remover livro da coleção"
          >
            &times;
          </button>
        )}
        <div className="card-corpo">
          <img src={capaUrl} alt={`Capa do livro ${titulo}`} className="capa" />
          <h3 className="titulo">{titulo}</h3>
          <p className="autor">{autor}</p>

          {sinopse && (
            <div
              className={`sinopse ${
                !expandirSinopse ? "sinopse-truncada" : ""
              }`}
            >
              <p>{sinopse}</p>
              {sinopse.length > 150 && (
                <button
                  className="botao-link"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpandirSinopse(!expandirSinopse);
                  }}
                >
                  {expandirSinopse ? "Ver menos" : "Ver mais"}
                </button>
              )}
            </div>
          )}
          {paginas && <p className="paginas">📄 {paginas} páginas</p>}
          {notaMedia && (
            <p className="nota-media">⭐ Nota média: {notaMedia}</p>
          )}
        </div>
        <div className="card-footer">
          {children}
          {onTrocarStatus && (
            <div className="status-container">
              {!editandoStatus ? (
                <>
                  <span
                    className={`status-pill status-pill--${
                      statusClasseMap[status] || "quero-ler"
                    }`}
                  >
                    {status}
                  </span>
                  <button
                    className="botao-link"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEditandoStatus(true);
                    }}
                  >
                    Alterar
                  </button>
                </>
              ) : (
                <select
                  className="dropdown-status"
                  value={status}
                  onChange={handleStatusChange}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onBlur={() => setEditandoStatus(false)}
                  autoFocus
                >
                  <option value="Quero Ler">Quero Ler</option>
                  <option value="Lendo">Lendo</option>
                  <option value="Lido">Lido</option>
                  <option value="Desisti">Desisti</option>
                </select>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
