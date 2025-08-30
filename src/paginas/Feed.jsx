import { FeedAmigos } from "../componentes/FeedAmigos";

export function Feed() {
  const atividadesFicticias = [
    { nome: "Ana", livro: "Dom Casmurro", status: "Lido" },
    { nome: "João", livro: "1984", status: "Lendo" },
    { nome: "Mariana", livro: "O Sol é para todos", status: "Quero Ler" },
  ];

  return (
    <section>
      <h2>👥 Atividades dos Amigos</h2>
      <p>Veja o que seus amigos estão lendo e avaliando.</p>
      <FeedAmigos atividades={atividadesFicticias} />
    </section>
  );
}
