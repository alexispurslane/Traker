#!/usr/local/bin/python3.4
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

print(bcolors.HEADER + "-----Grunt Server------" + bcolors.ENDC)
print("""
    With command: grunt server.........
    Access it at http://0.0.0.0:8000...
""")

print(bcolors.HEADER + "-----Grunt Dist------" + bcolors.ENDC)
print("""
    With command: grunt dist...
    Access it in dist/ ........
""")

print(bcolors.HEADER + "-----Move Files to Traker------" + bcolors.ENDC)
print("""
    With command: mv dist/* ../Traker && mv dist/assets/* ../Traker/assets...
    Access it by letting this program completely run........................
""")

print(bcolors.HEADER + "-----Start Node-Webkit------" + bcolors.ENDC)
print("""
    With command: open -n -a node-webkit "~/Downloads/node-webkit-master\ 2/Traker"...
    Access it by waiting..............................................................
""")

