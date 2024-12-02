<?php

class AdventSolver {
    private $input;
    private $left = [];
    private $right = [];

    public function __construct($inputFile) {
        $this->input = file($inputFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($this->input as $line) {
            $vals = array_map('intval',explode("  ", $line));

            $this->left[] = $vals[0];
            $this->right[] = $vals[1];
        }

        sort($this->left);
        sort($this->right);
    }

    public function solvePartOne() {
        $total = 0;

        for( $i=0 ; $i<count($this->left); $i++ ) {
            $total += abs($this->left[$i] - $this->right[$i]);
        }

        echo $total, PHP_EOL;
    }

    public function solvePartTwo() {
        $total = 0;

        foreach($this->left as $leftNum) {
            $total += array_reduce($this->right, function($carry, $item) use ($leftNum) {
                if ($item != $leftNum) {
                    return $carry;
                }
                return $carry + $item;
            }, 0);
        }

        echo $total, PHP_EOL;
    }
}

$solver = new AdventSolver('input.txt');
echo $solver->solvePartOne(); // 1530215
echo $solver->solvePartTwo(); // 26800609