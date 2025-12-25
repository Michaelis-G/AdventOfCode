def ParseInput(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    
    data = [(x[0], int(x[1:])) for x in data.split('\n')]
    return data

if __name__ == '__main__':
    data = ParseInput('./data/01')
    print(data)
    cpt = 0
    pos = 50
    for r in data:
        if r[0] == 'R':
            inc = 1
        else:
            inc = -1
        print('start dial', r[1], pos, inc)
        for n in range(1, r[1]+1):
            # print(pos, inc)
            pos += inc
            if pos % 100 == 0:
                cpt += 1
                print(r[1], 'boom bitch', pos, cpt)
        print('end dial', r[1], pos, inc)
    print(f"Part2: {cpt}")