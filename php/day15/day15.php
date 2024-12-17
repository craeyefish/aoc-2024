<?php

class AdventSolver {
    private $input;
    private $map = [];
    private $map2 = [];
    private $instructions = "";
    private $x = 0;
    private $y = 0;
    private $x2 = 0;
    private $y2 = 0;

    public function __construct($inputFile) {
        $this->input = file($inputFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($this->input as $line) {
            if ($line[0] == "#") {
                $this->map[] = $line;
                $position = strpos($line, '@');
                if ($position !== false) {
                    $this->x = $position;
                    $this->y = count($this->map) - 1;
                }

                $modLine = str_replace('#', '##', str_replace('O','[]',str_replace('@', '@.',str_replace('.','..',$line))));
                $this->map2[] = $modLine;
                $position = strpos($modLine, '@');
                if ($position !== false) {
                    $this->x2 = $position;
                    $this->y2 = count($this->map2) - 1;
                }
            } else if (strlen($line) != 0) {
                $this->instructions .= $line;
            }
        }
    }

    public function push($x, $y, $d):bool {
        switch ($d) {
            case ">":
                if ($this->map[$y][$x+1] == "." || 
                    ($this->map[$y][$x+1] == "O" && $this->push($x+1, $y, $d))) {

                    if ($this->map[$y][$x] == '@') {
                        $this->x++;
                    }

                    $this->map[$y][$x+1] = $this->map[$y][$x];
                    $this->map[$y][$x] = ".";
                    
                    return true;
                } 
                break;
            case "v":
                if ($this->map[$y+1][$x] == "." || 
                    ($this->map[$y+1][$x] == "O" && $this->push($x, $y+1, $d))) {

                    if ($this->map[$y][$x] == '@') {
                        $this->y++;
                    }

                    $this->map[$y+1][$x] = $this->map[$y][$x];
                    $this->map[$y][$x] = ".";
                    return true;
                } 
                break;
            case "<":
                if ($this->map[$y][$x-1] == "." || 
                    ($this->map[$y][$x-1] == "O" && $this->push($x-1, $y, $d))) {

                    if ($this->map[$y][$x] == '@') {
                        $this->x--;
                    }

                    $this->map[$y][$x-1] = $this->map[$y][$x];
                    $this->map[$y][$x] = ".";
                    return true;
                } 
                break;
            case "^":
                if ($this->map[$y-1][$x] == "." || 
                    ($this->map[$y-1][$x] == "O" && $this->push($x, $y-1, $d))) {

                    if ($this->map[$y][$x] == '@') {
                        $this->y--;
                    }

                    $this->map[$y-1][$x] = $this->map[$y][$x];
                    $this->map[$y][$x] = ".";
                    return true;
                } 
                break;
        }
        return false;
    } 

    public function push2($xy, $d):bool {
        switch ($d) {
            case ">":
                $x = $xy[0][0][0];
                $y = $xy[0][0][1];
                $collection = [[[$x+1, $y]]];
                if ($this->map2[$y][$x+1] == "." || 
                    (($this->map2[$y][$x+1] == "[" || $this->map2[$y][$x+1] == "]") && $this->push2($collection, $d))) {

                    if ($this->map2[$y][$x] == '@') {
                        $this->x2++;
                    }

                    $this->map2[$y][$x+1] = $this->map2[$y][$x];
                    $this->map2[$y][$x] = ".";
                    
                    return true;
                } 
                break;
            case "v":
                $nextGroup = [];
                foreach($xy[count($xy)-1] as $point) {
                    $x = $point[0];
                    $y = $point[1];
                    if ($this->map2[$y+1][$x] == ".") {
                        continue;
                    }
                    if ($this->map2[$y+1][$x] == "#") {
                        return false;
                    }
                    if ($this->map2[$y+1][$x] == "[") {
                        $nextGroup[] = [$x, $y+1];
                        $nextGroup[] = [$x+1, $y+1];
                    }
                    if ($this->map2[$y+1][$x] == "]") {
                        $nextGroup[] = [$x, $y+1];
                        $nextGroup[] = [$x-1, $y+1];
                    }
                }
                if (count($nextGroup) > 0) {
                    $unique_group = [];
                    foreach($nextGroup as $point) {
                        $isUnique = true;
                        foreach($unique_group as $uniquePoint) {
                            if ($point[0] == $uniquePoint[0] && 
                            $point[1] == $uniquePoint[1]) {

                                $isUnique = false;
                            }
                        }
                        if ($isUnique == true) {
                            $unique_group[] = $point;
                        }
                    }
                    $xy[]= $unique_group;
                    return $this->push2($xy, $d);
                }

                for ( $group = count($xy) - 1; $group >= 0; $group--) {
                    for ( $point = 0 ; $point < count($xy[$group]) ; $point++) {
                        $x = $xy[$group][$point][0];
                        $y = $xy[$group][$point][1];
                        if ($this->map2[$y][$x] == '@') {
                            $this->y2++;
                        }
                        $this->map2[$y+1][$x] = $this->map2[$y][$x];
                        $this->map2[$y][$x] = ".";
                    }
                }
                return true;
            case "<":
                $x = $xy[0][0][0];
                $y = $xy[0][0][1];
                $collection = [[[$x-1, $y]]];
                if ($this->map2[$y][$x-1] == "." || 
                    (($this->map2[$y][$x-1] == "[" || $this->map2[$y][$x-1] == "]") && $this->push2($collection, $d))) {

                    if ($this->map2[$y][$x] == '@') {
                        $this->x2--;
                    }

                    $this->map2[$y][$x-1] = $this->map2[$y][$x];
                    $this->map2[$y][$x] = ".";
                    return true;
                } 
                break;
            case "^":
                $nextGroup = [];
                foreach($xy[count($xy)-1] as $point) {
                    $x = $point[0];
                    $y = $point[1];
                    if ($this->map2[$y-1][$x] == ".") {
                        continue;
                    }
                    if ($this->map2[$y-1][$x] == "#") {
                        return false;
                    }
                    if ($this->map2[$y-1][$x] == "[") {
                        $nextGroup[] = [$x, $y-1];
                        $nextGroup[] = [$x+1, $y-1];
                    }
                    if ($this->map2[$y-1][$x] == "]") {
                        $nextGroup[] = [$x, $y-1];
                        $nextGroup[] = [$x-1, $y-1];
                    }
                }
                if (count($nextGroup) > 0) {
                    $unique_group = [];
                    foreach($nextGroup as $point) {
                        $isUnique = true;
                        foreach($unique_group as $uniquePoint) {
                            if ($point[0] == $uniquePoint[0] && 
                            $point[1] == $uniquePoint[1]) {

                                $isUnique = false;
                            }
                        }
                        if ($isUnique == true) {
                            $unique_group[] = $point;
                        }
                    }
                    $xy[]= $unique_group;
                    return $this->push2($xy, $d);
                }

                for ( $group = count($xy) - 1; $group >= 0; $group--) {
                    for ( $point = 0 ; $point < count($xy[$group]) ; $point++) {
                        $x = $xy[$group][$point][0];
                        $y = $xy[$group][$point][1];
                        if ($this->map2[$y][$x] == '@') {
                            $this->y2--;
                        }
                        $this->map2[$y-1][$x] = $this->map2[$y][$x];
                        $this->map2[$y][$x] = ".";
                    }
                }
                return true;
        }
        return false;
    } 

    public function q1() {
        $total = 0;

        for ($i = 0; $i < strlen($this->instructions); $i++) {
            $this->push($this->x, $this->y, $this->instructions[$i]);
        }

        for ( $i = 1; $i < count($this->map) - 1; $i++) {
            for ( $j = 1 ; $j < strlen($this->map[$i]) - 1 ; $j++) {
                if ($this->map[$i][$j] == "O") {
                    $total += $i * 100 + $j;
                }
            }
        }

        echo print_r($this->map), PHP_EOL;
        echo $total, PHP_EOL;
    }

    public function q2() {
        $total = 0;

        for ($i = 0; $i < strlen($this->instructions); $i++) {
            $initCollection = [[[$this->x2, $this->y2]]];
            $this->push2($initCollection, $this->instructions[$i]);
        }

        for ( $i = 1; $i < count($this->map2) - 1; $i++) {
            for ( $j = 1 ; $j < strlen($this->map2[$i]) - 1 ; $j++) {
                if ($this->map2[$i][$j] == "[") {
                    $total += $i * 100 + $j;
                }
            }
        }

        echo print_r($this->map2), PHP_EOL;
        echo $total, PHP_EOL;
    }
}

$solver = new AdventSolver('input.txt');
echo $solver->q1();
echo $solver->q2();
