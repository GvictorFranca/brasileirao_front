import React from "react";
import "./App.css";
import Header from "./components/Header";
import Tabela from "./components/Tabela";
import Fixturies from "./components/Fixturies";
import { AtualizarProvider, AtualizarContext } from "../src/helpers/provider";

export default function App() {
  const [token, setToken] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [atualizarTabela, setAtualizarTabela] = React.useContext(
    AtualizarContext
  );

  return (
    <div>
      <Header
        token={token}
        setToken={setToken}
        loading={loading}
        setLoading={setLoading}
      />
      <div className="app-container">
        <AtualizarProvider>
          <Fixturies token={token} loading={loading} setLoading={setLoading} />
          <Tabela loading={loading} setLoading={setLoading} />
        </AtualizarProvider>
      </div>
    </div>
  );
}
