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
    data = [(int(x.split(',')[0]), int(x.split(',')[1])) for x in data.split('\n')]
    return data

@TrackTime
def Part1(reds):
    areas = []
    for j2 in range(len(reds)-1, -1, -1):
        for j1 in range(j2-1, -1, -1):
            areas.append(
                (abs(reds[j2][1] - reds[j1][1]) + 1)
                * (abs(reds[j2][0] - reds[j1][0]) + 1)
            )
    areas.sort(reverse=True)
    print(f'Answer to part1 is: {areas[0]}')

def CreateEmptyRoom(size):
    return [[0 for x in range(size)] for y in range(size)]

def GetRedCarpets(filename):
    carpets = []
    with open(filename, 'r') as f:
        for carpet in f:
            carpets.append([
                int(carpet.strip().split(',')[0]),
                int(carpet.strip().split(',')[1]),
            ])
    return carpets

@TrackTime
def Part2(redCarpets, room):
    res = 0

    for x, c in enumerate(redCarpets[:-1]):
        for y, d in enumerate(redCarpets[x+1:]):
            if c[0] == d[0]:
                print(x, y+x+1, c, d)
                print('v line')
                for y in range(c[1], d[1]+1):
                    room[c[0]][y] = 1
            if c[1] == d[1]:
                print(x, y+x+1, c, d)
                print('h line')
                for x in range(c[0], d[0]+1):
                    room[x][c[1]] = 1
    for r in (room):
        print(r)

    print(f'Answer to part1 is: {res}')

# data = ParseInput('./data/09.input.test')
# Part1(data)

room = CreateEmptyRoom(16)
redCarpets = GetRedCarpets('./data/09.input.test')
print(redCarpets)
Part2(redCarpets, room)