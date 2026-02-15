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
            data = [(int(n.split('-')[0]), int(n.split('-')[1])) for n in d.split(',')]
    return data

@TrackTime
def Part1(data):
    count = 0
    for d in data:
        for n in range(d[0], d[1]+1):
            l = len(str(n))
            if l % 2 != 0: continue
            if str(n)[:(l//2)] == str(n)[-l//2:]: count += n
    print(f'Answer to Part 1 is: {count}')

@TrackTime
def Part2(data):
    count = 0
    matches = set()
    for d in data: # for each dataset
        for n in range(d[0], d[1]+1): # for each number in the dataset
            l = len(str(n)) # need to know the number's length
            for k in range(1, (l // 2) + 1): # for each subnumber's length
                if l % k != 0: continue # if l is not k*something it can't work
                first = str(n)[:k] # this is the first part and our ref
                isMatch = True # we assume it is correct until proven otherwise
                for x in range(k, l, k): # for each part after the first one
                    nxt = str(n)[x:x+k] # we get the next part
                    if nxt != first: # if the next part differs from the first one
                        isMatch = False # then it is a no go
                        break # move on to the next subnumber's length
                if isMatch: # yeah we found a match!
                    if n not in matches: # wait it could be one we already found, if not:
                        count += n # add up n to the grand total
                        matches.add(n) # remember we already found this number
    print(f'Answer to Part 2 is: {count}')

data = ParseInput('./data/02.input')
Part1(data)
Part2(data)