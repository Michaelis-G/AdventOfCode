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
    for y, row in enumerate(data):
        data[y] = [x for x in row]
    f.close()
    return data

def CheckRoll(shelf, y, x):
    numRoll = 0
    if (x > 0 and y > 0 and shelf[y-1][x-1] == '@'): numRoll += 1
    if y > 0 and shelf[y-1][x] == '@': numRoll += 1
    if y > 0 and x < (len(shelf[y]) -1) and shelf[y-1][x+1] == '@': numRoll += 1
    if x > 0 and shelf[y][x-1] == '@': numRoll += 1
    if x < (len(shelf[y]) -1) and shelf[y][x+1] == '@': numRoll += 1
    if x > 0 and y < (len(shelf) -1) and shelf[y+1][x-1] == '@': numRoll += 1
    if y < (len(shelf) - 1) and shelf[y+1][x] == '@': numRoll += 1
    if x < (len(shelf[y]) -1) and y < (len(shelf) - 1) and shelf[y+1][x+1] == '@': numRoll += 1

    if numRoll > 3: 
        return False
    return [y, x]

def NewShelf(shelf, rolls):
    for roll in rolls:
        shelf[roll[0]][roll[1]] = '.'
    return shelf

@TrackTime
def Part1(shelf):
    cpt = 0
    for y, row in enumerate(shelf):
        for x, c in enumerate(row):
            if c == '.': continue
            if CheckRoll(shelf, y, x): cpt += 1
    print(f'Answer to part1 is: {cpt}')

@TrackTime
def Part2(shelf):
    cpt = 0
    while True:
        rolls = []
        for y, row in enumerate(shelf):
            for x, c in enumerate(row):
                if c == '.': continue
                roll = CheckRoll(shelf, y, x)
                if roll:
                    cpt += 1
                    rolls.append(roll)
        if not rolls: break
        shelf = NewShelf(shelf, rolls)
    print(f'Answer to part2 is: {cpt}')

shelf = ParseInput('./data/04.input')
Part1(shelf)
Part2(shelf)