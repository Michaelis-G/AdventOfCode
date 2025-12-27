def ParseInput(filename):
    f = open(filename, 'r')
    data = f.read().split('\n')
    ranges = []
    foods = []
    for info in data:
        if '-' in info:
            ranges.append(info.split('-'))
        elif not info: continue
        else:
            foods.append(int(info))
    return  [[int(x), int(y)] for [x, y] in ranges], foods

def Part1(ranges, foods):
    cpt = 0
    for f in foods:
        spoiled = True
        for r in ranges:
            if f >= r[0] and f <= r[1]:
                spoiled = False
                break 
        if not spoiled:
            cpt += 1
    print(f'Part1: {cpt}')

def Part2(ranges):
    cpt = 0
    n = 0
    for r in ranges:
        min, max = r[0], r[1]
        if cpt == 0:
            cpt = max - min
            n += 1
            continue
        for r2 in ranges[0:n]:
            min2, max2 = r2[0], r2[1]
            if min > min2 and max < max2:
                

        
    print(f'Part2: {cpt}')



if __name__ == '__main__':
    ranges, foods = ParseInput('./data/05')
    Part1(ranges, foods)
    Part2(ranges)