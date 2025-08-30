export function BarraProgresso({ porcentagem, onAlterar }) {
  return (
    <div className="barra-container">
      <label htmlFor="progresso" className="barra-label">
        Progresso da Leitura: {porcentagem}%
      </label>
      <input
        type="range"
        name="progresso"
        id="progresso"
        min="0"
        max="100"
        value={porcentagem}
        onChange={(e) => onAlterar(Number(e.target.value))}
        className="barra-input"
      />
    </div>
  );
}
