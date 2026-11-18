import { useEffect, useReducer } from "react";
import { reduzir, estadoInicial } from "./calc.js";

const TECLAS = ["AC", "⌫", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "±", "0", ",", "="];
const OPERADORES = ["÷", "×", "-", "+", "="];
const FUNCOES = ["AC", "⌫", "%"];
const MAPA = {
  "*": "×", "/": "÷", Enter: "=", "=": "=", Backspace: "⌫", Escape: "AC",
  ",": ",", ".": ",", "%": "%", "+": "+", "-": "-",
};

const comVirgula = (v) => String(v).replace(".", ",");

export default function App() {
  const [estado, tecla] = useReducer(reduzir, estadoInicial);

  useEffect(() => {
    const aoTeclar = (e) => {
      const t = /^\d$/.test(e.key) ? e.key : MAPA[e.key];
      if (t) {
        e.preventDefault();
        tecla(t);
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, []);

  const visor = comVirgula(estado.visor);

  return (
    <main className="calculadora">
      <div className="visor" aria-live="polite">
        <small>{estado.operador ? `${comVirgula(estado.anterior)} ${estado.operador}` : " "}</small>
        <output style={{ fontSize: visor.length > 9 ? "2rem" : "3rem" }}>{visor}</output>
      </div>
      <div className="teclado">
        {TECLAS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => tecla(t)}
            className={OPERADORES.includes(t) ? "op" : FUNCOES.includes(t) ? "fn" : ""}
            aria-pressed={OPERADORES.includes(t) ? estado.operador === t && estado.novoNumero : undefined}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="credito">Feito por Leonardo Carrilho · funciona também pelo teclado</p>
    </main>
  );
}
