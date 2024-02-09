def get_value(obj, tags):
    if len(tags) == 0:
        return ""

    ans = obj.get(tags[0], "")

    for p in tags[1::]:
        if ans == "" or not(isinstance(ans, dict)):
            break

        ans = ans.get(p, "")

    return ans