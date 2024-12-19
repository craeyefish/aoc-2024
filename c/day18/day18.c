#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <stdbool.h>

const int size = 71;
const int maxFallingBytes = 1024;

void printGrid(char *ptr)
{
    printf("\n");
    for (int y = 0; y < size; y++)
    {
        for (int x = 0; x < size; x++)
        {
            printf("%c", ptr[y * size + x]);
        }
        printf("\n");
    }
    printf("\n");
}

void fill(char *ptr, char *mask)
{

    for (int y = 0; y < size; y++)
    {
        for (int x = 0; x < size; x++)
        {
            if (ptr[y * size + x] == 'O')
            {
                // up
                if (y > 0 && ptr[(y - 1) * size + x] == '.')
                {
                    mask[(y - 1) * size + x] = 'O';
                }
                // left
                if (x > 0 && ptr[y * size + x - 1] == '.')
                {
                    mask[y * size + x - 1] = 'O';
                }
                // down
                if (y < (size - 1) && ptr[(y + 1) * size + x] == '.')
                {
                    mask[(y + 1) * size + x] = 'O';
                }
                // right
                if (x < (size - 1) && ptr[y * size + x + 1] == '.')
                {
                    mask[y * size + x + 1] = 'O';
                }
            }
        }
    }

    for (int y = 0; y < size; y++)
    {
        for (int x = 0; x < size; x++)
        {
            if (mask[y * size + x] == 'O')
            {
                ptr[y * size + x] = 'O';
                mask[y * size + x] = '.';
            }
        }
    }
}

void q1(char *ptr, char *mask)
{
    int result = 0;

    while (ptr[size * size - 1] != 'O')
    {
        fill(ptr, mask);
        result++;
    }

    printf("%d\n", result);
}

bool q2(char *ptr, char *mask)
{
    int result = 0;
    int max = 10000;

    while (ptr[size * size - 1] != 'O' && result < max)
    {
        fill(ptr, mask);
        result++;
    }

    return result == max;
}

int main()
{
    FILE *fp = fopen("input.txt", "r");
    ssize_t nread;
    size_t lineLen = 0;
    char *line = NULL;
    char *ptr = (char *)malloc(size * size);
    char *ptr2 = (char *)malloc(size * size);
    char *mask = (char *)malloc(size * size);
    int lineCount = 0;

    for (int i = 0; i < size * size; i++)
    {
        ptr[i] = '.';
        ptr2[i] = '.';
        mask[i] = '.';
    }
    ptr[0] = 'O';
    ptr2[0] = 'O';

    while ((nread = getline(&line, &lineLen, fp)) != -1)
    {
        int x = 0;
        int y = 0;
        sscanf(line, "%d,%d", &x, &y);

        if (lineCount < maxFallingBytes)
        {
            ptr[y * size + x] = '#';
            ptr2[y * size + x] = '#';
        }

        lineCount++;
        if (lineCount == maxFallingBytes)
        {
            q1(ptr, mask);
        }

        if (lineCount > maxFallingBytes)
        {
            ptr2[y * size + x] = '#';
            memcpy(ptr, ptr2, size * size);
            if (q2(ptr, mask) == true)
            {
                printGrid(ptr);
                printf("%d,%d\n", x, y);
                break;
            }
        }
    }

    fclose(fp);

    return 0;
}
