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

def flow(data, step, outs = []):
    if step == 'out':
        outs.append('out')
        return outs
    for next in data[step]:
        flow(data, next, outs)
    return outs

def FullFlow(data, stop, paths = []):
    if stop == 'out':
        paths.append([stop])
        return paths
    for step in data[stop]:
        paths.append([step])
        flow(data, step, paths)
    return paths

@TrackTime
def Part1(data):
    total = len(flow(data, 'you'))
    print(f'Answer to part 1 is {total}')

@TrackTime
def Part2(data):
    total = FullFlow(data, 'svr')
    print(f'Answer to part 2 is {total}')

data = ParseInput('./data/11.input.test2')
# Part1(data)
Part2(data)