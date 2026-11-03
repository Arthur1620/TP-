let saldoTeste = 10000;

function atualizarSaldoNaTela() {
    const saldoNaTela = document.querySelector("#galo-coins");
    saldoNaTela.textContent = consultarSaldo().toLocaleString("pt-BR");
}

atualizarSaldoNaTela();

function consultarSaldo() {
    return saldoTeste;
}

function gastarMoedas(valor) {
    if (consultarSaldo() < valor) {
        return false;
    }

    saldoTeste = saldoTeste - valor;
    atualizarSaldoNaTela();
    return true;
}

const botoesUpgrades = document.querySelectorAll(".comprar-upgrade");

botoesUpgrades.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const card = botao.closest(".upgrade");
        const preco = Number(card.querySelector(".custo-upgrade").textContent);

        if (gastarMoedas(preco) === false) {
            return;
        }

        const nivel = card.querySelector(".nivel-upgrade");

        if (nivel !== null) {
            nivel.textContent = Number(nivel.textContent) + 1;
        }
        else {
            card.classList.remove("disponivel", "sem-moedas");
            card.classList.add("comprado");

            card.querySelector(".etiqueta-upgrade").textContent = "FEITO";

            const custo = card.querySelector(".custo-upgrade");
            custo.textContent = "Comprado";
            custo.classList.replace("custo-upgrade", "estado-upgrade");

            botao.disabled = true;
        }
    });
});

function verificarRequisito(card) {
    if (card.id === "iluminacao-noturna") {
        return document.querySelector("#gramado-premium").classList.contains("comprado");
    }

    if (card.id === "estadio-lotado") {
        return document.querySelector("#estadio-grande").classList.contains("comprado");
    }

    if (card.id === "sinalizadores") {
        return false;
    }

    return true;
}

function atualizarEstadosUpgrades() {
    botoesUpgrades.forEach(function (botao) {
        const card = botao.closest(".upgrade");

        if (card.classList.contains("comprado")) {
            botao.disabled = true;
            return;
        }

        const requisitoAtendido = verificarRequisito(card);
        const preco = Number(card.querySelector(".custo-upgrade").textContent);
        const temSaldo = consultarSaldo() >= preco;

        card.classList.remove("disponivel", "sem-moedas", "bloqueado");

        if (requisitoAtendido === false) {
            card.classList.add("bloqueado");
        } else if (temSaldo === false) {
            card.classList.add("sem-moedas");
        } else {
            card.classList.add("disponivel");
        }

        botao.disabled = requisitoAtendido === false || temSaldo === false;
    });
}