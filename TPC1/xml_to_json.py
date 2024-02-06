# Converter inspired by tutorial on https://www.geeksforgeeks.org/python-xml-to-json/ but modified to ignore some tags

# Dependencies
# xmltodict (pip install xmltodict)

import json, os, xmltodict, xml.etree.ElementTree as ET

# Still not functioning -> it's adding whitespaces and newline char at "random" points
def ignore_tag(elem, tags, val):
    for c in list(elem):
        if val:
            print(c)

        if c.tag in tags:
            idx = list(elem).index(c)
            if c.text:
                if val:
                    print("C text")
                    print(c.text)
                if elem.text:
                    elem.text += c.text
                    if val:
                        print("Added C text Elem text")
                        print(elem.text)
                else:
                    elem.text = c.text
                    if val:
                        print("Created C text Elem text")
                        print(elem.text)
            if c.tail:
                if val:
                    print("C tail")
                    print(c.tail)
                if idx + 1 < len(elem):
                    if elem[idx + 1].text:
                        elem[idx + 1].text = c.tail + elem[idx + 1].text
                        if val:
                            print("Not last element Added C tail Elem text")
                            print(elem.text)
                    else:
                        elem[idx + 1].text = c.tail
                        if val:
                            print("Not last element Created C tail Elem text")
                            print(elem.text)
                else:
                    if elem.tail:
                        elem.tail += c.tail
                        if val:
                            print("Last elem Added C tail Elem tail")
                            print(elem.tail)
                    else:
                        elem.tail = c.tail
                        if val:
                            print("Last elem Created C tail Elem tail")
                            print(elem.tail)
                    elem.text += elem.tail.strip()

            elem.remove(c)
        else:
            ignore_tag(c, tags, val)

        if val:
            print()

# file_dir = "/mnt/c/Users/Guilherme\ Barbosa/Desktop/UM/3Ano2Semestre/EngWeb/Repo/EngWeb2024/TPC1/MapaRuas-materialBase/MapaRuas-materialBase/texto"
file_dir = "./MapaRuas-materialBase/texto"

final_json = "["

val = True

for filename in os.listdir(file_dir):
    f = open(file_dir + f"/{filename}")

    xml_str = ET.fromstring(f.read())
    ignore_tag(xml_str, ["lugar", "data", "entidade"], val)
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
