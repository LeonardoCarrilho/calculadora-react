# 🧮 Calculadora React

Calculadora com as quatro operações feita com **React (Vite)** e layout em **Flexbox**.

🔗 **Ao vivo:** https://leonardocarrilho.github.io/calculadora-react/

## Funcionalidades
- Soma, subtração, multiplicação e divisão, com operações encadeadas
- Porcentagem, troca de sinal, apagar o último dígito e limpar tudo
- Funciona pelo teclado físico (números, `+ - * /`, Enter, Backspace, Esc)
- Trata divisão por zero e a imprecisão de ponto flutuante (0,1 + 0,2 = 0,3)
- Lógica isolada em `src/calc.js` (reducer puro) e coberta por testes

## Como rodar
```bash
npm install
npm run dev
```

Testes: `npm test`

Projeto do módulo 26 do curso Full Stack Turbo (TipsCode).
