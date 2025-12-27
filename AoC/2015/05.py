from time import time
from collections import Counter

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    data = []
    with open(filename, 'r') as f:
        for line in f:
            data.append(line.strip())
    return data

def CheckVoyels(word):
    voyels = ['a', 'e', 'i', 'o', 'u']
    nb = 0
    for c in word:
        if c in voyels: nb += 1
    return nb

def CheckDoubleLetter(word):
    dl = False
    for i, c in enumerate(word[:-1]):
        if word[i+1] == c:
            dl = True
    return dl

def CheckForbiddenWords(word):
    forbiddenWords = ['ab', 'cd', 'pq', 'xy']
    fw = True
    for f in forbiddenWords:
        if f in word: fw = False
    return fw

def CheckTwoLettersTwice(word):
    tlt = False
    if len(word) < 4: return tlt
    for i, c in enumerate(word[:-3]):
        tl = c+word[i+1]
        for j, d in enumerate(word[i+2:-1]):
            ch = d+word[i+j+3]
            if tl == ch:
                tlt = True
                break
        if tlt: break
    return tlt

def CheckLetterRepeat(word):
    lr = False
    for i, c in enumerate(word[:-2]):
        if c == word[i+2]:
            print(f'Found repeat letter: {c} in {word} at {i}')
            lr = True
            break
    return lr

@TrackTime
def Part1(data):
    count = 0
    for word in data:
        if CheckVoyels(word) < 3:
            # print('not enough voyels')
            continue

        if not CheckDoubleLetter(word): 
            # print('no double letter')
            continue
        
        if not CheckForbiddenWords(word):
            # print('forbidden words')
            continue

        # print(f'this words is cute {word}')
        count += 1
    print(f'Answer to part 1 is {count}')

@TrackTime
def Part2(data):
    count = 0
    for word in data:
        if not CheckTwoLettersTwice(word):
            # print(f'No double letter twice in "{word}"')
            continue
        
        if not CheckLetterRepeat(word):
            # print(f'No repeated letter in "{word}"')
            continue
        
        count += 1
    print(f'Answer to part 2 is {count}')


data = ParseInput('./data/05.input')
Part1(data)
Part2(data)