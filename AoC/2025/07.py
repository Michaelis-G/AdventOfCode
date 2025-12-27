filename = "./data/07.input"

def ParseFile(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    data = [row for row in data.split('\n')]
    maze = []
    for row in data:
        maze.append([x for x in row])
    return maze

def GetBeamIndex(row):
    (start) = [i for i, c in enumerate(row) if (c == 'S')]
    return (start)

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

def Part1():
    count = 0
    data = ParseFile(filename)
    beams = GetBeamIndex(data[0])

    for row in data[1:]:
        count, beams = ForkBeams(row, beams, count)
    print('Part1:', count)

Part1()