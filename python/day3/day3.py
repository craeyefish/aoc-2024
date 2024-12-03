def main():
    with open('input.txt', 'r') as file:
        lines = file.readlines()
    lines = [line.strip() for line in lines]

    q1(''.join(lines))
    q2(''.join(lines))
    return

def q1(line):
    total = 0

    for p in line.split("mul("):
        try: 
            nums = p[:p.find(")")].split(",")
            if len(nums) != 2 or p.find(")") == -1:
                continue
            total += int(nums[0]) * int(nums[1])
        except:
            e = 0
    
    print(total)
    return

def q2(line):
    enabled = True
    eLine = ''

    while len(line):
        if enabled:
            tLine = line.split("don't()")[0]
            line = line[len(tLine):]
            eLine += tLine
        else:
            tLine = line.split("do()")[0]
            line = line[len(tLine):]

        enabled = not(enabled)

    q1(eLine)
    return

if __name__ == "__main__":
    main()