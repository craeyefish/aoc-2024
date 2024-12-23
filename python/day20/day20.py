def main():
    with open('input.txt', 'r') as file:
        lines = file.readlines()
    lines = [line.strip() for line in lines]

    racetrack = []
    start = [0,0]
    end = [0,0]

    for y in range(0, len(lines)):
        for x in range(0, len(lines[0])):
            if lines[y][x] == 'S':
                start = [x,y]
                racetrack.append(start)
            if lines[y][x] == 'E':
                end = [x,y]

    grid = []
    for y in range(len(lines)):
        row = []
        for x in range(len(lines[y])):
            row.append(lines[y][x])
        grid.append(row)

    while racetrack[-1] != end:
        for i in [-1, 0, 1]:
            for j in [-1, 0,  1]:
                if abs(i) == abs(j):
                    continue

                y = racetrack[-1][1]+i
                x = racetrack[-1][0]+j
                if grid[y][x] == '.' or grid[y][x] == 'E':
                    racetrack.append([x,y])
                    if grid[y][x] == '.':
                        grid[y][x] = 'O'

    q1(grid, racetrack)
    q2(grid, racetrack)
    return


def q1(grid, track):
    total = 0

    for spot in track:
        x = spot[0]
        y = spot[1]

        # left
        if x -2 > 0 and (grid[y][x-2] == 'O' or grid[y][x-2] == 'E')  and grid[y][x-1] == '#':
            score = track.index([x-2, y]) - track.index([x, y]) - 2
            if score >= 100:
                total+=1

        # up
        if y -2 > 0 and (grid[y-2][x] == 'O' or grid[y-2][x] == 'E')  and grid[y-1][x] == '#':
            score = track.index([x, y-2]) - track.index([x, y]) - 2
            if score >= 100:
                total+=1

        # right
        if x + 2 < len(grid[x]) - 1 and (grid[y][x+2] == 'O' or grid[y][x+2] == 'E')  and grid[y][x+1] == '#':
            score = track.index([x + 2, y]) - track.index([x, y]) - 2
            if score >= 100:
                total+=1

        # down
        if y + 2 < len(grid) - 1 and (grid[y+2][x] == 'O' or grid[y+2][x] == 'E')  and grid[y+1][x] == '#':
            score = track.index([x, y+2]) - track.index([x, y]) - 2
            if score >= 100:
                total+=1

    
    print(total)
    return

def q2(grid, track):
    total = 0

    for spot in track: 
        x = spot[0]
        y = spot[1]

        for dy in range(-20, 21):
            for dx in range(-20,21):
                if abs(dy) + abs(dx) > 20:
                    continue 

                if x + dx > 0 and x + dx < len(grid[0]) and y + dy > 0 and y + dy < len(grid) and (grid[y+dy][x+dx] == 'O' or grid[y+dy][x+dx] == 'E'):
                    score = track.index([x + dx, y + dy]) - track.index([x, y]) - abs(dx) - abs(dy)
                    if score >= 100:
                        total += 1

    print(total)
    return

if __name__ == "__main__":
    main()