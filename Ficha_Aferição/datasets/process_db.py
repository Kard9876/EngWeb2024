import sys
import json

def main(args):
    if len(args) < 3:
        print("Wrong number of arguments")

    else:
        or_file = open(args[1], 'rt', encoding="utf8")

        db = json.load(or_file)['pessoas']

        or_file.close()

        ans = []

        for reg in db:
            reg['_id'] = reg.get('BI')

            if reg['_id'] is None:
                reg['_id'] = reg.get('CC')
                del reg['CC']

            else:
                del reg['BI']

            reg['descricao'] = reg.get('descrição', '')

            if reg.get('descrição') is not None:
                del reg['descrição']

            print(reg)

            ans.append(reg)

        dest_file = open(args[2], 'wt')

        json.dump(ans, dest_file, ensure_ascii=False)

        dest_file.close()





if __name__ == "__main__":
    main(sys.argv)