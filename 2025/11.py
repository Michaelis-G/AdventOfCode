"""
Notes:

MGr
"""

from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    with open(filename, 'r') as f:
        data = {}
        for d in f:
            d = d.strip().split(':')
            data[d[0]] = d[1].split()
    return data

def Flow(data, step, outs = []):
    if step == 'out':
        outs.append('out')
        return outs
    for next in data[step]:
        Flow(data, next, outs)
    return outs

def Track(step, data, total = 0):
    if step == 'out':
        return total, [[]]

    newPaths = []
    steps = data[step]
    for step in steps[:2]:
        total, paths = Track(step, data, total)
        for path in paths:
            newPath = path.copy()
            newPath.append(step)
            if 'dac' in newPath and 'fft' in newPath:
                total += 1
                print(f'Found a new path: {newPath}')
            else:
                newPaths.append(newPath)
    return total, newPaths

@TrackTime
def Part1(data):
    total = len(Flow(data, 'you'))
    print(f'Answer to part 1 is {total}')

@TrackTime
def Part2(data):
    total, ways = Track('svr', data)
    print(f'Answer to part 2 is {total}')

data = ParseInput('./data/11.input')
# Part1(data)
Part2(data)
