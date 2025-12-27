"""
"""

test = """
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
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

def Affectation(i, values):
    values[i[2]] = int(i[0])

def And(i, values):
    values[i[4]] = values[i[0]] & values[i[2]]

def Or(i, values):
    values[i[4]] = values[i[0]] | values[i[2]]

@TrackTime
def Part1(data):
    total = 0
    values = {}
    for instruction in data:
        if not instruction: continue
        print(instruction)
        if 'AND' in instruction:
            And(instruction.split(), values)
        elif 'OR' in instruction:
            Or(instruction.split(), values)
        elif 'RSHIFT' in instruction:
            i = instruction.split()
            values[i[4]] = values[i[0]] >> int(i[2])
        elif 'LSHIFT' in instruction:
            i = instruction.split()
            values[i[4]] = values[i[0]] << int(i[2])
        elif 'NOT' in instruction:
            i = instruction.split()
            values[i[3]] = 65535 - int(values[i[1]])
        else:
            Affectation(instruction.split(), values)
        print(instruction, values)

    print(f'Answer to part 1 is {values['a']}')

@TrackTime
def Part2(data):
    total = 0
    print(f'Answer to part 1 is {total}')


data = ParseInput('./data/07.input')
# data = test.split('\n')
# print(data)
Part1(data)
Part2(data)