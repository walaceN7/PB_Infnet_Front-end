export function AvaliacaoEstrelas({ nota, onAvaliar }) {
  return (
    <div className="avaliacao-estrelas">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={() => onAvaliar(n)}
          className={`estrela ${n <= nota ? "ativa" : "inativa"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
