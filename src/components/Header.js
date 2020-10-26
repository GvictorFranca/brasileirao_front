import React from "react";
import "./Header.css";
import { fetchRequest } from "../helpers/request";

export default function Header(props) {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const { token, setToken } = props;

  return (
    <div className="header">
      <div>Logo</div>
      <div className="login"></div>
      {token !== null ? (
        <button onClick={() => setToken(null)}>Deslogar</button>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            fetchRequest("http://localhost:8081/auth", "POST", {
              email,
              senha,
            })
              .then((res) => res.json())
              .then((jsonResponse) => {
                const newToken = jsonResponse.data.token;
                setToken(newToken);
                setEmail("");
                setSenha("");
              });
            alert("Logado com sucesso");
          }}
        >
          <label>
            Email
            <input
              type="email"
              value={email}
              onInput={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={senha}
              onInput={(event) => setSenha(event.target.value)}
            />
          </label>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
