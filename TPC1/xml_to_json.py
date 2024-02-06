# Converter inspired by tutorial on https://www.geeksforgeeks.org/python-xml-to-json/ but modified to ignore some tags

# Dependencies
# xmltodict (pip install xmltodict)

import json, os, xmltodict, xml.etree.ElementTree as ET

print(os.listdir(os.getcwd()))

def add_extra_whitespace(c):
    if c == ',' or c == '.' or c == '!' or c == '?' or c == ';':
        return ""

    return " "

# Still not functioning -> it's adding whitespaces and newline char at "random" points
def ignore_tag(elem, tags):
    for c in list(elem):
        if val:
            print(c)

        if c.tag in tags:
            idx = list(elem).index(c)
            if c.text:
                if elem.text:
                    elem.text += ' ' + c.text.strip()
                else:
                    elem.text = ' ' + c.text.strip()
            if c.tail:
                if idx + 1 < len(elem):
                    if elem[idx + 1].text:
                        elem[idx + 1].text = ' ' + c.tail.strip() + elem[idx + 1].text
                    else:
                        elem[idx + 1].text = ' ' + c.tail.strip()
                else:
                    if elem.tail:
                        elem.tail += ' ' + c.tail.strip()
                    else:
                        elem.tail = ' ' + c.tail.strip()

                    elem.text += ' ' + elem.tail.strip()

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
    ignore_tag(xml_str, ["lugar", "data", "entidade"])
    new_xml_str = ET.tostring(xml_str, encoding='unicode')

    file_json = xmltodict.parse(new_xml_str)

    if val:
        print(file_json)

    val = False

    final_json += json.dumps(file_json, ensure_ascii=False)
    final_json += ","
    f.close()

final_json = final_json[:-1] + ']'

f = open('test.json', 'w')
f.write(final_json)
f.close()
