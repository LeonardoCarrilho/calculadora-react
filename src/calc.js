// Lógica pura da calculadora (testável sem React).
export const estadoInicial = { visor: "0", anterior: null, operador: null, novoNumero: false };

export function calcular(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? NaN : a / b;
    default: return b;
  }
}

const formatar = (n) => (Number.isFinite(n) ? String(parseFloat(n.toPrecision(12))) : "Erro");

export function reduzir(s, tecla) {
  if (s.visor === "Erro" && tecla !== "AC") s = estadoInicial;

  if (/^\d$/.test(tecla)) {
    if (s.novoNumero || s.visor === "0") return { ...s, visor: tecla, novoNumero: false };
    if (s.visor.replace(/[-.]/g, "").length >= 12) return s;
    return { ...s, visor: s.visor + tecla };
  }

  switch (tecla) {
    case ",":
      if (s.novoNumero) return { ...s, visor: "0.", novoNumero: false };
      return s.visor.includes(".") ? s : { ...s, visor: s.visor + "." };
    case "AC":
      return estadoInicial;
    case "⌫": {
      if (s.novoNumero) return s;
      const resto = s.visor.slice(0, -1);
      return { ...s, visor: resto === "" || resto === "-" ? "0" : resto };
    }
    case "±":
      if (s.visor === "0") return s;
      return { ...s, visor: s.visor.startsWith("-") ? s.visor.slice(1) : "-" + s.visor };
    case "%":
      return { ...s, visor: formatar(parseFloat(s.visor) / 100) };
    case "+": case "-": case "×": case "÷": {
      const atual = parseFloat(s.visor);
      if (s.operador && !s.novoNumero) {
        const r = formatar(calcular(s.anterior, atual, s.operador));
        if (r === "Erro") return { ...estadoInicial, visor: r };
        return { visor: r, anterior: parseFloat(r), operador: tecla, novoNumero: true };
      }
      return { ...s, anterior: atual, operador: tecla, novoNumero: true };
    }
    case "=":
      if (!s.operador) return s;
      return {
        visor: formatar(calcular(s.anterior, parseFloat(s.visor), s.operador)),
        anterior: null, operador: null, novoNumero: true,
      };
    default:
      return s;
  }
}
