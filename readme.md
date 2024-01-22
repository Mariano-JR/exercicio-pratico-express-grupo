
# POO - Projeto Em Grupo

A equipe, composta por no mínimo 2 e no máximo 4 integrantes, foi contratada para desenvolver um sistema de locadora de veículos. Este sistema será projetado utilizando a linguagem de programação TypeScript, ou no máximo JavaScript Vanilla, permitindo uma interface via terminal ou qualquer interface gráfica.

## Requisitos

Cadastro de Veículos:

- Não é permitido cadastrar veículos com a mesma placa de outro já registrado no sistema;
- As informações a serem cadastradas dos veículos devem incluir o valor da hora de aluguel.

Aluguel de Veículos:

- Para alugar um veículo, o cliente deve fornecer nome, CPF e o tipo de carteira;
- Se o tipo de carteira do cliente for "A", ele só poderá alugar uma moto; se for "B", apenas um carro;
- Cada cliente pode alugar apenas um veículo por vez, e não deve estar alugando nenhum outro veículo no momento de realizar um novo aluguel;
- Ao alugar um veículo, deve-se realizar um cálculo considerando o valor da diária, os dias a serem alugados e um acréscimo conforme o tipo de veículo. Carros terão um acréscimo de 10%, enquanto motos terão 5%.

Devolução de Veículos:

- A devolução do veículo requer o fornecimento do CPF do cliente e a placa do veículo;
- Não é permitido excluir um veículo que esteja atualmente alugado.

Faturamento:

- O sistema, quando solicitado, deve apresentar a fatura a ser paga pelo cliente, detalhando o custo do aluguel de cada veículo.

---

## Observações

- O código fonte do projeto deve ser desenvolvido em TypeScript ou, no máximo, em JavaScript Vanilla;

- A interface pode ser implementada via terminal ou qualquer interface gráfica (HTML e CSS, por exemplo);

- Certifique-se de seguir as boas práticas de desenvolvimento, documentação adequada e teste do código antes da entrega.

## Rodando localmente

Entre no diretório do projeto

```bash
  cd exercicio-pratico-poo-grupo
```

Instale as dependências

```bash
  npm install
```

Inicie o projeto

```bash
  npm run start
```


## Autores

- [Mariano Júnior](https://www.github.com/Mariano-JR/)
- [Silvio Lucas](https://github.com/SilvioLucasDev)
- [Enei Pereira](https://github.com/eneipereira)