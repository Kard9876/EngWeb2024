# TPC4: Gestão de base de dados de Compositores Musicais
## 2024-03-04

## Autor:
- A100695
- Guilherme João Fernandes Barbosa

## Resumo

Neste quarto projeto da Unidade Curricular de *Engenharia Web* foi proposto o desenvolvimento de uma aplicação de gestão de uma base de dados de compositores musicais. Para tal, foi necessário o desenvolvimento de um [script](process_json.py) que nos forneça a base de dados inicial, escrito em pyhton, o qual lê o ficheiro indicado como primeiro argumento e, caso o formato seja válido, irá criar a base de dados pretendida, escrevendo a mesma no ficheiro indicado como segundo argumento. Esta base de dados será depois disponibilizada à aplicação através do módulo **json-server**.

Para o desenvolvimento da aplicação propriamente dita foram criados diversos scripts:

- [server](server.js) é o ponto de entrada da aplicação e a sua única função, para além de criar o servidor *HTTP* é o de discernir se um pedido possui método *GET* ou *POST* e reencaminhar o mesmo para a respetiva função de processamento. Caso o método do pedido seja outro, o próprio server indicará que não suporta o método pretendido

- [templates](templates.js) é um script cujo único papel é o de preencher a template *HTML* pretendida para cada um dos pedidos

- [static](static.js) possui a função que deteta se um ficheiro é ou não estático[^1], como, por exemplo, um ficheiro *.css* ou uma imagem (neste caso, a única imagem é um favicon[^2]) e a função que envia esse ficheiro na resposta a um pedido

- [request_handler](request_handler.js) é o responsável pelo trabalho mais complexo. Este necessita de verificar qual a rota do pedido e responder ao mesmo. Esta resposta necessita do script *templates* e de, quando necessário, fazer pedidos à base de dados através do **axios** (às vezes mais do que um acesso ao **axios** por pedido). Caso a rota seja destinada a um ficheiro estático, o script recorre ainda ao *static*. São estas respostas aos diversos pedidos que implementam os métodos CRUD sobre os compositores e os períodos disponibilizados pela base de dados.

[^1]: Os diversos ficheiros estáticos encontram-se na diretoria *public*
[^2]: Favicon adquirido a partir de https://www.pngwing.com/en/free-png-bybpd