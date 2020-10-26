import React, { useState } from "react";

export const AtualizarContext = React.createContext([false, () => {}]);

export const AtualizarProvider = ({ children }) => {
  const [atualizarTabela, setAtualizarTabela] = useState(false);

  return (
    <AtualizarContext.Provider value={[atualizarTabela, setAtualizarTabela]}>
      {children}
    </AtualizarContext.Provider>
  );
};
