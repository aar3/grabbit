import random
import io
import string
import socket
import collections
import qrcode


def random_string(n=10):
    char_str = list(string.ascii_letters + string.digits)
    chars = [random.choice(char_str) for _ in range(n)]
    return "".join(chars)


def addr_to_string(addr):
    return ":".join(map(str, addr))


def make_qrcode(s):
    buff = io.BytesIO()
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4,)
    qr.add_data(s)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(buff, format="PNG")

    return buff.getvalue()


def average(arr):
    arr = list(map(float, arr))
    if not arr:
        return 0
    return round(sum(arr) / len(arr), 1)


def most_common(arr):
    counts = collections.defaultdict(lambda: 0)
    m = 0
    max_ = None
    for x in arr:
        counts[x] += 1
        if counts[x] > m:
            m = counts[x]
            max_ = x
    return max_


def django_unix_client(data):
    sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    sock.connect("/tmp/django_socket.s")
    sock.send(data)
