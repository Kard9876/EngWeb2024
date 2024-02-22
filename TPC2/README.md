# TPC2: Mapa Virtual
## 2024-02-19

## Autor:
- A100695
- Guilherme João Fernandes Barbosa

## Resumo

Neste segundo projeto foi proposto o desenvolvimento de um serviço de entrega de ficheiros. Este serviço, chamemos de *file server*, deverá recebe um pedido **http** e responder com o respetivo ficheiro. Os ficheiros que o *file server* deverá entregar são:

- Uma página [**index**](MapaVirtualSite/index.html), a qual contém a lista das cidades presentes no dataset fornecido pelo docente, ordenada por ordem alfabética
- A página de da cidade requirida (por exemplo [**Paços de Ferreira**](MapaVirtualSite/c1.html)), a qual contém as diversas informações da mesma, desde o seu id e nome, até ao distrito a que pertence, a sua população e uma pequena descrição. Além destas informações, a página apresenta ainda uma lista com as ligações da cidade, isto é, uma lista de cidades que podem ser alcançadas a partir da cidade atual, juntamente com a distância da respetiva viagem
- Os ficheiros css necessários para a renderização correta da página. Neste caso, os ficheiros são apenas o [**w3.css**](MapaVirtualSite/w3.css) e um ficheiro desenvolvido por mim ([**style.css**](MapaVirtualSite/style.css))

O file server foi ainda desenvolvido de forma a aceitar apenas requests com o método ***GET***, enviando ao utilizador, quando o pedido que faz utiliza outro método ou que procure obter um ficheiro que não exista, a mensagem que não é possível obter o serviço pretendido.

Para gerar a página [**index**](MapaVirtualSite/index.html), foi criado um [**script**](generateIndex.py) em python que lê o dataset fornecido e escreve o código *HTML* necessário. Já no caso das páginas das diversas cidades, foi utilizado um outro [**script**](generateCidades.py), que lê o mesmo ficheiro e, para cada cidade lá presente, verifica quais as ligações que a mesma possui. Para otimizar este passo, a lista em *json* que contém as diversas cidades é lida duas vezes. A primeira guarda as cidades num dicionário, utilizando como chave o id da mesma e como valor o seu nome. A segunda passagem escreve o *HTML* necessário para a página de cada cidade. 