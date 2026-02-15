from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    f = open(filename, 'r')
    data = f.read().split('\n')
    ranges = []
    foods = []
    for info in data:
        if '-' in info:
            ranges.append(info.split('-'))
        elif not info: continue
        else:
            foods.append(int(info))
    return  [[int(x), int(y)] for [x, y] in ranges], foods

@TrackTime
def Part1(ranges, foods):
    cpt = 0
    for f in foods:
        spoiled = True
        for r in ranges:
            if f >= r[0] and f <= r[1]:
                spoiled = False
                break 
        if not spoiled:
            cpt += 1
    print(f'Answer to part1 is: {cpt}')

def Union(r, p):
    return [min(r[0], p[0]), max(r[1], p[1])]

def ProcessNext(ranges, i):
    r = ranges[i]
    n = None
    for p in ranges:
        if r[0]>p[1] or r[1]<p[0] or (r[0] == p[0] and r[1] == p[1]):
            continue
        else:
            n = Union(r, p)
            break
    if n is None: return None
    ranges.remove(r)
    ranges.remove(p)
    ranges.append(n)
    return ranges

@TrackTime
def Part2(ranges):
    fresh = 0
    i = 0
    ranges.sort()
    while i < len(ranges):
        processed = ProcessNext(ranges, i)
        if processed is None:
            i += 1
            continue
        ranges = processed

    ranges.sort()
    for i, r in enumerate(ranges[1:]):
        if r[0] < ranges[i-1][1]:
            print(r, ranges[i-1], ranges[i-1][1] - r[0])
    for r in ranges:
        fresh += (r[1]-r[0]+1)

    print(f'Answer to part2 is: {fresh}')

ranges, foods = ParseInput('./data/05.input')
# Part1(ranges, foods)
Part2(ranges)