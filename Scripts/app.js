"use strict";
const urlAPI = "https://restcountries.com/v3.1/all";

let paises = [];


class Pais {
    constructor(flag,
        name,
        region,
        population,
        startOfWeek,
        flags) {
            this.flag = flag;
            this.name = name;
            this.region = region;
            this.population = population;
            this.startOfWeek = startOfWeek;
            this.flags = flags;
        }
}

const criarElementoPais = (pais) => {
    const minhaDiv = document.createElement('div');
    minhaDiv.classList.add("component-pais");

    minhaDiv.innerHTML = `
        ${pais.flag} -
        <label>${pais.name}</label> - 
        <label>${pais.region}</label>
    `;

    return minhaDiv;
}

function processarDados(lista) {
    const divDados = document.querySelector("#dados");

    
    divDados.innerHTML = "";

    const ul = document.createElement("ul");
    for (const pais of lista) {
        const li = document.createElement("li");

        const obj = {
            flag: pais.flag,
            name: pais.name.common,
            region: pais.region,
            population: pais.population,
            startOfWeek: pais.startOfWeek,
            flagPNG: pais.flags.png
        };

        const componentePais = criarElementoPais(obj);

        li.appendChild(componentePais);

        ul.appendChild(li);
    }
    divDados.appendChild(ul); 
}

function carregarDados() {
    fetch(urlAPI) 
        .then((result) => {
            console.log(result);
            return result.json(); 
        })
        .then((lista) => {
            console.log(lista);
           
            lista.sort((a,b) => (a.name.common > b.name.common ? 1 : -1));

            paises = lista;

            processarDados(lista);
        })
        .catch((err) => {
            console.error(err);
        });
}

function pesquisaHandler(evt) {
    evt.preventDefault();
    const termoPesquisa = document.querySelector("#pesquisa").value.trim().toLowerCase();

    
    const paisesFiltrados = paises.filter((pais) =>
        pais.name.common.toLowerCase().includes(termoPesquisa)
    );

    
    processarDados(paisesFiltrados);

}

function app() {
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", pesquisaHandler);

    carregarDados();
}


app();