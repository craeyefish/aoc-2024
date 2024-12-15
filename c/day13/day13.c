#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int q1(int xa, int ya, int xb, int yb, int xp, int yp) {
    int result = 0;
    for (int a = 0 ; a < 100 ; a++) {
        for (int b = 0 ; b < 100 ; b++) {
            if ((xp == a * xa + b * xb) && (yp == a * ya + b * yb)) {
                int val = 3 * a + b;
                if (result == 0) {
                    result = val;
                } else if (result > val) {
                    result = val;
                }
            }
        }
    }
    return result;
}

double q2(double xa, double ya, double xb, double yb, double xp, double yp) {
    xp += 10000000000000;
    yp += 10000000000000;
    
    // line b crosses 0
    double c = yp - ((yb/xb) * xp);

    // line a meets line b
    double x = c / ((ya/xa)-(yb/xb));

    double a = round(round(x) / xa);
    double b = round(round(xp - x) / xb);

    if ((xp == a * xa + b * xb) && (yp == a * ya + b * yb)) {
        return (double)3 * a + b;
    }

    return 0;
}

int main() {
    FILE *fp = fopen("input.txt", "r");
    char *line = NULL;
    size_t lineLen = 0;
    ssize_t nread;
    int q1Total = 0;
    double q2Total = 0;
    int xa = 0;
    int ya = 0;
    int xb = 0;
    int yb = 0;
    int xp = 0;
    int yp = 0;
    

    int lineCount = 0;

    while ((nread = getline(&line, &lineLen, fp)) != -1) {
        switch (lineCount%4) {
            case 0:
                sscanf(line, "Button A: X+%d, Y+%d", &xa, &ya);
                break;
            case 1:
                sscanf(line, "Button B: X+%d, Y+%d", &xb, &yb);
                break;
            case 2: 
                sscanf(line, "Prize: X=%d, Y=%d", &xp, &yp);
                q1Total += q1(xa, ya, xb, yb, xp, yp);
                q2Total += q2(xa, ya, xb, yb, xp, yp);
                break;
        }
        lineCount++;
    }

    fclose(fp);

    printf("%d\n",q1Total);
    printf("%f\n",q2Total);

    return 0;
}

