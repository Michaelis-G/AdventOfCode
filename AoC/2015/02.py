from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    data = []
    with open(filename, 'r') as f:
        for l in f:
            data.append(l.strip())
    f.close()
    return data

@TrackTime
def Part1(data):
    total = 0
    for dim in data:
        d = [int(x) for x in dim.split('x')]
        d = [d[0]*d[1], d[0]*d[2], d[1]*d[2]]
        d.sort()
        for x in d:
            total += 2*x
        total += d[0]
    print(f'Answer to part 1 is {total}')

@TrackTime
def Part2(data):
    total = 0
    for d in data:
        d = [int(x) for x in d.split('x')]
        d.sort()
        total += (2*d[0]+2*d[1]+d[0]*d[1]*d[2])
    print(f'Answer to part 1 is {total}')


data = ParseInput('./data/02.input')
Part1(data)
Part2(data)