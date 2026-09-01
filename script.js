let imPalavras = [
    "TORTA",
    "LIVRO",
    "CASAS",
    "FRUTA",
    "CLARO",
    "CAMPO",
    "FELIZ",
    "BRAVO",
    "NUVEM",
    "PEDRA",
    "JOVEM",
    "GRITO",
    "VERDE",
    "PLUMA",
    "CAIXA",
    "SONHO",
    "FOLHA",
    "TRIGO",
    "MARTE"
]

const imBtnEnviar = document.querySelector(".btnEnviar");

const imModalVitoria = document.querySelector("#modalVitoria");
const imModalDerrota = document.querySelector("#modalDerrota");
const imBtnReiniciar = document.querySelectorAll(".btnReiniciar");

let imPalavraSecreta = "";
let imTentativa = 0;

function sortearPalavra(){
    let imindice = Math.floor(Math.random() * imPalavras.length);
    imPalavraSecreta = imPalavras[imindice];

    console.log(imPalavraSecreta);
}


function criarQuadro() {
    const imQuadro = document.querySelector(".quadro");

    for (let c = 1; c <= 6; c++) {
        let imLinha = document.createElement("div");
        imLinha.classList.add("linha")

        for (let i = 1; i <= 5; i++) {
            let imCasa = document.createElement("div");
            imCasa.classList.add("casa");
            imLinha.appendChild(imCasa);

            if((c + i) % 2 == 0) {
                imCasa.classList.add("preto");
            }
        }

        imQuadro.appendChild(imLinha)
    }
}


function verificar() {

    const imInput = document.querySelector(".inputPalavra");
    let imInputValue = imInput.value.toUpperCase();

   

    let imLinha = document.querySelectorAll(".linha")[imTentativa];

    for(let i = 0; i < 5; i++) {
        let imWord = imLinha.children[i];
        imWord.textContent = imInputValue[i];

        if(imInputValue[i] == imPalavraSecreta[i]) {
            imWord.classList.add("acerto");
        } else if(imPalavraSecreta.includes(imInputValue[i])) {
            imWord.classList.add("erro");
        }
    }

    imTentativa++;
    document.querySelector(".usadas").textContent = imTentativa;
    imInput.value = "";

    if (imInputValue === imPalavraSecreta) {
        imModalVitoria.classList.add("is-active");
        return;
    }

    if (imTentativa === 6) {
        imModalDerrota.classList.add("is-active");
    }

}


criarQuadro();
sortearPalavra();

imBtnEnviar.addEventListener("click", function(){
    verificar();
});

function reiniciarJogo() {
    imTentativa = 0;

    sortearPalavra();
    document.querySelector(".quadro").innerHTML = "";
    criarQuadro();
    document.querySelector(".inputPalavra").value = "";
    document.querySelector(".usadas").textContent = imTentativa;

    imModalVitoria.classList.remove("is-active");
    imModalDerrota.classList.remove("is-active");
}

const imReturn = document.querySelector(".return");

imReturn.addEventListener("click", function() {
    reiniciarJogo();
});

imBtnReiniciar.forEach(function(botao) {
    botao.addEventListener("click", function() {
        reiniciarJogo();
    });
});