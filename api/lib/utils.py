import random
import string


def random_string(n=10):
    char_str = list(string.ascii_letters + string.digits)
    chars = [random.choice(char_str) for _ in range(n)]
    return "".join(chars)
