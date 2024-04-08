# importing the requests library
import requests
import sys
import json
 
def main(args):
    URL = "http://localhost:7777/"

    headers = {
        'Content-Type': 'application/json',
    }

    for i in range(1, len(args)):
        file = open(args[i], 'rt', encoding="utf8")

        db = json.load(file)

        for reg in db:
            requests.post(URL, json = reg, headers=headers)

if __name__ == '__main__':
    main(sys.argv)