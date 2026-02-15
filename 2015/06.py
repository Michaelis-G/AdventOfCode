"""
ex:
turn on 351,678 through 951,908
toggle 720,196 through 897,994

in a 1000x10000 matrix of lights
"""

from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    data = []
    with open(filename, 'r') as f:
        for l in f:
            data.append(l.strip())
    f.close()
    return data

@TrackTime
def Part1(data):
    total = 0
    lights = [[0 for x in range(1000)] for y in range(1000)]

    for instruction in data:
        if 'turn' in instruction:
            tl = [int(x) for x in instruction.split()[2].split(',')]
            br = [int(x) for x in instruction.split()[4].split(',')]
        elif 'toggle' in instruction:
            tl = [int(x) for x in instruction.split()[1].split(',')]
            br = [int(x) for x in instruction.split()[3].split(',')]
        else:
            continue

        for x in range(tl[0], br[0] + 1):
            for y in range(tl[1], br[1] + 1):
                if 'turn on' in instruction:
                    lights[x][y] = 1
                if 'turn off' in instruction:
                    lights[x][y] = 0
                elif 'toggle' in instruction:
                    lights[x][y] = (lights[x][y] + 1) % 2

    for y, line in enumerate(lights):
        for x, light in enumerate(line):
            if light == 1:
                total += 1
    print(f'Answer to part 1 is {total}')

@TrackTime
def Part2(data):
    total = 0
    lights = [[0 for x in range(1000)] for y in range(1000)]

    for instruction in data:
        if 'turn' in instruction:
            tl = [int(x) for x in instruction.split()[2].split(',')]
            br = [int(x) for x in instruction.split()[4].split(',')]
        elif 'toggle' in instruction:
            tl = [int(x) for x in instruction.split()[1].split(',')]
            br = [int(x) for x in instruction.split()[3].split(',')]
        else:
            continue

        for x in range(tl[0], br[0] + 1):
            for y in range(tl[1], br[1] + 1):
                if 'turn on' in instruction:
                    lights[x][y] += 1
                if 'turn off' in instruction:
                    lights[x][y] -= 1
                    if lights[x][y] < 0: lights[x][y] = 0
                elif 'toggle' in instruction:
                    lights[x][y] += 2

    for y, line in enumerate(lights):
        for x, light in enumerate(line):
            total += light
    print(f'Answer to part 1 is {total}')


data = ParseInput('./data/06.input')
# test = [
#     'turn on 0,0 through 999,999',
#     'toggle 0,0 through 999,0',
#     'turn off 499,499 through 500,500',
# ]
# Part1(test)
Part1(data)
Part2(data)