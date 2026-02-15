#include <stdio.h>
#include <string.h>

int parseData(char*);

int main() {
  const char filename[] = "./data/01.input.test";

  parseData((char*)filename);

  return 0;
}

int parseData(char* filename) {
  const unsigned int SIZE = 1024;
  char buffer[SIZE];
  FILE* f = fopen(filename, "r");

  if (f == NULL) {
    perror("Error opening file");
    return 1;
  }

  while(fgets(buffer, SIZE, f)) {
    buffer[strcspn(buffer, "\n")] = (char) 0;
    printf("Buffer: %s\n", buffer);
  }
  fclose(f);

  return 0;
}
