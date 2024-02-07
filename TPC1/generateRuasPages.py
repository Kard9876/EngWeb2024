import json, os
from common import get_value

dataset = open("ruas.json")

data = json.load(dataset)

dataset.close()

old_image_dir_html = "../MapaRuas-materialBase/imagem"

new_image_dir_html = "../MapaRuas-materialBase/atual"
new_image_dir_python = "./MapaRuas-materialBase/atual"

def generate_new_images_html(nome, number):
    ans = ""
    for filename in os.listdir(new_image_dir_python):
        num = int(filename.split('-')[0])

        if num == number:
            # print(nome, filename)
            # print()

            path = new_image_dir_html + "/" + filename

            ans += f"""
                <div class="w3-card-4 w3-padding w3-margin">
                    <img id="{filename}" src="{path}" alt="{filename}" class="w3-image w3-border">
                    <div class="w3-container w3-center">
                        <p>{nome} atualmente</p>
                    </div>
                </div>
            """
            
    return ans

def generate_images_html(images):
    ans = ""

    if isinstance(images, dict):
        id = get_value(images, ["@id"])
        path = get_value(images, ["imagem", "@path"])
        desc = get_value(images, ["legenda"])

        path = path.split("/")[-1]

        path = old_image_dir_html + "/" + path

        ans = f"""
        <div class="w3-card-4 w3-padding w3-margin">
            <img id="{id}" src="{path}" alt="{desc}" class="w3-image w3-border">
            <div class="w3-container w3-center">
                <p>{desc}</p>
            </div>
        </div>
        """

    if isinstance(images, list):
        ans = ""

        for img in images:
            ans += generate_images_html(img)
    
    return ans

def generate_text_html(text):
    ans = ""

    if isinstance(text, str):
        ans = f"""
            <p class="w3-margin-top">{text}</p>
        """
    
    elif isinstance(text, list):
        for t in text:
            ans += generate_text_html(t)
    
    return ans

def generate_casas_html(casas):
    ans = ""

    if isinstance(casas, dict):
        casa = casas.get("casa")

        if casa != None:
            return generate_casas_html(casa)

        numero = get_value(casas, ["número"])
        enfiteuta = get_value(casas, ["enfiteuta"])
        foro = get_value(casas, ["foro"])
        desc = get_value(casas, ["desc", "para"])

        if isinstance(desc, list):
            final_desc = ""

            for p in desc:
                final_desc += f"<p>{p}</p>"

            desc = final_desc

        ans = f"""
            <tr class="w3-row w3-light-grey">
                <td class="w3-col m2">{numero if numero != None else ""}</td>
                <td class="w3-col m2">{enfiteuta if enfiteuta != None else ""}</td>
                <td class="w3-col m2">{foro if foro != None else ""}</td>
                <td class="w3-col m6">{desc if desc != None else ""}</td>
            </tr>
        """

    if isinstance(casas, list):
        ans = ""

        for casa in casas:
            ans += generate_casas_html(casa)
    
    return ans

for r in data:
    nome = r["rua"]["meta"]["nome"]
    nome_sem_espacos = nome.replace(" ", "_")

    preHTML = f"""
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <title>{nome}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="w3.css">
        <title>Document</title>
    </head>

    <body class="w3-light-grey">

    """

    images = get_value(r, ["rua", "corpo", "figura"])
    imagesHTML = generate_images_html(images)

    number = int(get_value(r, ["rua", "meta", "número"]))
    new_images_html = generate_new_images_html(nome, number)

    text = get_value(r, ["rua", "corpo", "para"])
    textHTML = generate_text_html(text)

    casas = get_value(r, ["rua", "corpo", "lista-casas"])
    casasHTML = generate_casas_html(casas)

    content = f"""
        <header class="w3-container w3-blue-grey w3-center">
            <h3>{nome}</h3>
        </header>

        <div class="w3-row flex-box">
            <div class="w3-col m8 w3-row">
                <div id="images" class="flex-box flex-column flex-grow space-evenly w3-padding w3-margin">
                    <header class="w3-container w3-blue-grey w3-center w3-padding w3-margin">
                        <h3>Planeamento</h3>
                    </header>
                    {imagesHTML}
                </div>
                <div id="images" class="flex-box flex-column flex-grow space-evenly w3-padding w3-margin">
                    <header class="w3-container w3-blue-grey w3-center w3-padding w3-margin">
                        <h3>Atualmente</h3>
                    </header>
                    {new_images_html}
                </div>
            </div>
            <div id="text" class="w3-col m4 w3-center flex-box flex-column flex-grow w3-padding w3-margin-top w3-margin-bottom">
                <div class="flex-box  flex-column flex-grow space-evenly w3-border w3-padding w3-margin-top w3-margin-bottom">
                    {textHTML}
                </div>
            </div>
        </div>

        {"" if casas == "" else 
            f'''
            <div class="w3-margin">
                <table id="casas" class="w3-table-all w3-border w3-margin-top w3-margin-bottom">
                    <tr class="w3-light-grey"><th class="w3-col m2">Número</th><th class="w3-col m2">Enfiteuta</th><th class="w3-col m2">Foro</th><th class="w3-col m6">Descrição</th></tr>
                    {casasHTML}
                </table>
            </div>
            '''
         }

        

        <div class="w3-container w3-blue-grey w3-margin-top">
            <footer class="w3-container">
                <a href="./index.html">Return to home page</a>
                <h5>Generated by RCBApp::EngWeb2024::A100695</h5>
            </footer>
        </div>
    """

    
    posHTML = """
    </body>

    </html>
    """

    pageHTML = preHTML + content + posHTML

    f = open(f'./ruaSite/rua_{nome_sem_espacos}.html', 'wt')
    f.write(pageHTML)
    f.close()
