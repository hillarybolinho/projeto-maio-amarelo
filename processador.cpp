#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main(int argc, char* argv[]) {
    // O gabarito oficial: 1-C, 2-B, 3-B, 4-C, 5-B, 6-B
    // (As letras que você colocou no seu HTML)
    string gabarito[] = {"c", "b", "b", "c", "b", "b"};
    int acertos = 0;

    // O Node.js vai passar as respostas como argumentos depois do nome do programa
    // Por exemplo: ./processador c b a c b b
    // O loop começa em 1 porque o 0 é o nome do programa
    for (int i = 1; i < argc; i++) {
        if (string(argv[i]) == gabarito[i-1]) {
            acertos++;
        }
    }

    // O C++ imprime apenas o número final. O Node.js vai ler esse número.
    cout << acertos;

    return 0;
}