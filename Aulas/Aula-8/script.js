function calcular() {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const op = document.getElementById('operacao').value;

  let resultado;
  switch (op) {
    case '+':
      resultado = num1 + num2;
      break;
    case '-':
      resultado = num1 - num2;
      break;
    case '*':
      resultado = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        alert('Erro: Divisão por zero');
        return;
      }
      resultado = num1 / num2;
      break;
    default:
      alert('Error: Operador inválido');
      return;
    }
    document.getElementById('resultado').textContent = `O resultado é: ${resultado}`;
}

let idades = [];
let pesos = [];
let faixaEtaria1 = [];
let faixaEtaria2 = [];
let faixaEtaria3 = [];
let faixaEtaria4 = [];

function calcularMedia() {
  const idade = parseInt(document.getElementById('idade').value);
  const peso = parseFloat(document.getElementById('peso').value);

  if (isNaN(idade) || isNaN(peso)) {
    alert('Por favor, insira valores válidos.');
    return;
  }

  if (idade < 1 || idade > 150) {
    alert('Por favor, insira uma idade válida entre 1 e 150 anos.');
    return;
  }

  if (peso < 1 || peso > 500) {
    alert('Por favor, insira um peso válido entre 1 e 500 kg.');
    return;
  }

  pesos.push(peso);
  idades.push(idade);
  const mediaPeso = pesos.reduce((a, b) => a + b, 0) / pesos.length;
  const mediaIdade = idades.reduce((a, b) => a + b, 0) / idades.length;

  if (idade <= 10) faixaEtaria1.push(peso);
  else if (idade <= 20) faixaEtaria2.push(peso);
  else if (idade <= 30) faixaEtaria3.push(peso);
  else faixaEtaria4.push(peso);

  const mediaFaixa1 = faixaEtaria1.reduce((a, b) => a + b, 0) / faixaEtaria1.length || 0;
  const mediaFaixa2 = faixaEtaria2.reduce((a, b) => a + b, 0) / faixaEtaria2.length || 0;
  const mediaFaixa3 = faixaEtaria3.reduce((a, b) => a + b, 0) / faixaEtaria3.length || 0;
  const mediaFaixa4 = faixaEtaria4.reduce((a, b) => a + b, 0) / faixaEtaria4.length || 0;

  document.getElementById('media').textContent = `A média das idades é: ${mediaIdade}. A média dos pesos é: ${mediaPeso}`;
  document.getElementById('faixa1').textContent = `A média dos pesos da faixa etária 1 (até 10 anos) é: ${mediaFaixa1} kg`;
  document.getElementById('faixa2').textContent = `A média dos pesos da faixa etária 2 (11 a 20 anos) é: ${mediaFaixa2} kg`;
  document.getElementById('faixa3').textContent = `A média dos pesos da faixa etária 3 (21 a 30 anos) é: ${mediaFaixa3} kg`;
  document.getElementById('faixa4').textContent = `A média dos pesos da faixa etária 4 (mais de 30 anos) é: ${mediaFaixa4} kg`;
  
  document.getElementById('idade').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('idade').focus();
  document.getElementById('peso').focus();
  document.getElementById('idade').select();
}

function verificarPessoa() {
  const nome = document.getElementById('nome').value;
  const idade = parseInt(document.getElementById('idade2').value);
  const altura = parseFloat(document.getElementById('altura').value);

  if (isNaN(idade) || isNaN(altura)) {
    alert('Por favor, insira valores válidos.');
    return;
  }

  let pessoa;
  if (idade > 18 && idade < 35 && altura > 1.86) pessoa = nome;
  else pessoa = idade + " " + altura;

  document.getElementById('pessoa').textContent = `Resultado: ${pessoa}`;
}

function calcularTemperaturas() {
  let temperatura = [];
  temperatura.push(parseFloat(document.getElementById('temperatura1').value));
  temperatura.push(parseFloat(document.getElementById('temperatura2').value));
  temperatura.push(parseFloat(document.getElementById('temperatura3').value));
  temperatura.push(parseFloat(document.getElementById('temperatura4').value));
  temperatura.push(parseFloat(document.getElementById('temperatura5').value));
  temperatura.push(parseFloat(document.getElementById('temperatura6').value));
  temperatura.push(parseFloat(document.getElementById('temperatura7').value));
  temperatura.push(parseFloat(document.getElementById('temperatura8').value));
  temperatura.push(parseFloat(document.getElementById('temperatura9').value));
  temperatura.push(parseFloat(document.getElementById('temperatura10').value));

  let media = temperatura.reduce((a, b) => a + b, 0) / temperatura.length;
  const maior = Math.max(...temperatura);
  const menor = Math.min(...temperatura);
  
  document.getElementById('mediaTemperatura').textContent = `A média das temperaturas é: ${media}`;
  document.getElementById('maiorTemperatura').textContent = `A maior temperatura é: ${maior}`;
  document.getElementById('menorTemperatura').textContent = `A menor temperatura é: ${menor}`;
}

let valores = [];

function calcularMediaValores() {
  let num = parseInt(document.getElementById('varNumeros').value);

  if (isNaN(num)) {
    alert('Por favor, insira um valor válido.');
    return;
  }

  valores.push(num);

  const media = valores.reduce((a, b) => a + b, 0) / valores.length;
  const positivos = valores.filter(v => v > 0).length;
  const negativos = valores.filter(v => v < 0).length;
  const percentualNegativos = (negativos / valores.length) * 100;
  const percentualPositivos = (positivos / valores.length) * 100;
  
  document.getElementById('mediaValores').textContent = `A média dos valores é: ${media}`;
  document.getElementById('qtdPositivos').textContent = `Quantidade de valores positivos: ${positivos}`;
  document.getElementById('qtdNegativos').textContent = `Quantidade de valores negativos: ${negativos}`;
  document.getElementById('percentual').textContent = `Percentual de valores positivos: ${percentualPositivos.toFixed(2)}% e negativos: ${percentualNegativos.toFixed(2)}%`;
  document.getElementById('varNumeros').value = '';
  document.getElementById('varNumeros').focus();
  document.getElementById('varNumeros').select();
  document.getElementById('varNumeros').value = '';
}