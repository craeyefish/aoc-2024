def main():
    with open('input.txt', 'r') as file:
        lines = file.readlines()
    lines = [line.strip() for line in lines]

    allFarms = []
    islands = []

    for y in range(0, len(lines)):
        for x in range(0, len(lines[0])):
            curFarm = []
            scout(curFarm, allFarms, lines[y][x], x, y, lines)
            if len(curFarm) > 0:
                islands.append(curFarm)

    q1(lines, islands)
    q2(lines, islands)
    return

def pT(x,y,lines):
    return (y == 0 or lines[y-1][x] != lines[y][x])

def pB(x,y,lines):
    return (y == len(lines)-1 or lines[y+1][x] != lines[y][x])

def pL(x,y,lines):
    return (x == 0 or lines[y][x-1] != lines[y][x])

def pR(x,y,lines):
    return (x == len(lines[0]) - 1 or lines[y][x+1] != lines[y][x])

def p(x,y,lines):
    return pT(x,y,lines) + pB(x,y,lines) + pL(x,y,lines) + pR(x,y,lines)

def scout(curFarm, allFarms, name, x, y, lines):
    if [x,y] in curFarm:
        return
    
    if [x,y] in allFarms:
        return
    
    if name != lines[y][x]:
        return
    
    curFarm.append([x,y])
    allFarms.append([x,y])

    # top
    if y > 0 and lines[y-1][x] == lines[y][x]:
        scout(curFarm, allFarms, name, x, y-1, lines)

    # bot
    if y < len(lines)-1 and lines[y+1][x] == lines[y][x]:
        scout(curFarm, allFarms, name, x, y+1, lines)

    # left
    if x > 0 and lines[y][x-1] == lines[y][x]:
        scout(curFarm, allFarms, name, x-1, y, lines)

    # right
    if x < len(lines[0]) - 1 and lines[y][x+1] == lines[y][x]:
        scout(curFarm, allFarms, name, x+1, y, lines)
    
def isAttached(x,y,x2,y2):
    return  (y-1 == y2 and x == x2) or (y+1 == y2 and x == x2) or (y == y2 and x-1 == x2) or (y == y2 and x+1 == x2)

def q1(lines, islands):
    total = 0
    
    for island in islands:
        area = 0
        perimeter = 0
        for land in island:
            area+=1
            perimeter+=p(land[0], land[1], lines)

        total += area*perimeter
    
    print(total)
    return

def q2(lines, islands):
    total = 0

    for island in islands:
        area = 0
        perimeter = 0

        for y in range(0, len(lines)):
            curHorizontalEdgeT = 0
            curHorizontalEdgeB = 0
            for x in range(0, len(lines[0])):
                if [x,y] in island:
                    area += 1
                    if pB(x,y,lines):
                        curHorizontalEdgeB+=1
                    else:
                        if curHorizontalEdgeB > 0:
                            perimeter+=1
                        curHorizontalEdgeB = 0

                    if pT(x,y,lines):
                        curHorizontalEdgeT+=1
                    else:
                        if curHorizontalEdgeT > 0:
                            perimeter+=1
                        curHorizontalEdgeT = 0
                        
                else:
                    if curHorizontalEdgeB > 0:
                        perimeter += 1
                        curHorizontalEdgeB = 0
                    if curHorizontalEdgeT > 0:
                        perimeter += 1
                        curHorizontalEdgeT = 0

            if curHorizontalEdgeB > 0:
                perimeter += 1
            if curHorizontalEdgeT > 0:
                perimeter += 1
        
        for x in range(0, len(lines[0])):
            curVerticalEdgeL = 0
            curVerticalEdgeR = 0
            for y in range(0, len(lines)):
                if [x,y] in island:
                    if pR(x,y,lines):
                        curVerticalEdgeR+=1
                    else:
                        if curVerticalEdgeR > 0:
                            perimeter+=1
                        curVerticalEdgeR = 0

                    if pL(x,y,lines):
                        curVerticalEdgeL+=1
                    else:
                        if curVerticalEdgeL > 0:
                            perimeter+=1
                        curVerticalEdgeL = 0
                        
                else:
                    if curVerticalEdgeR > 0:
                        perimeter += 1
                        curVerticalEdgeR = 0
                    if curVerticalEdgeL > 0:
                        perimeter += 1
                        curVerticalEdgeL = 0
            
            if curVerticalEdgeL > 0:
                perimeter += 1
            if curVerticalEdgeR > 0:
                perimeter += 1

        total += area * perimeter        


    print(total)
    return

if __name__ == "__main__":
    main()