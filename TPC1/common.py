def get_value(obj, tags):
    ans = obj
    p = 0

    while ans != "" and ans is not None and p < len(tags):
        ans = ans.get(tags[p], "")

        p += 1

    return ans