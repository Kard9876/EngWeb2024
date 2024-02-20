def get_value(obj, tags):
    if len(tags) == 0:
        return ""

    ans = obj.get(tags[0], "")
    p = 1

    while ans != "" and ans is not None and p < len(tags):
        ans = ans.get(tags[p], "")

        p += 1

    return ans

def replace_special_chars(text):
    special_chars = {
        'á': 'a',
        'à': 'a',
        'â': 'a',
        'ã': 'a',
        'é': 'e',
        'ê': 'e',
        'í': 'i',
        'ó': 'o',
        'ô': 'o',
        'õ': 'o',
        'ú': 'u',
        'ç': 'c',
    }

    for special, default in special_chars.items():
        text = text.replace(special, default)

    return text