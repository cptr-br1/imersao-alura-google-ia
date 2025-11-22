let cardContainer = document.querySelector(".card-container");
let dados = [];

async function iniciarBusca(){
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizaCards(dados);
}

function buscar() {
    const termoBusca = document.getElementById("searchInput").value.toLowerCase();
    if (termoBusca.trim() === "") {
        renderizaCards(dados); // Mostra todos se a busca estiver vazia
        return;
    }

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizaCards(resultados);
}

function renderizaCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank" rel="noopener noreferrer">Leia mais</a>
        `
        
        cardContainer.appendChild(article);

    }
}

iniciarBusca();

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchButton").addEventListener("click", buscar);
    document.getElementById("searchInput").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            buscar();
        }
    });
});