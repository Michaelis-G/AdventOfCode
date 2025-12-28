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
    f.close()
    return data

def GetMaxFromRange(battery, min, max):
    best = 0
    index = 0
    # print(battery[min:max])
    for i, cell in enumerate(battery[min:max]):
        cell = int(cell)
        if (cell > best):
            best = cell
            index = i
    return index + min, best

def GetCells(banks, length):
    cells = 0
    for bank in banks:
        i = 0
        cell = ''
        for n in range(length, 0, -1):
            i, c = GetMaxFromRange(bank, i, len(bank) - n + 1)
            # print(i, c)
            i += 1
            cell += str(c)
        cells += int(cell)
    return cells

@TrackTime
def Part1(cells):
    cells = GetCells(banks, 2)
    print(f'Answer ot part1 is: {cells}')

@TrackTime
def Part2(cells):
    cells = GetCells(banks, 12)
    print(f'Answer ot part2 is: {cells}')

banks = ParseInput('./data/03.input')
Part1(banks)
Part2(banks)
