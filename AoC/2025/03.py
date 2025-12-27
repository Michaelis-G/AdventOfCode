filename = "./data/03.input.test"

def ParseFile(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    return [x for x in data.split('\n')]

def Part1(data):
    res = 0
    for battery in data:
        battery = [int(x) for x in str(battery)]
        for i, n in enumerate(battery[:-1]):
            m = max(battery[:-1])
            if (n == m):
                a = n
                break
        b = max(battery[i+1:])
        res += int(str(a) + str(b))
    print(f'Part1: {res}')

def Part2(bank):
    res = 0
    for batt in bank:
        nb = 12
        batt = [int(x) for x in batt]
        print(f'Battery: {batt}')
        index = 0
        for n in range(nb, 1, -1):
            print(index)
            curr = 0
            for i, cell in enumerate(batt[index:len(batt)-n+1]):
                print(batt[index:len(batt)-n+1])
                if cell > curr:
                    curr = cell
                    break
            print(f'Curr: {curr} at {i} in {batt[0:len(batt)-n+1]}')
            index += (i+1)
        

if __name__ == "__main__":
    data = ParseFile(filename)
    Part2(data)
