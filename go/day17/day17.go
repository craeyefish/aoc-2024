package main

import (
	"bufio"
	"fmt"
	"image/color"
	"log"
	"math"
	"os"
	"strconv"
	"strings"

	"gonum.org/v1/plot"
	"gonum.org/v1/plot/plotter"
	"gonum.org/v1/plot/vg"
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

    var a,b,c int
    var input []int
    
    fmt.Sscanf(lines[0], "Register A: %d", &a)
    fmt.Sscanf(lines[1], "Register B: %d", &b)
    fmt.Sscanf(lines[2], "Register C: %d", &c)
    
    for _, valStr := range strings.Split(strings.Split(lines[4], ": ")[1], ",") {
        val, _ := strconv.Atoi(valStr)
        input = append(input, val)
    }

    q1(a,b,c,input)
    q2(input)
}


func solve(a,b,c int, input, expected []int) (int, string) {
    var output string
    var actual []int

    for i := 0 ; i < len(input) ; i += 2 {
        literal := input[i+1]
        combo := input[i+1]
        switch combo{
        case 4:
            combo = a
        case 5:
            combo = b
        case 6:
            combo = c
        }

        switch input[i] {
        case 0:
            a = int(float64(a) / (math.Pow(2, float64(combo))))
        case 1:
            b = b ^ literal
        case 2:
            b = combo % 8
        case 3:
            if a != 0 {
                i = literal - 2
            }
        case 4:
            b = b ^ c
        case 5:
            if len(expected) > 0 {
                actual = append(actual, combo % 8)

                if expected[len(actual) - 1] != combo % 8 {
                    return len(actual) - 1, output
                }

                output += strconv.Itoa(combo % 8) + ","
                if len(actual) == len(expected) {
                    return len(actual), output
                }
            } else {
                output += strconv.Itoa(combo % 8) + ","
            }
        case 6:
            b = int(float64(a) / (math.Pow(2, float64(combo))))
        case 7:
            c = int(float64(a) / (math.Pow(2, float64(combo))))
        }
    }

    return 0, output
}

func q1(a,b,c int, input []int) {
    _, ans := solve(a,b,c,input,nil)
    fmt.Println("q1 answer: " + ans)
}

func q2(input []int) {
    // count := 160000000000000
    var pts plotter.XYs

    // for i := 3287450 + 4194304 * 10000000 ; i < count ; i+=4194304 {
    for i := 105981156665754 ; i > 105981154665754 ; i-- {
        amount, ans := solve(i,0,0,input,input)
        if amount > 10 {
            pts = append(pts, plotter.XY{X: float64(i), Y: float64(amount)})
        }

        if amount > 14 {
            fmt.Println()
            fmt.Println(i)
            fmt.Println(amount)
            fmt.Println(ans)
        }
        if amount == len(input) {
            fmt.Println("found!")
            fmt.Println(ans)
            // return
        }
    }

    // Create a new plot
    p := plot.New()
    p.Title.Text = "My Scatter Plot"
    p.X.Label.Text = "X"
    p.Y.Label.Text = "Y"
    
    // Create a scatter plotter with the data
    s, err := plotter.NewScatter(pts)
    if err != nil {
        log.Fatalf("could not create scatter: %v", err)
    }

    // Customize the scatter appearance
    s.GlyphStyle.Color = color.RGBA{R: 255, A: 255} // Red points
    s.GlyphStyle.Radius = vg.Points(3)

    // Add the scatter to the plot
    p.Add(s)

    // Save the plot as a PNG
    if err := p.Save(8*vg.Inch, 6*vg.Inch, "scatter_plot.png"); err != nil {
        log.Fatalf("could not save plot: %v", err)
    }
}
