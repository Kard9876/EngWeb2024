def get_value(obj, tags):
    if len(tags) == 0:
        return ""

    ans = obj.get(tags[0], "")
    p = 1

    while ans != "" and ans is not None and p < len(tags):
        ans = ans.get(tags[p], "")

        p += 1

    return ans