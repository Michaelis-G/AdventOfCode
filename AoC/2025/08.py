import math

filename = "./data/08.input.test"

def ParseFile(filename):
    f = open(filename, 'r')
    data = f.read()
    f.close()
    return [
        [
            int(l.split(',')[0]),
            int(l.split(',')[1]),
            int(l.split(',')[2])
        ] for l in data.split("\n")
    ]

def distance(a, b):
    dist = math.sqrt(
        math.pow(b[0]-a[0], 2)
        + math.pow(b[1]-a[1], 2)
        + math.pow(b[2]-a[2], 2)
    )
    return dist

def Part1():
    data = ParseFile(filename)

    trajets = dict()
    for s in range(len(data)-1, -1, -1):
        for d in range(0, s):
            l = distance(data[s], data[d])
            trajets[(d, s)] = l
    # sort trajets by length
    trajets = {k: v for k, v in sorted(trajets.items(), key=lambda item: item[1])}
    nets = list()
    i = 0
    for trajet in trajets:
        if not nets:
            i += 1
            # print('new net', i, 'add', trajet[0], trajet[1])
            nets.append([trajet[0], trajet[1]])
        else:
            isset = False
            for net in nets:
                # if isset: break
                if trajet[0] in net and trajet[1] in net:
                    print('nothing happens', trajet[1], '&', trajet[0])
                    i += 1
                    isset = True
                    continue
                elif trajet[0] in net and trajet[1] not in net:
                    print('new junction', i, 'connecting', trajet[1], 'to', trajet[0], 'in', net)
                    i += 1
                    net.append(trajet[1])
                    print('=>', net)
                    isset = True
                elif trajet[1] in net and trajet[0] not in net:
                    print('new junction', i, 'connecting', trajet[0], 'to', trajet[1], 'in', net)
                    i += 1
                    net.append(trajet[0])
                    print('=>', net)
                    isset = True
            if not isset:
                print('new net', i, 'add', trajet[0], trajet[1])
                i += 1
                nets.append([trajet[0], trajet[1]])
        if i > 9: break

    lengths = []
    for net in nets:
        lengths.append(len(net))
    lengths.sort(reverse=True)
    print(lengths[:3])
    res = 1
    for l in lengths[:3]:
        res *= l
    print('Part1:', lengths[:3], res)

Part1()