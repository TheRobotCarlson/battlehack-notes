import numpy


def vertical_symmetry_check(map):
    symmetric = True
    for i in range(len(map)):
        if(map[i][0] != map[i][-1]):
            print(map[0][i], map[-1][i])
            symmetric = False
    
    return True


def build_passable_map(map_size):
    half_map = numpy.random.randint(0, 2, (map_size, map_size // 2)).tolist()
    passable_map = []
    for row in half_map:
        temp_row = row[::-1]
        passable_map.append(row + temp_row)
    
    if vertical_symmetry_check(passable_map):
        print("passable map not symmetric")

    return passable_map

def build_orb_map(map_size, passable_map):
    half_map = numpy.random.randint(0, 8, (map_size, map_size // 2)).tolist()
    orb_map = []

    for i in range(map_size):
        for j in range(map_size // 2):
            if passable_map[i][j] == 0:
                half_map[i][j] = 0

    for row in half_map:
        temp_row = row[::-1]
        orb_map.append(row + temp_row)

    if vertical_symmetry_check(orb_map):
        print("orb map not symmetric")

    return orb_map

if __name__ == "__main__":
    map_size = 40
    map = build_passable_map(map_size)
    orbs = build_orb_map(map_size, map)
    # robot_map = 
    print(orbs)

