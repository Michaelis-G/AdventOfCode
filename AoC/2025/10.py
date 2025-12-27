"""
On va stocker les elements sous forme de string plutot que des tableaux d'entier, pour limiter l'emprunte mémoire.
De plus les string sont hashable et pas les tableaux, donc on peut les stocker dans un set qui ne contiendra pas de doublons.
MGr.
"""
from time import time

def TrackTime(func):
    def wrapper(*a, **k):
        start = time()
        func(*a, **k)
        print("  >> in %f ms" % ((time() - start)*1000))
    return wrapper

def ToString(tab, sep = ''):
    txt = ''
    for c in tab:
        txt += (str(c) + sep)
    return txt

def ParseInput(filename):
    data = []
    with open(filename, 'r') as f:
        for d in f:
            records = d.strip().split()
            goal = []
            for c in records[0]:
                if c == '.': goal.append(0)
                elif c == '#': goal.append(1)
                else: continue
            combinaisons = []
            for record in records[1:-1]:
                combinaison = ['0' for x in goal]
                for c in record.strip('()').split(','):
                    combinaison[int(c)] = '1'
                combinaisons.append(ToString(combinaison))
            goal2 = []
            for c in records[-1].strip('{}').split(','):
                goal2.append(int(c))                
            data.append((ToString(goal), combinaisons, ToString(goal2, '-')))
    return data

def Apply(current, combinaison):
    new = [x for x in current]
    for i, c in enumerate(combinaison):
        if c == '0': continue
        if current[i] == '0': new[i] = '1'
        else: new[i] = '0'
    return ToString(new)

def NextRank(currents, combinaisons):
    new = set()
    for current in currents:
        n = []
        for combinaison in combinaisons:
            n = Apply(current, combinaison)
            new.add(n)
    return new

def IsSolution(goal, currents):
    return (goal in currents)

@TrackTime
def Part1(data, maxDepth):
    total = 0
    for d in data:
        goal = d[0]
        combinaisons = d[1]
        depth = 0
        currents = [ToString(['0' for x in goal])]
        while depth < maxDepth:
            if IsSolution(goal, currents):
                total += depth
                break
            currents = NextRank(currents, combinaisons)
            depth += 1
            if (depth >= maxDepth):
                print(f'Max depth reached... so long for the fish') 
                return
    print(f'Answer to part 1 is {total}')

@TrackTime
def Part2(data, maxDepth):
    total = 0

    for d in data:
        goal = d[-1]
        combinaisons = d[:-1]
        print(goal, combinaisons)
    print(f'Answer to part 2 is {total}')

data = ParseInput('./data/10.input.test')
Part1(data, 10)
Part2(data, 2)