use std::fs;
use std::collections::HashMap;

fn main() {
    let content = fs::read_to_string("input.txt").expect("Could not read file");
    let lines: Vec<&str> = content.lines().collect();
    let mut rules_before: HashMap<&str, Vec<&str>> = HashMap::new();
    let mut rules_after: HashMap<&str, Vec<&str>> = HashMap::new();
    let mut q1_total = 0;
    let mut q2_total = 0;
    let mut wrong_lines: Vec<&str> = Vec::new();    ;
    
    for line in lines {
        if line.contains("|") {
            rules_before.entry(&line[0..2]).or_default().push(&line[3..5]);
            rules_after.entry(&line[3..5]).or_default().push(&line[0..2]);
        }
        
        if line.contains(",") {
            let mut is_valid = true;

            for num in line.split(",") {
                if check_num(num, line, &rules_before, &rules_after) != 0 {
                    is_valid = false;
                    break;
                }
            }
            
            let vvv: Vec<u32> = line.split(",").map(|x| x.parse::<u32>().unwrap()).collect();
            if is_valid {
                q1_total = q1_total + vvv[vvv.len()/2];
            } else {
                wrong_lines.push(line);
            }
        }
    }

    for line in wrong_lines {
        let mut is_valid = false;
        let mut line_copy = line.to_string();

        while !is_valid {
            let mut line_vec: Vec<String> = line_copy.split(',').map(|s| s.to_string()).collect(); 
            let mut valid_len = 0;

            for offset in 0..line_vec.len() {
                let num = &line_vec[offset];

                match check_num(num, &line_copy, &rules_before, &rules_after) {
                    0 => valid_len += 1,
                    1 => {
                        line_vec.swap(offset, offset + 1);
                    },
                    -1 => {
                        line_vec.swap(offset, offset - 1);
                    },
                    _ => print!("err"),
                }
                
                line_copy = line_vec.join(",");
            }

            if valid_len == line_vec.len() {
                is_valid = true;
            }
        }

        let vv: Vec<u32> = line_copy.split(",").map(|x| x.parse::<u32>().unwrap()).collect();
        q2_total = q2_total + vv[vv.len()/2];
    }

    println!("{}",q1_total);
    println!("{}",q2_total);
}

fn check_num(num: &str, line: &str, rules_before: &HashMap<&str, Vec<&str>>, rules_after: &HashMap<&str, Vec<&str>>) -> i32 {
    let mut buckets: HashMap<&str, bool> = HashMap::new();
    let mut is_before = true;

    for bucket in line.split(",") {
        if num == bucket {
            is_before = false;
            continue
        }

        buckets.insert(bucket, is_before);
    }

    if !rules_before.get(num).is_none() {
        for before in rules_before.get(num).unwrap() {
            if buckets.get(before) == Some(&true) {
                return -1;
            }
        }
    }

    if !rules_after.get(num).is_none() {
        for after in rules_after.get(num).unwrap() {
            if buckets.get(after) == Some(&false) {
                return 1;
            }
        }
    }

    return 0;
}
