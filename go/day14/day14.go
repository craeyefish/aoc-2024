package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
    var lines []string

    file, err := os.Open("input.txt")
    if err != nil {
        log.Fatal(err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

    q1(lines)
    q2(lines)
}

const sx = 101;
const sy = 103;

func q1(lines []string) {
    var sumTotal int
    m := [sx][sy]int{}

    for _, line := range lines {
        var x,y,vx,vy int
        fmt.Sscanf(line, "p=%d,%d v=%d,%d", &x, &y, &vx, &vy)

        for i := 0 ; i < 100 ; i++ {
            x = (x+vx)%sx
            if x < 0 {
                x += sx
            }
            y = (y+vy)%sy
            if y < 0 {
                y += sy
            }
        }

        m[x][y] += 1
    }

    var q1,q2,q3,q4 int

    for y := range sy{
        for x := range sx {
            if x < sx/2 && y < sy/2 {
                q1 += m[x][y]
            } else if x > sx/2 && y < sy/2 {
                q2 += m[x][y]
            } else if x < sx/2 && y > sy/2 {
                q3 += m[x][y]
            } else if x > sx/2 && y > sy/2 {
                q4 += m[x][y]
            }
        }
    }

    sumTotal = q1 * q2 * q3 * q4
    fmt.Println(sumTotal)
}

func q2(lines []string) {
    var x, y, vx, vy []int

    for _, line := range lines {
        var tx,ty,tvx,tvy int
        fmt.Sscanf(line, "p=%d,%d v=%d,%d", &tx, &ty, &tvx, &tvy)
        x = append(x, tx)
        y = append(y, ty)
        vx = append(vx, tvx)
        vy = append(vy, tvy)
    }

    for i := 0 ; i < 100000 ; i++ {
        m := [sx][sy]int{}

        for r := range len(x) {
            x[r] = (x[r]+vx[r])%sx
            if x[r] < 0 {
                x[r] += sx
            }
            y[r] = (y[r]+vy[r])%sy
            if y[r] < 0 {
                y[r] += sy
            }
            m[x[r]][y[r]] += 1
        }
        
        sc := 0
        for y := range sy{
            for x := range sx {
                if m[x][y] == 0 {
                    continue
                }

                // Assuming picutres will have grouped robots, find the sum of
                // each robot's neighbours and check when there is a spike to find
                // the easter egg.
                if x > 0 && x < sx - 1 && y > 0 && y < sy - 1 {
                    sc += m[x-1][y]
                    sc += m[x-1][y-1]
                    sc += m[x][y-1]
                    sc += m[x+1][y-1]
                    sc += m[x+1][y]
                    sc += m[x+1][y+1]
                    sc += m[x][y+1]
                    sc += m[x-1][y+1]
                }
            }
        }

        if sc > 1000 {
            for y := range sy{
                var line string
                for x := range sx {
                    if m[x][y] == 1 {
                        line += " *"
                    } else {
                        line += " ."
                    }
                    
                }
                fmt.Println(line)
            }
            fmt.Printf("time: %d", i+1)
            return
        }
    }
}
