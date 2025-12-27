import sys
import math

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

def Part1(pairs):
    nb = 0
    junctions = []
    for pair in pairs:
        a, b = pair[0][0], pair[0][1]
        j1, j2 = -1, -1
        if not junctions:
            junctions.append([a, b])
            print('4 - New', a, b)
        else:
            for i, junction in enumerate(junctions):
                if a in junction:
                    j1 = i
                elif b in junction:
                    j2 = i
            print(j1, j2)
            if j1 == j2 and j1 != -1 and j2 != -1:
                print('0 - nothing happens same network', a, b, j1, j2)
            elif j1 != -1 and j2 == -1:
                print('1 - add', b, 'to', junctions[j1])
                if b not in junctions[j1]: 
                    junctions[j1].append(b)
            elif j2 != -1 and j1 == -1:
                print('2 - add', a, 'to', junctions[j2])
                if a not in junctions[j2]:
                    junctions[j2].append(a)
            elif j1  != -1 and j2 != -1:
                print('3 - merge', a, b, 'in', junctions[j1], junctions[j2])
                for j in junctions[j2]:
                    junctions[j1].append(j)
                junctions.remove(junctions[j2])
                print('>>', junctions[j1])
            else:
                print('4 - new', a, b)
                junctions.append([a, b])
        nb += 1
        if nb > 999: break
        # print(junctions)
    
    lens = []
    for j in junctions:
        lens.append(len(j))
    lens.sort(reverse=True)
    print(lens)

    res = 1
    for l in lens[:3]:
        res *= l
    print('Part1', res)

if __name__ == '__main__':
    if len(sys.argv) == 1:
        filename = './data/08'
    else:
        filename = './data/08.test'
    boxes = ParseInput(filename)
    pairs = GetPairsByDistances(boxes)
    Part1(pairs)
    
    