# TPC3: Filmes
## 2024-02-26

## Autor:
- A100695
- Guilherme João Fernandes Barbosa

## Resumo

Neste terceiro projeto da Unidade Curricular de *Engenharia Web* foi proposto o desenvolvimento de um serviço de entrega de ficheiros. Pórem, apesar do conceito semelhante ao projeto desenvolvido no **TPC2**, este servidor deve responder de forma completamente dinâmica, isto é, não devem existir páginas HTML estáticas para responder aos utilizadores.

Para desenvolver o projeto fez-se recurso a dois serviços:

- ***JSON-SERVER***
- ***Axios***

O ***JSON-SERVER*** é responsável por ler um [ficheiro](filmes_processed.json) *json* que contém as diversas coleções de dados que o programa necessita, funcionando como uma abstração da base de dados. Já o ***Axios*** é um serviço que permite fazer diversos pedidos *HTTP*, os quais são utilizados pelo servidor para obter os dados necessários, fornecidos pelo ***JSON-SERVER***, para responder ao pedido do utilizador.

Para implementar o referido servidor foram desenvolvidos diversos scripts em *JavaScript*. O script [*principal*](file_server.js) possui a função de criação do servidor *HTTP* e as funções que processam os diversos pedidos recebidos, enviando as respostas necessárias após, quando possível, fazer uso do ***Axios*** ou de ler um ficheiro. Uma das restrições do projeto foi a de apenas aceitar pedidos *HTTP* com o método **GET**, sendo que os restantes métodos não são suportados. Para auxiliar este script foram ainda desenvolvidos diversos scripts auxiliares:

- [*fs_abstraction*](fs_abstraction.js) é um script cuja única função existente lê um ficheiro passado como argumento e envia, logo após a leitura, a resposta ao cliente. No contexto do projeto apenas se utiliza esta função quando se pretende ler um ficheiro **CSS**.
- [*generate_html*](generate_html.js) é o script que contém todo o código necessário para gerar o *HTML* resposta correto para cada um dos pedidos. Este script possui o código para atender aos pedidos de listagem dos diversos filmes, géneros e atores, além da consulta de cada elemento das coleções referidas.
- [*http_response*](http_response.js) é o último script auxiliar desenvolvido, e possui as funções que permitem a abstração de envio das respostas do servidor ao cliente. Neste momento possui funções que respondem com sucesso a envio de dados *HTML* e *CSS*, e possui duas funções para respostas de insucesso. A primeira, mais expecífica, é utilizada quando ocorre um erro num dos pedidos feitos pelo ***Axios***, enquanto que a segunda, mais geral, é utilizada para os restantes casos de resposta de insucesso.

Por fim, o ficheiro [*config*](config.json) possui apenas um objeto *json*, o qual contém alguns dados relativos à porta que o servidor deve utilizar e qual o link que o ***Axios*** deve usar para contactar o ***JSON-SERVER***.