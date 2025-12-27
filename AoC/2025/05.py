filename = "./data/05.input"

def ParseFile(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    return data

def Part1():
    data = ParseFile(filename)
    (ranges, nums) = ([x for x in data.split('\n') if '-' in x], [x for x in data.split('\n') if ('-' not in x and x.strip())])
    res = 0
    for n in nums:
        n = int(n)
        for r in ranges:
            min, max = int(r.split('-')[0]), int(r.split('-')[1])
            if n >= min and n <= max:
                res += 1
                break
    print(f'Part1: {res}')

def Part2():
    data = ParseFile(filename)
    intervals = [[int(x.split('-')[0]), int(x.split('-')[1])] for x in data.split('\n') if '-' in x]
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for current in intervals:
        previous = merged[-1]
        if current[0] <= previous[1]:
            previous[1] = max(previous[1], current[1])
        else:
            merged.append(current)
    total = 0
    for interval in merged:
        diff = interval[1] - interval[0] + 1
        total += diff
    print(f'{total}')

if __name__ == '__main__':
    Part1()
    Part2()