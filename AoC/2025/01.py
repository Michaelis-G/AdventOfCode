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
        for d in f:
            if d[0] == 'R': data.append(int(d[1:]))
            if d[0] == 'L': data.append(int('-'+d[1:]))
    return data

@TrackTime
def Part1(moves):
    click = 0
    position = 50
    for move in moves:
        position += move
        if position % 100 == 0: click += 1
    print(f'Answer to part 1 is: {click}')

@TrackTime
def Part2(moves):
    click = 0
    position = 50
    for move in moves:
        for i in range(abs(move)):
            if move > 0: position += 1
            if move < 0: position -= 1
            if position % 100 == 0: click += 1
    print(f'Answer to part 2 is: {click}')

data = ParseInput('./data/01.input')
Part1(data)
Part2(data)

