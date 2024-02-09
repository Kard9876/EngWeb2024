# TPC1: Mapa das Ruas de Braga
## 2024-02-05

## Autor:
- A100695
- Guilherme João Fernandes Barbosa

## Resumo

Neste trabalho utilizou-se o material fornecido pelo docente, ficheiros XML com a informação de 60 ruas de Braga, fotos atuais (associadas a uma determinada vista), fotos dos esquiços desenhados no século XVIII das mesmas ruaspara produzir um website onde se pode consultar e navegar nesta estrutura.

O site apresenta uma página principal com a lista de ruas ordenada alfabeticamente. Clicando numa das ruas acede-se à página individual da rua onde se pode consultar toda a sua informação. Nesta página há também um link para regressar à página principal.

Para converter a informação do formato XML para o formato JSON, foi desenvolvido um script em python 3 [XML to JSON](xml_to_json.py), o qual permite ignorar algumas tags durante a conversão e manter o conteúdo das mesmas na ordem original. As tags XML ignoradas neste trabalho são as tags de "lugar", "data" e "entidade".

Para gerar o index, com a lista de páginas ordenada anteriormente referia, foi desenvolvido um script em python 3 [Generate Index](generateIndex.py) que lê o ficheiro JSON anteriormente referido e, a partir daí, consegue obter as informações necessárias de cada página, nomeadamente o nome e número da rua, para desenvoler a página index. Um detalhe adicionado foi que, para cada rua, aparece uma imagem atual da mesma.

Por fim, para gerar as páginas HTML estáticas de cada uma das rua, foi desenvolvido mais um script em python 3 [Generate Ruas' pages](generateRuasPages.py), o qual volta a ler o ficheiro JSON criado pelo primeiro script e, com as informações necessárias de cada rua, cria a página da mesma, a qual contém imagens atuais e relativas ao planeamento inicial de cada rua, seguidas de um pequeno texto informativo sobre a mesma e finalizando, quando possível, com uma tabela indicativa, para cada casa presente na rua, do seu número, enfiteuta, foro e uma pequena descrição.
