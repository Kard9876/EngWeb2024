import json, sys, re

from common import get_value, replace_special_chars

def ordKey(cidade):
    name = get_value(cidade, ["nome"]).lower()

    return replace_special_chars(name)

def main(args):
    dataset = open('mapa-virtual.json', 'rt')
    data = json.load(dataset)
    dataset.close()

    cities = get_value(data, ["cidades"])

    cities.sort(key = ordKey)

    config_file = open('config.json', 'rt')
    config_text = json.load(config_file)
    config_file.close()

    default_url = config_text["URL"]

    preHTML = """
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <title>Mapa Virtual</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="style.css">
            <link rel="stylesheet" href="w3.css">
        </head>

        <body class="w3-light-grey">

                <header class="w3-container w3-blue-grey w3-center">
                    <h3>Mapa Virtual</h3>
                </header>

                <div class="flex-box flex-center">
                    <ul class="no-mark-list w3-margin flex-box flex-column space-evenly" style="width:50%">
        """

    posHTML = """
                    </ul>
                </div>

                <footer class="w3-container w3-blue-grey">
                    <h5>Generated by MVApp::EngWeb2024::A100695</h5>
                </footer>

        </body>

        </html>
    """

    content = ""

    for c in cities:
        name = get_value(c, ["nome"])
        id = get_value(c, ["id"])

        content += f"""
            <li>
                <div class="w3-light-blue w3-margin w3-padding w3-container w3-card-4 w3-center">
                    <a class="w3-center remove-text-decoration w3-hover-blue" href="{default_url}{id}">{name}</a>
                </div>
            </li>
            """

    pageHTML = preHTML + content + posHTML

    output_file = open("MapaVirtualSite/index.html", 'wt')
    output_file.write(pageHTML)
    output_file.close()

    return 0       


if __name__ == "__main__":
    main(sys.argv)
