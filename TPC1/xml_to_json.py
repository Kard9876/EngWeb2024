# Converter inspired by tutorial on https://www.geeksforgeeks.org/python-xml-to-json/

# Dependencies
# xmltodict (pip install xmltodict)

import json, os, xmltodict

file_dir = "/mnt/c/Users/Guilherme\ Barbosa/Desktop/UM/3Ano2Semestre/EngWeb/Repo/EngWeb2024/TPC1/MapaRuas-materialBase/MapaRuas-materialBase/texto"

final_json = []

for filename in os.listdir(file_dir):
    f = open(filename)
    final_json.append(xmltodict.parse(f.read()))
