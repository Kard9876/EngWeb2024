# Converter inspired by tutorial on https://www.geeksforgeeks.org/python-xml-to-json/ but modified to ignore some tags

# Dependencies
# xmltodict (pip install xmltodict)

import json, os, xmltodict, xml.etree.ElementTree as ET, copy

# Function acquired through intensive research and some help from BingAI
def ignore_tag(elem, tags):
    for c in list(elem):
        if c.tag in tags:
            idx = list(elem).index(c)
            if c.text:
                if elem.text:
                    elem.text += ' ' + c.text
                else:
                    elem.text = ' ' + c.text
            if c.tail:
                if idx + 1 < len(elem):
                    if elem[idx + 1].text:
                        elem[idx + 1].text = ' ' + c.tail + elem[idx + 1].text
                    else:
                        elem[idx + 1].text = ' ' + c.tail
                else:
                    if elem.tail:
                        elem.tail += ' ' + c.tail
                    else:
                        elem.tail = ' ' + c.tail

                    elem.text += ' ' + elem.tail

            elem.remove(c)
        else:
            ignore_tag(c, tags)

# file_dir = "/mnt/c/Users/Guilherme\ Barbosa/Desktop/UM/3Ano2Semestre/EngWeb/Repo/EngWeb2024/TPC1/MapaRuas-materialBase/MapaRuas-materialBase/texto"
file_dir = "./MapaRuas-materialBase/texto"

final_json = "["

val = True

for filename in os.listdir(file_dir):
    f = open(file_dir + f"/{filename}")
    xml_str = ET.fromstring(f.read())
    f.close()

    ignore_tag(xml_str, ["lugar", "data", "entidade"])
    new_xml_str = ET.tostring(xml_str, encoding='unicode')

    file_json = xmltodict.parse(new_xml_str)

    if val:
        print(file_json)

    val = False

    final_json += json.dumps(file_json, ensure_ascii=False)
    final_json += ","

final_json = final_json[:-1] + ']'

while True:
    prev = final_json

    final_json = final_json.replace(" .", ".")
    final_json = final_json.replace(" !", "!")
    final_json = final_json.replace(" ?", "?")
    final_json = final_json.replace(" ;", ";")
    final_json = final_json.replace(" ,", ",")
    final_json = final_json.replace("\\n", " ")
    final_json = final_json.replace("  ", " ")

    if prev == final_json:
        break

f = open('ruas.json', 'w')
f.write(final_json)
f.close()
