# TPC5: Gestão de base de dados de Compositores Musicais
## 2024-03-11

## Autor:
- A100695
- Guilherme João Fernandes Barbosa

## Resumo

Neste quinto projeto da Unidade Curricular de *Engenharia Web* foi proposto o re-desenvolvimento do mesmo projeto do TPC4 [^1], porém com recurso aos módulos *express* e *pug*, onde o primeiro facilita a implementação das diversas rotas disponibilizadas pela aplicação, enquanto o segundo permite a utilização de templates para o desenvolvimento de páginas HTML.

Para o desenvolvimento da aplicação propriamente dita foram desenvolvidos diversas pastas e scripts:

- [www](bin/www) é o ponto de entrada da aplicação, no qual o servidor *HTTP* é criado

- [app](app.js) define o pipeline vertical de processamento dos diversos pedidos recebidos pela aplicação 

- [routes](routes/) é a pasta que contém os diversos manipuladores de rotas desenvolvidos. Os scripts aqui presentes processam as rotas '/' ([index](routes/index.js)), '/periodos[/*]' ([periodos](routes/periodos.js)) e '/compositores[/*]' ([compositores](routes/compositores.js)).

- [view](view/) é a pasta onde estão presentes todas as templates criadas. Cada uma das templates é o equivalente, em *pug*, ao *HTML* desenvolvido no projeto anterior (TPC4)

- [public](public/) é a pasta onde estão localizados todos os ficheiros estáticos disponibilizados pela aplicação desenvolvida

[^1]: Os ficheiros estáticos obtidos externamente são os utilizados no TPC4