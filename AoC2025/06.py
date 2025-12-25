filename = "./data/06.input"

def ParseFile(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    data = [y for y in data.split('\n')]
    return data

def sum(nums):
    res = 0
    for n in nums:
        res += n
    return res

def mul(nums):
    res = 1
    for n in nums:
        res *= n
    return res

def Part1(data):
    nums, ops = [], []
    for line in data[:-1]:
        nums.append(line.split())
    for line in data[-1:]:
        ops = line.split()

    res = 0
    for x in range(len(nums[0])):
        items = []
        for line in nums:
            items.append(int(line[x]))

        if (ops[x] == '+'):
            res += sum(items)

        if (ops[x] == '*'):
            res += mul(items)

    print(f'Part1: {res}')

def transpose(matrix):
    transposed = [[0 for _ in range(len(matrix))] for _ in range(len(matrix[0]))]
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            transposed[j][i] = matrix[i][j]
    return transposed

def Part2(data):
    operators = data[len(data) - 1]
    cols = []
    ops = []
    ranges = []
    for i, o in enumerate(operators):
        if (o != ' '):
            cols.append(i)
            ops.append(o)
    for i, c in enumerate(cols):
        start = cols[i]
        if i == len(cols) - 1:
            ranges.append([start, len(operators)])
            break
        end   = cols[i+1] - 1
        ranges.append([start, end])
    tot = 0
    for z, r in enumerate(ranges):
        s, e = r[0], r[1]
        mat = []
        print(ops[z])
        for y, d in enumerate(data[:-1]):
            print(d)
            mat.append([])
            cols = d[e-1:s-1:-1]
            if s == 0: cols = d[e-1::-1]
            for i in cols:
                mat[y].append(i)
        print(mat)
        mat = transpose(mat)
        print(mat)
        res = 0
        for i in range(0, len(mat)):
            num = ''
            for n in mat[i]:
                num += str(n)
            if ops[z] == '+':
                res += int(num)
            else:
                if res == 0: res = 1
                res *= int(num)
        print('res', res)
        tot += res
    print('tot', tot)

if __name__ == '__main__':
    data = ParseFile(filename)
    Part1(data)
    Part2(data)
