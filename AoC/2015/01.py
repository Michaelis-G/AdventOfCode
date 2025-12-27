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
    pos = 0
    for c in data:
        if c == '(': pos += 1
        if c == ')': pos -= 1
    print(f'Answer to part 1 is {pos}')

@TrackTime
def Part2(data):
    pos = 0
    res = 0
    for i, c in enumerate(data):
        if c == '(': pos += 1
        if c == ')': pos -= 1
        if pos == -1:
            res = i
            break
    print(f'Answer to part 2 is {res + 1}')


data = ParseInput('./data/01.input')
Part1(data)
Part2(data)