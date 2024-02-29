import sys
import json
import re

def insert_collection_film(id, title, film_id, collection):
    flag = True

    i = 0

    while i < len(collection) and flag:
        cur_id = collection[i]

        if cur_id["id"] == id:
            flag = False

            cur_id["films"].append({
                "id": film_id,
                "title": title
            })

        i += 1

    if flag:
        collection.append({
            "id": id,
            "films": [{
                "id": film_id,
                "title": title
            }] 
        })

def main(args):
    og_bd_filename = args[1]

    new_bd_filename = args[2]

    og_bd_file = open(og_bd_filename, 'rt')

    films = []
    genres = []
    actors = []

    for reg in og_bd_file:
        reg = json.loads(reg)

        id = reg.get("_id", "").get("$oid", "")
        title = reg.get("title", "")
        year = reg.get("year", "")
        cast = reg.get("cast", "")
        film_genres = reg.get("genres", "")

        final_cast = []
        final_film_genres = []

        for c in cast:
            if re.search(r'^Unknown$', c, re.I) is None:
                final_cast.append(c)

        for g in film_genres:
            if re.search(r'^Unknown$', g, re.I) is None:
                final_film_genres.append(g)
        


        films.append({
            "id" : id,
            "title" : title,
            "year" : year,
            "cast" : final_cast,
            "film_genres" : final_film_genres
        })

        for actor in final_cast:
            insert_collection_film(actor, title, id, actors)

        for genre in final_film_genres:
            insert_collection_film(genre, title, id, genres)

    og_bd_file.close()

    new_bd = {
        "films": films,
        "genres": genres,
        "actors": actors
    }

    new_bd_file = open(new_bd_filename, 'wt')

    json.dump(new_bd, new_bd_file)

    new_bd_file.close()


if __name__ == "__main__":
    main(sys.argv)