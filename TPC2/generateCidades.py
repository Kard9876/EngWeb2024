import json, sys, re

from common import get_value

def main(args):
    dataset = open('mapa-virtual.json', 'rt')
    data = json.load(dataset)
    dataset.close()

    cities = get_value(data, ["cidades"])
    links = get_value(data, ["ligacoes"])

    config_file = open('config.json', 'rt')
    config_text = json.load(config_file)
    config_file.close()

    default_url = config_text["URL"]

    cities_dict = {}

    for c in cities:
        name = get_value(c, ["nome"])
        city_id = get_value(c, ["id"])

        cities_dict[city_id] = name

    for c in cities:
        name = get_value(c, ["nome"])
        city_id = get_value(c, ["id"])
        population = get_value(c, ["população"])
        description = get_value(c, ["descrição"])
        district = get_value(c, ["distrito"])

        preHTML = f"""
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <title>{name}</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="style.css">
                <link rel="stylesheet" href="w3.css">
            </head>

            <body class="w3-light-grey">

                    <header class="w3-container w3-blue-grey w3-center">
                        <h3>{name}</h3>
                    </header>

                    <div class="w3-row w3-container flex-box flex-center w3-margin-top w3-margin-bottom">
                        <table id="casas" class="w3-col m6 w3-table-all w3-border w3-margin-top w3-margin-bottom">
                            <tr class="w3-light-grey"><th class="w3-col m6 w3-container w3-center">Id</th><td class="w3-col m6 w3-container w3-center">{city_id}</td>
                            <tr class="w3-light-grey"><th class="w3-col m6 w3-container w3-center">Nome</th><td class="w3-col m6 w3-container w3-center">{name}</td>
                            <tr class="w3-light-grey"><th class="w3-col m6 w3-container w3-center">Distrito</th><td class="w3-col m6 w3-container w3-center">{district}</td>
                            <tr class="w3-light-grey"><th class="w3-col m6 w3-container w3-center">População</th><td class="w3-col m6 w3-container w3-center">{population}</td>
                            <tr class="w3-light-grey"><th class="w3-col m6 w3-container w3-center">Descrição</th><td class="w3-col m6 w3-container w3-center">{description}</td>
                        </table>
                    </div>

                    <div class="flex-box flex-center">
                        <header class="w3-container w3-blue-grey w3-center w3-margin">
                            <p><b>Ligações</b></p>
                        </header>

                        <ul class="no-mark-list w3-margin w3-padding flex-box flex-column space-evenly" style="width:50%">
            """
        
        content = ""

        for l in links:
            from_city = get_value(l, ["origem"])
            to_city = get_value(l, ["destino"])
            distance = get_value(l, ["distância"])

            if from_city == city_id:
                content += f"""
                    <li class="w3-card-4 w3-padding w3-margin">
                        <a class="w3-center remove-text-decoration w3-hover-blue" href="{default_url}{to_city}">{cities_dict[to_city]}</a>
                        <p>Distance: {distance} Km</p>
                    </li>
                """

        postHTML = f"""
                        </ul>
                    </div>

                    <footer class="w3-container w3-blue-grey w3-margin-top">
                        <a class="w3-center remove-text-decoration w3-hover-blue" href="{default_url}">Voltar à página inicial</a>
                        <h5>Generated by MVApp::EngWeb2024::A100695</h5>
                    </footer>

            </body>

            </html>
        """

        pageHTML = preHTML + content + postHTML

        page_file = open(f'MapaVirtualSite/{city_id}.html', 'wt')
        page_file.write(pageHTML)
        page_file.close()

if __name__ == "__main__":
    main(sys.argv)