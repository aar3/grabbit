import platform
import os

def ensure_envvars_match():
    print(f"{__file__} check...")
    if platform.system() != "Darwin":
        return

    workdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    local = os.path.join(workdir, ".envrc")
    prod = os.path.join(workdir, ".env")

    local_lines = prod_lines = None

    with open(local, "r") as localf:
        local_lines = localf.readlines()

    with open(prod, "r") as prodf:
        prod_lines = prodf.readlines()

    for (i, (locall, prodl)) in enumerate(zip(local_lines, prod_lines)):
        prefix = "export "
        if locall.startswith(prefix) and prodl.startswith("export"):
            n = len(prefix)
            lname, = locall[:n].split("=")
            pname, = prodl[:n].split("=")

            if lname != pname:
                raise Exception(f"Env vars differ: {lname} != {pname} on line {i}")
                
    print(f"{__file__} ok...")

if __name__ == "__main__":

    ensure_envvars_match()