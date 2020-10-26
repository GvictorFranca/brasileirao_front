import React from "react";
import { fetchRequest } from "../helpers/request";
import "./Fixturies.css";
import { AtualizarContext } from "../helpers/provider";

const fetchJson = (url) => fetch(url).then((res) => res.json());

export default function Tabela(props) {
  const [dados, setDados] = React.useState([]); // DADOS E ARRAY VAZIO INICIAL
  const [rodada, setRodada] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [editFieldId, setFieldId] = React.useState(null);
  const [golsDaCasa, setGolsDaCasa] = React.useState(0);
  const [golsDoVisitante, setGolsDoVisitante] = React.useState(0);
  const [atualizarTabela, setAtualizarTabela] = React.useContext(
    AtualizarContext
  );

  const { token } = props;

  React.useEffect(() => {
    fetchJson(`http://localhost:8081/matchs/${rodada}`).then((respostaJson) => {
      const dadosResponse = respostaJson.matchs.rows;
      const dado = dadosResponse.map((jogo) => {
        return {
          id: jogo.id,
          timeCasa: jogo.time_casa,
          timeVisitante: jogo.time_visitante,
          golsCasa: jogo.gols_casa,
          golsVisitante: jogo.gols_visitante,
        };
      });
      setDados(dado);
      setRodada(rodada);

      setLoading(false);
    });
  }, [rodada]);

  const incrementeRodada = (rodada) => {
    if (rodada <= 37) {
      rodada++;
    }

    setRodada(rodada);
    setLoading(true);
  };

  const decrementeRodada = (rodada) => {
    if (rodada > 1) {
      rodada--;
    }
    setRodada(rodada);
    setLoading(true);
  };

  const editMatch = (id) => {
    if (editFieldId === id) {
      fetchRequest(
        "http://localhost:8081/update",
        "POST",
        { id: id, goalsScored: golsDaCasa, goalsConcern: golsDoVisitante },
        token
      );
      const match = dados.find((object) => object.id === id);
      match.golsCasa = golsDaCasa;
      match.golsVisitante = golsDoVisitante;
      setGolsDaCasa(null);
      setGolsDoVisitante(null);
      setFieldId(null);
      setAtualizarTabela(!atualizarTabela);
    } else {
      setFieldId(id);
    }
  };

  const updateMatch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Fixturies">
      <div className="fixturies-header">
        <button onClick={() => decrementeRodada(rodada)}> Back </button>
        Rodada: {rodada}
        <button onClick={() => incrementeRodada(rodada)}> Next </button>
      </div>
      {loading ? (
        <div className="loading"> Loading ... </div>
      ) : (
        <table>
          <tbody>
            {dados.map((object) => (
              <tr>
                <td> {object.timeCasa} </td>
                <td>
                  {editFieldId === object.id ? (
                    <input
                      type="number"
                      value={golsDaCasa}
                      onChange={(event) => setGolsDaCasa(event.target.value)}
                    />
                  ) : (
                    <td>{object.golsCasa}</td>
                  )}
                </td>
                <td> X </td>
                <td>
                  {editFieldId === object.id ? (
                    <input
                      value={object.golsDoVisitante}
                      value={golsDoVisitante}
                      onChange={(event) =>
                        setGolsDoVisitante(event.target.value)
                      }
                    />
                  ) : (
                    <td>{object.golsVisitante}</td>
                  )}
                </td>
                <td> {object.timeVisitante} </td>
                {token ? (
                  editFieldId == null || editFieldId == object.id ? (
                    <button
                      onClick={() => editMatch(object.id)}
                      onSubmit={(e) => updateMatch(e)}
                    >
                      {editFieldId == object.id ? (
                        <div>Salvar</div>
                      ) : (
                        <div>Editar</div>
                      )}
                    </button>
                  ) : null
                ) : (
                  <button></button>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
