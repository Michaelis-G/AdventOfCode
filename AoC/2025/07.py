from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseFile(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    data = [row for row in data.split('\n')]
    maze = []
    for row in data:
        maze.append([x for x in row])
    return maze

def GetBeamStartIndex(data):
    for i, c in enumerate(data[0]):
        if c == 'S': return [i]
    return False

def ForkBeams(row, beams, count):
    newbeams = set()
    (splitters) = [i for i, c in enumerate(row) if (c == '^')]
    for beam in beams:
        if beam in splitters:
            count += 1
            newbeams.add(beam - 1)
            newbeams.add(beam + 1)
        else: newbeams.add(beam)
    return count, (newbeams)

@TrackTime
def Part1(data):
    count = 0
    beams = GetBeamStartIndex(data)
    for row in data[1:]:
        count, beams = ForkBeams(row, beams, count)
    print('Answer to part1 is:', count)

@TrackTime
def Part2(data):
    beams = [0 for x in data[0]]
    for i, c in enumerate(data[0]):
        if c == 'S':
            beams[i] = 1
    for i, row in enumerate(data[1::2]):
        y = 2*i
        for x, beam in enumerate(beams):
            if data[y][x] == '^':
                beams[x-1] += beams[x]
                beams[x+1] += beams[x]
                beams[x] = 0
    total = 0
    for beam in beams:
        total += beam
    print(f'Answer to part2 is: {total}')

data = ParseFile('./data/07.input')
Part1(data)
Part2(data)