import sys
import math

def ParseInput(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    
    data = [(int(x.split(',')[0]), int(x.split(',')[1])) for x in data.split('\n')]
    return data

def GetArea(reds):
    areas = []
    for j2 in range(len(reds)-1, -1, -1):
        for j1 in range(j2-1, -1, -1):
            areas.append(
                (abs(reds[j2][1] - reds[j1][1]) + 1)
                * (abs(reds[j2][0] - reds[j1][0]) + 1)
            )
    areas.sort(reverse=True)
    return areas

data = ParseInput('./data/09')
print('Part1', GetArea(data)[0])
