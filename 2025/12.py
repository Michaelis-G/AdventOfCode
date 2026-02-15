"""
Notes:

MGr
"""

from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ParseInput(filename):
    with open(filename, 'r') as f:
        data = {}
        for d in f:
            d = d.strip().split(':')
            data[d[0]] = d[1].split()
    return data