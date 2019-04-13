import numpy
import random


class Node(object):

    def __init__(self, data=None, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right
    



direction_choices = [[0, 1], [0, -1], [1, 0], [-1, 0]]


def gen_new_id():
    for i in range(10000):
        yield i


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
    
    if not vertical_symmetry_check(passable_map):
        print("passable map not symmetric")

    return passable_map

def build_orb_map(passable_map, map_size):
    half_map = numpy.random.randint(0, 8, (map_size, map_size // 2)).tolist()
    orb_map = []

    for i in range(map_size):
        for j in range(map_size // 2):
            if passable_map[i][j] == 0:
                half_map[i][j] = 0

    for row in half_map:
        temp_row = row[::-1]
        orb_map.append(row + temp_row)

    if not vertical_symmetry_check(orb_map):
        print("orb map not symmetric")

    return orb_map

# TODO: test if planet is blocked
# def test_planet_placement(passable_map, map_size, x, y):
#     passable_map[y][x]

def place_planets(passable_map, map_size, id_to_loc):
    y = random.randint(0, map_size - 1) # the same
    x = random.randint(0, (map_size // 2) - 1) # mirror

    robot_map = numpy.random.randint(0, 1, (map_size, map_size)).tolist()

    team1_planet = gen_new_id(0)
    robot_map[y][x] = team1_planet
    id_to_loc[team1_planet] = [y, x, 0]
    passable_map[y][x] = 0

    team2_planet = gen_new_id(1)
    robot_map[y][-1*x - 1] = team2_planet
    id_to_loc[team2_planet] = [y, -1*x - 1, 1]
    passable_map[y][-1*x - 1] = 0

    return robot_map

def in_bounds(start_x, start_y, dx, dy, map_size):
    return start_x + dx >= 0 and start_x + dx < map_size and start_y + dy >= 0 and start_y + dy < map_size

def bfs_nn(start_y, start_x, dy, dx, robot_map, dist, possible_assignments):
    possible_assignments = []
    found = False
    y, x = start_y, start_x
    
    for i in direction_choices:
        if i[0] == dy and i[1] == dx:
            continue
        
        y, x = start_y + i[0], start_x + i[1]
        if(robot_map[y][x] > 0)
            possible_assignments.append([y, x, robot_map[y][x]])
            found = True  # Found at this level, no need to recur on later levels
    

    if not found:  # didn't find a match at this level
        for i in direction_choices:
            if i[0] == dy and i[1] == dx:
                continue
            
            y, x = start_y + i[0], start_x + i[1]

            possible_assignments += bfs_nn(x, y, i[0], i[1], robot_map, dist + 1, possible_assignments)
    
    return possible_assignments


def distance(point_a, point_b):
    x = point_a[0] - point_b[0]
    y = point_a[1] - point_b[1]

    return abs(x) + abs(y)

def calc_scores(robot_map, orb_map, id_to_loc, map_size):

    orbs = []
    robots = []
    for i in range(map_size):
        for j in range(map_size):
            orbs.append([[i, j], orb_map[i][j]])
            robots.append([[i, j], robot_map[i][j]])
    
    for orb in orbs:
        orb.assignment = None

        for robot in robots:
            tempdist = distance(orb[0], robot[0])
            
            if(orb.assignment == None or tempdist < distance(orb[0], orb.assignment[0])):
                orb.assignment = robot
    
    

if __name__ == "__main__":
    map_size = 10
    map = build_passable_map(map_size)
    orbs = build_orb_map(map, map_size)
    robot_map = place_planets(map, map_size)
    
    
    print(orbs)
    print(robot_map)

