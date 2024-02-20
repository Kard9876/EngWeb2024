# Converter inspired by tutorial on https://www.geeksforgeeks.org/python-xml-to-json/ but modified to ignore some tags

# Dependencies
# xmltodict (pip install xmltodict)

import json, os, xmltodict, xml.etree.ElementTree as ET, copy

# Function acquired through intensive research and some help from BingAI
def ignore_tag(elem, tags):
    for c in list(elem):
        if c.tag in tags.keys():
            init_tag = f"<{tags[c.tag]}>"
            close_tag = f"</{tags[c.tag]}>"

            if c.text:
                if elem.text:
                    elem.text += init_tag + c.text + close_tag + c.tail if c.tail else ""
                else:
                    elem.text = init_tag + c.text + close_tag + c.tail if c.tail else ""

            elem.remove(c)
        else:
            ignore_tag(c, tags)

# file_dir = "/mnt/c/Users/Guilherme\ Barbosa/Desktop/UM/3Ano2Semestre/EngWeb/Repo/EngWeb2024/TPC1/MapaRuas-materialBase/MapaRuas-materialBase/texto"
file_dir = "./MapaRuas-materialBase/texto"

final_json = "["

for filename in os.listdir(file_dir):
    f = open(file_dir + f"/{filename}")
    xml_str = ET.fromstring(f.read())
    f.close()

    ignore_tag(xml_str, {"lugar": "b", "data": "b", "entidade": "i"})
    new_xml_str = ET.tostring(xml_str, encoding='unicode')

    file_json = xmltodict.parse(new_xml_str)

    val = False

    final_json += json.dumps(file_json, ensure_ascii=False, indent=4)
    final_json += ","

final_json = final_json[:-1] + ']'
prev = None

while prev != final_json:
    prev = final_json

    final_json = final_json.replace(" .", ".")
    final_json = final_json.replace(" !", "!")
    final_json = final_json.replace(" ?", "?")
    final_json = final_json.replace(" ;", ";")
    final_json = final_json.replace(" ,", ",")
    final_json = final_json.replace("\\n", " ")
    final_json = final_json.replace("  ", " ")

f = open('ruas.json', 'w')
f.write(final_json)
f.close()
