import React from "react";
import "./Tabela.css";
import { AtualizarContext } from "../helpers/provider";

const legenda = {
  time: "Time",
  pontos: "Pontos",
  jogos: "Jogos",
  vitorias: "Vitórias",
  empates: "Empates",
  derrotas: "Derrotas",
  golsFeitos: "GF",
  golsSofridos: "GS",
};

const fetchJson = (url) => fetch(url).then((res) => res.json());

const colunas = [
  "nome",
  "pontos",
  "jogos",
  "vitorias",
  "empates",
  "derrotas",
  "golsFeitos",
  "golsSofridos",
];

export default function Tabela(props) {
  const [colunaOrdenada, setColunaOrdenada] = React.useState("pontos");
  const [ordem, setOrdem] = React.useState("descendente");
  const [dados, setDados] = React.useState([]);
  const [atualizarTabela] = React.useContext(AtualizarContext);

  React.useEffect(() => {
    fetchJson(`http://localhost:8081/leaderboard`).then((respostaJson) => {
      const dadosResponse = respostaJson.leaderboard;
      const time = dadosResponse.map((time) => {
        return {
          nome: time.name,
          pontos: time.points,
          jogos: time.fixturies,
          vitorias: time.victories,
          derrotas: time.defeats,
          empates: time.draws,
          golsFeitos: time.goalsScored,
          golsSofridos: time.goalsConcern,
        };
      });
      setDados(time);
      console.log(atualizarTabela);
    });
  }, [atualizarTabela]);

  const dadosAscendentes = dados.sort((t1, t2) => {
    if (
      typeof t1[colunaOrdenada] === "number" &&
      typeof t2[colunaOrdenada] === "number"
    ) {
      return t2[colunaOrdenada] - t1[colunaOrdenada];
    } else {
      return t1[colunaOrdenada].localeCompare(t2[colunaOrdenada]);
    }
  });

  const dadosOrdenados =
    ordem === "ascendente" ? dadosAscendentes : dadosAscendentes.reverse();

  return (
    <div className="Tabela">
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            {colunas.map((coluna) => (
              <th>
                {legenda[coluna]}{" "}
                <button
                  onClick={() => {
                    if (colunaOrdenada === coluna) {
                      setOrdem((ordem) =>
                        ordem === "descendente" ? "ascendente" : "descendente"
                      );
                    } else {
                      setColunaOrdenada(coluna);
                      setOrdem("descendente");
                    }
                  }}
                >
                  {colunaOrdenada !== coluna || ordem === "descendente"
                    ? "⬇"
                    : "⬆"}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dadosOrdenados.map((time, i) => (
            <tr>
              <td>{i + 1}</td>
              {colunas.map((coluna) => (
                <td>{time[coluna]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
