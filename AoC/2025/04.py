filename = "./data/04.input"

def ParseFile(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    return [list(x) for x in data.split('\n')]
    
shelf = ParseFile(filename)
rows = len(shelf)
cols = len(shelf[0])
res = 0
for y in range(rows):
    for x in range(cols):
        #print('item', x, y)
        if shelf[y][x] == '.':
            continue
        adj = 0
        for b in range(y-1, y+2):
            for a in range(x-1, x+2):
                if a == x and b == y: continue
                if b < 0 or a < 0 or b > rows-1 or a > cols-1: continue
                if shelf[b][a] == '@':
                    #print(a, b)
                    adj += 1
        if adj < 4:
            res += 1
print(res)
            
