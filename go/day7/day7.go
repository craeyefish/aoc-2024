package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"strconv"
	"strings"
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

func q1(lines []string) {
    var sumTotal int

    for _, line := range lines {
        total, _ := strconv.Atoi(strings.Split(line, ":")[0])

        var nums []int

        for _, val := range strings.Split(strings.Trim(strings.Split(line, ":")[1]," "), " ") {
            v, _ := strconv.Atoi(val)
            nums = append(nums, v)
        }

        possibilities := int(math.Pow(2, float64(len(nums) - 1)))

        for i := range int(possibilities) {
            guess := nums[0]
            for j := range len(nums) - 1 {
                mask := 0x01<<j
                if i & mask == 0 {
                    guess = guess + nums[j+1]
                } else {
                    guess = guess * nums[j+1]
                }
            }
            
            if guess == total {
                sumTotal += total
                break;
            }
        }
    }

    fmt.Println(sumTotal)
}

func q2(lines []string) {
    var sumTotal int

    for _, line := range lines {
        total, _ := strconv.Atoi(strings.Split(line, ":")[0])

        var nums []int

        for _, val := range strings.Split(strings.Trim(strings.Split(line, ":")[1]," "), " ") {
            v, _ := strconv.Atoi(val)
            nums = append(nums, v)
        }

        if solve(total, nums) {
            sumTotal += total
        }
    }

    fmt.Println(sumTotal)
}

func solve(total int, nums []int) bool {
    if len(nums) == 2 {
        return nums[0] * nums[1] == total ||
        nums[0] + nums[1] == total ||
        strconv.Itoa(nums[0]) + strconv.Itoa(nums[1]) == strconv.Itoa(total)
    } 

    tNums := make([]int, len(nums) - 1)
    copy(tNums, nums[1:])
    tNums[0] = nums[0] * nums[1]
    if solve(total, tNums) {
        return true
    }

    sumNums := make([]int, len(nums) - 1)
    copy(sumNums, nums[1:])
    sumNums[0] = nums[0] + nums[1]
    if solve(total, sumNums) {
        return true
    }

    catNums := make([]int, len(nums) - 1)
    copy(catNums, nums[1:])
    concatNum, _ := strconv.Atoi(strconv.Itoa(nums[0]) + strconv.Itoa(nums[1]))
    catNums[0] = concatNum
    if solve(total, catNums) {
        return true
    }

    return false
}