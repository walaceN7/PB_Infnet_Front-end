export function FeedAmigos({ atividades }) {
  return (
    <div className="feed-container">
      {atividades.map((a, i) => (
        <div key={i} className="feed-item">
          <span>
            <strong>{a.nome}</strong> marcou <strong>{a.livro}</strong> como{" "}
            <strong>{a.status}</strong>
          </span>
        </div>
      ))}
    </div>
  );
}
