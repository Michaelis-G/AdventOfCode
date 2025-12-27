from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    data = []
    f = open(filename, 'r')
    data = f.read()
    f.close()
    return data

@TrackTime
def Part1(data):
    x, y = 0, 0
    houses = set()
    houses.add((x, y))
    for move in data:
        match move:
            case '^': y -= 1
            case 'v': y += 1
            case '>': x += 1
            case '<': x -= 1
        houses.add((x, y))
    print(f'Answer to part 1 is {len(houses)}')

@TrackTime
def Part2(data):
    x, y = 0, 0
    X, Y = 0, 0
    houses = set()
    houses.add((x, y))
    for i, move in enumerate(data[0::2]):
        move = data[2*i:2*i+2]
        match move[0]:
            case '^': y -= 1
            case 'v': y += 1
            case '>': x += 1
            case '<': x -= 1
        houses.add((x, y))
        match move[1]:
            case '^': Y -= 1
            case 'v': Y += 1
            case '>': X += 1
            case '<': X -= 1
        houses.add((X, Y))
    print(f'Answer to part 2 is {len(houses)}')


data = ParseInput('./data/03.input')
Part1(data)
Part2(data)