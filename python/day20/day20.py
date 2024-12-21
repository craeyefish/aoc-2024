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
     
    for line in lines:
        print(" ".join(line)+'\n')



    q1(grid, racetrack)
    q2()
    return

def calcScore(grid, cheat, start):
    tempGrid = [row[:] for row in grid]
    tempGrid[cheat[1]][cheat[0]] = 'O'

    newSpots = [start]
    count = 0

    while 1:
        count+=1
        tSpots = []
        for spot in newSpots:
            x = spot[0]
            y = spot[1]
            tempGrid[y][x] = '+'

            for i in [-1, 0, 1]:
                for j in [-1, 0,  1]:
                    if abs(i) == abs(j):
                        continue
                    if tempGrid[y+j][x+i] == 'O':
                        tSpots.append([x+i,y+j])
                    if tempGrid[y+j][x+i] == 'E':
                        return count
        newSpots = tSpots




def q1(grid, track):
    total = 0
    calculatedSpots = []
    ogScore = calcScore(grid, [0, 0], track[0])

    count = 0
    for spot in track:
        count += 1
        x = spot[0]
        y = spot[1]

        # left
        if x -2 > 0 and (grid[y][x-2] == 'O' or grid[y][x-2] == 'E')  and grid[y][x-1] == '#' and calculatedSpots.count([x-1, y]) == 0:
            if ogScore - calcScore(grid, [x-1, y], track[0]) >= 100:
                total+=1
            calculatedSpots.append([x-1, y])

        # up
        if y -2 > 0 and (grid[y-2][x] == 'O' or grid[y-2][x] == 'E')  and grid[y-1][x] == '#' and calculatedSpots.count([x, y-1]) == 0:
            if ogScore - calcScore(grid, [x, y-1], track[0]) >= 100:
                total+=1
            calculatedSpots.append([x, y-1])

        # right
        if x + 2 < len(grid[x]) - 1 and (grid[y][x+2] == 'O' or grid[y][x+2] == 'E')  and grid[y][x+1] == '#' and calculatedSpots.count([x+1, y]) == 0:
            if ogScore - calcScore(grid, [x+1, y], track[0]) >= 100:
                total+=1
            calculatedSpots.append([x+1, y])

        # down
        if y + 2 < len(grid) - 1 and (grid[y+2][x] == 'O' or grid[y+2][x] == 'E')  and grid[y+1][x] == '#' and calculatedSpots.count([x, y+1]) == 0:
            if ogScore - calcScore(grid, [x, y+1], track[0]) >= 100:
                total+=1
            calculatedSpots.append([x, y+1])

    
    print(total)
    return

def q2():
    total = 0


    print(total)
    return

if __name__ == "__main__":
    main()