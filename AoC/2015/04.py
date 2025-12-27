from time import time
import hashlib

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput():
    data = 'ckczppom'
    return data

@TrackTime
def Part1(data):
    i = 0
    while True:
        test = data + str(i)
        res = hashlib.md5(test.encode())
        start = res.hexdigest()[:5]
        if start == '00000':
            count = i
            break
        i += 1
    print(f'{data} + {count}')
    print(f'Answer to part 1 is {count}')

@TrackTime
def Part2(data):
    i = 0
    while True:
        test = data + str(i)
        res = hashlib.md5(test.encode())
        start = res.hexdigest()[:6]
        if start == '000000':
            count = i
            break
        i += 1
    print(f'{data} + {count}')
    print(f'Answer to part 2 is {count}')


data = ParseInput()
Part1(data)
Part2(data)