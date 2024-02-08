import json, os
from common import get_value

image_dir_html = "../MapaRuas-materialBase/atual"
image_dir_python = "./MapaRuas-materialBase/atual"

def chaveOrd(r):
    return get_value(r, ["rua", "meta", "nome"])

def get_rua_image(number):
    for filename in os.listdir(image_dir_python):
        num = int(filename.split('-')[0])

        if num == number:
            return image_dir_html + "/" + filename
            
    return ""

dataset = open("ruas.json")

data = json.load(dataset)

dataset.close()

data.sort(key = chaveOrd)

preHTML = """
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <title>Ruas da Cidade de Braga</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="w3.css">
        <title>Document</title>
    </head>

    <body class="w3-light-grey">

            <header class="w3-container w3-blue-grey w3-center">
                <h3>Ruas da Cidade de Braga</h3>
            </header>

            <div class="flex-box flex-center">
                <ul class="no-mark-list w3-margin flex-box flex-column space-evenly" style="width:50%">
    """

posHTML = """
                </ul>
            </div>

            <footer class="w3-container w3-blue-grey">
                <h5>Generated by RCBApp::EngWeb2024::A100695</h5>
            </footer>

    </body>

    </html>
"""

content = ""

for r in data:
    nome = get_value(r, ["rua", "meta", "nome"])
    nome_sem_espacos = nome.replace(" ", "_")

    numero = int(get_value(r, ["rua", "meta", "número"]))

    image = get_rua_image(numero)

    content += f"""
    <li>
        <div class="w3-margin w3-padding w3-container w3-card-4 w3-center">
            <img src="{image}" alt="{nome}" style="width:80%">
            <p>{nome}</p>
            <a class="w3-button w3-light-blue w3-center" href="rua_{nome_sem_espacos}.html">Ver detalhes</a>
        </div>
    </li>
    """

pageHTML = preHTML + content + posHTML

f = open('./ruaSite/index.html', 'w')
f.write(pageHTML)
f.close()