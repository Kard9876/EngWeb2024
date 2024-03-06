import sys
import json
import re

def main(args):
    og_bd_filename = args[1]

    new_bd_filename = args[2]

    og_bd_file = open(og_bd_filename)

    og_bd = og_bd_file.read()

    og_bd_file.close()

    og_bd = re.sub(r'\s+', ' ', og_bd)
    og_bd = re.sub(r'\\n', '', og_bd)

    og_bd = json.loads(og_bd)

    og_compositores = og_bd.get("compositores", [])
    tmp_periodos = {}
    
    compositores = []
    periodos = []
    

    for compositor in og_compositores:
        id = compositor.get("id")
        nome = compositor.get("nome")
        periodo = compositor.get("periodo")

        if id is not None and nome is not None and periodo is not None:
            dataNasc = compositor.get("dataNasc")
            dataObito = compositor.get("dataObito")

            dataNasc = int(re.search(r'(\d{4})(-\d{2}-\d{2})?', dataNasc).group(1))
            dataObito = int(re.search(r'(\d{4})(-\d{2}-\d{2})?', dataObito).group(1))
            
            compositores.append(compositor)
            cur = tmp_periodos.get(periodo, (100000000, -100000000))

            tmp_periodos[periodo] = (min(cur[0], dataNasc), max(cur[1], dataObito))

    for (k,v) in tmp_periodos.items():
        periodos.append({"id": k, "start": v[0], "end": v[1]})

    new_bd = {
        "compositores": compositores,
        "periodos": periodos
    }

    new_bd_file = open(new_bd_filename, 'wt')

    json.dump(new_bd, new_bd_file, ensure_ascii=False)

    new_bd_file.close()


if __name__ == "__main__":
    main(sys.argv)