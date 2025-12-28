import math
from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    
    data = [(int(x.split(',')[0]), int(x.split(',')[1]), int(x.split(',')[2])) for x in data.split('\n')]
    return data

def dist(a, b):
    return math.sqrt(
        (b[0]-a[0])**2
        + (b[1]-a[1])**2
        + (b[2]-a[2])**2
    )

def GetPairsByDistances(boxes):
    pairs = []
    for j2 in range(len(boxes)-1, -1, -1):
        for j1 in range(j2-1, -1, -1):
            pairs.append(((boxes[j1], boxes[j2]), dist(boxes[j1], boxes[j2])))
    pairs.sort(key = lambda x: x[1], reverse=False)
    return pairs

@TrackTime
def Part1(pairs, limit):
    nb = 0
    junctions = []
    for pair in pairs:
        a, b = pair[0][0], pair[0][1]
        j1, j2 = -1, -1
        if not junctions:
            junctions.append([a, b])
        else:
            for i, junction in enumerate(junctions):
                if a in junction:
                    j1 = i
                elif b in junction:
                    j2 = i
            if j1 == j2 and j1 != -1 and j2 != -1:
                pass
            elif j1 != -1 and j2 == -1:
                if b not in junctions[j1]: 
                    junctions[j1].append(b)
            elif j2 != -1 and j1 == -1:
                if a not in junctions[j2]:
                    junctions[j2].append(a)
            elif j1  != -1 and j2 != -1:
                for j in junctions[j2]:
                    junctions[j1].append(j)
                junctions.remove(junctions[j2])
            else:
                junctions.append([a, b])
        nb += 1
        if nb > (limit - 1): break
        # print(junctions)
    
    lens = []
    for j in junctions:
        lens.append(len(j))
    lens.sort(reverse=True)

    res = 1
    for l in lens[:3]:
        res *= l
    print(f'Answer to part1 is: {res}')

@TrackTime
def Part2(pairs):
    nb = 0
    junctions = []
    end = False
    for pair in pairs:
        a, b = pair[0][0], pair[0][1]
        j1, j2 = -1, -1
        if not junctions:
            junctions.append([a, b])
        else:
            for i, junction in enumerate(junctions):
                if a in junction:
                    j1 = i
                elif b in junction:
                    j2 = i
            if j1 == j2 and j1 != -1 and j2 != -1:
                pass
            elif j1 != -1 and j2 == -1:
                if b not in junctions[j1]: 
                    junctions[j1].append(b)
            elif j2 != -1 and j1 == -1:
                if a not in junctions[j2]:
                    junctions[j2].append(a)
            elif j1  != -1 and j2 != -1:
                for j in junctions[j2]:
                    junctions[j1].append(j)
                junctions.remove(junctions[j2])
            else:
                junctions.append([a, b])
        nb += 1
        # if nb > (limit - 1): break
        for j in junctions:
            if len(j) == 1000:
                res = pair[0][0][0] * pair[0][1][0]
                end = True
        if end:
            break
    print(f'Answer to part2 is: {res}')

boxes = ParseInput('./data/08.input')
pairs = GetPairsByDistances(boxes)
Part1(pairs, 1000)
Part2(pairs)