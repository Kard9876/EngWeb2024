# Ficha Aferição
## 2024-04-10

## Autor:
- A100695
- Guilherme João Fernandes Barbosa

## Resumo

A ficha de aferição possui um conjunto de exercícios ao fim dos quais é esperado obter o processamento dos [datasets](/datasets) fornecidos pela equipa docente, o envio dos dados contidos nos referidos datasets a uma base de dados, em mongoDB, através de uma [API de dados](/dataAPI) e, por fim, a disponibilização das operações **CRUD** aos utilizadores através de uma [interface web](/htmlServer).

Para o processamento dos datasets foi desenvolvido um [script em python](/datasets/process_db.py). Este apenas lê o ficheiro indicado no primeiro argumento e, para cada registo lá contido, irá alterar o nome de alguns campos. No fim de ler todos os registo, escreve no ficheiro passado como segundo argumento o resultado do processamento.

A API de dados segue a ideologia REST e possui as seguintes rotas (que implementam os métodos **CRUD**):

- GET `/`, a qual devolve a lista de todas as pessoas
- GET `/:id`, que retorna a pessoa com id indicado no parâmetro
- GET `/modalidades`, que fornece a lista das modalidades ordenada alfabeticamente
- GET `/modalidades/:id`, a qual obtém o nome das pessoas que praticam a modalidade passada como parâmetro
- POST `/`, responsável por registar na base de dados uma nova pessoa com a informação passada no *body* do pedido 
- PUT `/:id`, a qual permite atualizar a pessoa indicada pelo parâmetro id com a informação passada no *body* do pedido
- DELETE `/:id`, a qual apaga da base de dados a informação da pessoa com o id passado como parâmetro

Para enviar os dados contidos nos datasets processados para a base de dados foram desenvolvidos dois scripts, um em [javascript](/datasets/append_datasets.js) e outro em [python](/datasets/append_datasets.py). O script desenvolvido em python possui um problema que esgota as portas disponíveis para a conexão, daí ter sido desenvolvido outro em javascript. Decidi manter os dois scripts na eventualidade de conseguir corrigir o problema no primeiro.

Por fim, a interface web desenvolvida fornece a interface gráfica necessária para a interação entre a API de dados e utilizador e suporta as seguintes rotas:

- GET `/`, a qual apresenta a lista de todas as pessoas
- GET `/add`, responsável por fornecer o formulário que permite criar uma nova pessoa
- GET `/edit/:id`, que permite obter o formulário que permite editar a pessoa indicada no parâmetro id
- GET `/delete/:id`, a qual possibilita apagar a pessoa indicada no parâmetro id da base de dados
- GET `/:id`, a qual retorna a página da pessoa indicada no parâmetro id
- POST `/add`, a qual permite a adição de uma nova pessoa à base de dados com os dados indicados no formulário (da rota GET `/add`)
- POST `/edit/:id`, responsável por enviar à base de dados as alterações efetuadas no formulário (da rota GET `/edit/:id`) da pessoa indicada no parâmetro id

## Conclusão

O desenvolvimente das diversas componentes já referidas permitiu a consolidação de vários conceitos já lecionados e permitiu a exploração da framework *JQuery* pela primeira vez, a qual foi utilizada no desenvolvimento dos formulários.
