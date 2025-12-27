"""
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
    print(f'Answer to part 1 is {total}')

@TrackTime
def Part2(data):
    total = 0
    print(f'Answer to part 1 is {total}')


data = ParseInput('./data/06.input')
Part1(data)
Part2(data)