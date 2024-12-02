<?php

class AdventSolver {
    private $input;

    public function __construct($inputFile) {
        $this->input = file($inputFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    // checkValid returns the position of the value that is invalid, or negative 1 if valid.
    private function checkValid($vals): int {
        $isIncreasing = ($vals[1] - $vals[0]) > 0; 

        for( $i=1 ; $i<count($vals); $i++ ) {
            if (abs($vals[$i] - $vals[$i-1]) > 3) {
                return $i;
            }

            if ((($vals[$i] - $vals[$i-1]) > 0) != $isIncreasing) {
                return $i;
            }

            if (($vals[$i] - $vals[$i-1]) == 0) {
                return $i;
            }
        }

        return -1;
    }

    public function solvePartOne() {
        $total = 0;

        foreach ($this->input as $report) {
            $vals = array_map('intval',explode(" ", $report));

            if ($this->checkValid($vals) == -1) {
                $total += 1;
            }
        }

        echo $total, PHP_EOL;
    }

    public function solvePartTwo() {
        $total = 0;

        foreach ($this->input as $report) {
            $vals = array_map('intval',explode(" ", $report));
            $reverse = array_reverse($vals);

            $forwardRes = $this->checkValid($vals);
            $backwardRes = $this->checkValid($reverse);

            if ($forwardRes == -1 || $backwardRes == -1) {
                $total += 1;
                continue;
            }

            array_splice($vals, $forwardRes, 1);
            array_splice($reverse, $backwardRes, 1);

            $forwardRes = $this->checkValid($vals);
            $backwardRes = $this->checkValid($reverse);

            if ($forwardRes == -1 || $backwardRes == -1) {
                $total += 1;
            }
        }

        echo $total, PHP_EOL;
    }
}

$solver = new AdventSolver('input.txt');
echo $solver->solvePartOne(); // 334
echo $solver->solvePartTwo(); // 400