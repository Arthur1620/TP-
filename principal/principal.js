const treinador = document.querySelector(".tecnico");
const gramado = document.querySelector(".gramado");

treinador.addEventListener("click", function() {

    const bola = document.createElement("div");
    bola.classList.add("bola-chute");

    gramado.appendChild(bola);

    function posicao(elemento) {
        const campo = gramado.getBoundingClientRect();
        const personagem = elemento.getBoundingClientRect();

        return {
            x: personagem.left - campo.left + personagem.width / 2,
            y: personagem.top - campo.top + personagem.height / 2
        };
    }

    const inicio = posicao(treinador);
    const jogador1 = posicao(document.querySelector(".jogador1"));
    const jogador2 = posicao(document.querySelector(".jogador2"));
    const goleiro = posicao(document.querySelector(".goleiro"));

    bola.style.left = inicio.x + "px";
    bola.style.top = inicio.y + "px";

    function mover(destino) {
        bola.style.left = destino.x + "px";
        bola.style.top = destino.y + "px";
    }

    setTimeout(function() {
        mover(jogador1);
    }, 100);

    setTimeout(function() {
        mover(jogador2);
    }, 700);

    setTimeout(function() {
        mover(goleiro);
    }, 1300);

    setTimeout(function() {
        mover({
            x: gramado.clientWidth + 30,
            y: goleiro.y
        });
    }, 1900);

    setTimeout(function() {
        bola.remove();
    }, 2600);

});

let moedas = 0;
let multiplicador = 1;

function fazerGol() {
    moedas = moedas + (1 * multiplicador);

    document.querySelector(".moedas").innerText = moedas;
}