<?php

class AdventSolver {
    private $input;

    public function __construct($inputFile) {
        $this->input = file($inputFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }

    public function q1() {
        $vals = explode(" ", $this->input[0]);
        $stones = [];

        foreach ($vals as $val) {
            $stones[$val] = 1;
        }
        
        for( $i=0 ; $i<75 ; $i++ ) {
            $total = 0;
            $ts = [];

            foreach ($stones as $stone => $count) {
                // Rule 1
                if ((int)$stone == 0) {
                    if (!isset($ts["1"])) {
                        $ts["1"] = 0;
                    }
                    $ts["1"]+= (int)$count;
                    continue;
                }

                // Rule 2
                $len = strlen($stone);
                if ($len % 2 == 0) {
                    $s2a = substr($stone, 0, $len / 2);
                    $s2b = (string)(int)(substr($stone, $len / 2, $len / 2));
                    if (!isset($ts[$s2a])) {
                        $ts[$s2a] = 0;
                    }
                    if (!isset($ts[$s2b])) {
                        $ts[$s2b] = 0;
                    }
                    $ts[$s2a]+= (int)$count;
                    $ts[$s2b]+= (int)$count;
                    continue;
                }

                // Rules 3
                $s3 = (string)((int)$stone * 2024);
                if (!isset($ts[$s3])) {
                    $ts[$s3] = 0;
                }
                $ts[$s3]+= (int)$count;
            }

            foreach ($ts as $stone => $count) {
                $total += $count;
            }

            $stones = $ts;
            echo $i +1, PHP_EOL;
            echo $total, PHP_EOL;
            echo "", PHP_EOL;
        }
    }
}

$solver = new AdventSolver('input.txt');
echo $solver->q1(); // includes q2
