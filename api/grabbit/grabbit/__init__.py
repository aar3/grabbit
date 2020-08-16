import os
import sys
import pathlib


API_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if not API_DIR in sys.path:
    sys.path.insert(0, API_DIR)
