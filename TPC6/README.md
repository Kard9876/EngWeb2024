# TPC6: Gestão de base de dados de Compositores Musicais
## 2024-03-18

## Autor:
- A100695
- Guilherme João Fernandes Barbosa

## Resumo

Neste sexto projeto da Unidade Curricular de *Engenharia Web* foi novamente proposto o desenvolvimento do projeto de *Gestão de base de dados de Compositores Musicais*[^1], porém com recurso a **mongoDB** e à construção de uma **API de dados** com a qual o front-end comunica. Para tal, a nível do código do *TPC5*, foram realizadas alterações que permitem a comunicação com a api de dados e foram desenvolvidas novas templates *pug* para abrangir novas situações de erro. Foi ainda desenvolvida a [API de dados](API_Compositores/) e foi alterado o [script](API_Compositores/process_json.py) que processa o json (originalmente desenvolvido no *TPC4*) para, desta vez, criar dois ficheiros json que dão origem a duas coleções diferentes no mongoDB.

Para a implementação da api de dados foram desenvolvidos:

- os [controladores](API_Compositores/controllers/) e os [modelos](API_Compositores/models/) de um compositor e de um período,

- as [rotas](API_Compositores/routes/) que processam os pedidos feitos aos compositores e aos períodos.

Para permitir a comunicação com o *mongoDB* foi específicada, no ficheiro [app](API_Compositores/app.js), a connection string de ligação à base de dados.

[^1]: Os ficheiros estáticos obtidos externamente são os utilizados no TPC4 e TPC5