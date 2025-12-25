import sys

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

def Part(banks, length):
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
    print(f'Part({length}): {cells}')

if __name__ == '__main__':
    banks = ParseInput('./data/03')
    Part(banks, 2)
    Part(banks, 12)
