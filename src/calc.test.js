import { test } from "node:test";
import assert from "node:assert/strict";
import { reduzir, estadoInicial } from "./calc.js";

const digitar = (teclas) => teclas.reduce(reduzir, estadoInicial).visor;

test("operações básicas", () => {
  assert.equal(digitar(["2", "+", "3", "="]), "5");
  assert.equal(digitar(["9", "-", "1", "2", "="]), "-3");
  assert.equal(digitar(["4", "×", "2", ",", "5", "="]), "10");
  assert.equal(digitar(["7", "÷", "2", "="]), "3.5");
});

test("encadeamento e precisão", () => {
  assert.equal(digitar(["2", "+", "3", "×", "4", "="]), "20");
  assert.equal(digitar(["0", ",", "1", "+", "0", ",", "2", "="]), "0.3");
});

test("casos especiais", () => {
  assert.equal(digitar(["5", "÷", "0", "="]), "Erro");
  assert.equal(digitar(["5", "÷", "0", "=", "3"]), "3");
  assert.equal(digitar(["5", "0", "%"]), "0.5");
  assert.equal(digitar(["1", "2", "⌫"]), "1");
  assert.equal(digitar(["8", "±"]), "-8");
  assert.equal(digitar(["8", "±", "⌫"]), "0");
});
