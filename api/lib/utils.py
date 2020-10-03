import random
import string

import qrcode


def random_string(n=10):
    char_str = list(string.ascii_letters + string.digits)
    chars = [random.choice(char_str) for _ in range(n)]
    return "".join(chars)


def make_qrcode(s):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4,)
    qr.add_data(s)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    return img
