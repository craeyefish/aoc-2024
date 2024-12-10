#include <stdio.h>
#include <stdlib.h>

const int lines = 130;
const int len = 130;

void readFile(char* ptr, int* x, int* y) {
    FILE *fp = fopen("input.txt", "r");
    if (!fp) {
        perror("Could not open file");
        return;
    }

    char *line = NULL;
    size_t lineLen = 0;
    ssize_t nread;
    int lineCounter = 0;

    while ((nread = getline(&line, &lineLen, fp)) != -1) {
        for (int i = 0 ; i < lines ; i++) {
            ptr[i + len * lineCounter] = line[i];

            if (line[i] == '^') {
                x[0] = i;
                y[0] = lineCounter;
            }
        }
        lineCounter++;
    }

    fclose(fp);
}

void move(char* ptr, int* curX, int* curY) {
    if (ptr[*curX + *curY * len] == '>') {
        if (*curX + 1 == len || ptr[*curX + 1 + *curY * len] != '#') {
            ptr[*curX + *curY * len] = 'x';
            curX[0]++;
            ptr[*curX + *curY * len] = '>';
        } else {
            ptr[*curX + *curY * len] = 'v';
        }
    }
    if (ptr[*curX + *curY * len] == 'v') {
        if (*curY + 1 == lines || ptr[*curX + (*curY + 1) * len] != '#') {
            ptr[*curX + *curY * len] = 'x';
            curY[0]++;
            ptr[*curX + *curY * len] = 'v';
        } else {
            ptr[*curX + *curY * len] = '<';
        }
    }
    if (ptr[*curX + *curY * len] == '<') {
        if (*curX == 0 || ptr[*curX - 1 + *curY * len] != '#') {
            ptr[*curX + *curY * len] = 'x';
            curX[0]--;
            ptr[*curX + *curY * len] = '<';
        } else {
            ptr[*curX + *curY * len] = '^';
        }
    }
    if (ptr[*curX + *curY * len] == '^') {
        if (*curY == 0 || ptr[*curX + (*curY - 1) * len] != '#') {
            ptr[*curX + *curY * len] = 'x';
            curY[0]--;
            ptr[*curX + *curY * len] = '^';
        } else {
            ptr[*curX + *curY * len] = '>';
        }
    }
}

int main() {
    char* ptr = (char*)malloc(len * lines);
    int curX = 0;
    int curY = 0;

    readFile(ptr, &curX, &curY);

    while (curX >= 0 && curX < len && curY >= 0 && curY < lines) {
        move(ptr, &curX, &curY);
    }
    
    int total1 = 0;
    for (int i = 0 ; i < len*lines ; i++) {
        if (ptr[i] == 'x') {
            total1++;
        }
    }

    printf("%d\n",total1);

    char* ptr2 = (char*)malloc(len * lines);
    int total2 = 0;

    for (int i = 0 ; i < len*lines ; i++) {
        if (ptr[i] != 'x') {
            continue;
        }

        readFile(ptr2, &curX, &curY);

        ptr2[i] = '#';

        int loopCounter = 0;
        while ((curX >= 0 && curX < len && curY >= 0 && curY < lines) && loopCounter < 100000) {
            move(ptr2, &curX, &curY);
            loopCounter++;
        }

        if (loopCounter == 100000) {
            total2++;
        }
    }

    printf("%d\n",total2 - 1);

    return 0;
}

