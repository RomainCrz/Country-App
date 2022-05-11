// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
const countries_container = document.querySelector(".countries-container");
const input = document.getElementById("inputSearch");

let countries = [];
let minToMax_btn = false;
let maxToMin_btn = true;
let alpha_btn = false;

dataSearch();

inputSearch.addEventListener("input", () => {
  countriesDisplay(inputSearch.value);
});

async function dataSearch() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        countries.push(data[i]);
      }
    });
  countriesDisplay(inputSearch.value);
  console.log(countries);
}

function countriesDisplay(pays) {
  let searched = [];
  if (pays.length > 0) {
    for (let i = 0; i < countries.length; i++) {
      let nomPays = countries[i].name.common;

      if (nomPays.toLowerCase().includes(pays.toLowerCase())) {
        searched.push(countries[i]);
      }
    }
  } else {
    searched = countries;
  }
  if (maxToMin_btn == true) {
    searched.sort((a, b) => b.population - a.population);
  } else if (minToMax_btn == true) {
    searched.sort((a, b) => a.population - b.population);
  } else if (alpha_btn == true) {
    searched.sort((a, b) => a.name.common.localeCompare(b.name.common));
    console.log(searched);
  }

  countries_container.innerHTML = searched
    .slice(0, inputRange.value)
    .map((country) => {
      return `
        <div class = "pays">
            <img src="${country.flags.png}">
            <h2>${country.name.common}</h2>
            <h3>${country.capital}</h3>
            <p> Population : ${country.population.toLocaleString()}</p>
        </div>
        `;
    })
    .join("");
}

inputRange.addEventListener("input", () => {
  countriesDisplay(inputSearch.value);
});
minToMax.addEventListener("click", () => {
  minToMax_btn = true;
  maxToMin_btn = false;
  alpha_btn = false;
  countriesDisplay(inputSearch.value);
});
maxToMin.addEventListener("click", () => {
  minToMax_btn = false;
  maxToMin_btn = true;
  alpha_btn = false;
  countriesDisplay(inputSearch.value);
});
alpha.addEventListener("click", () => {
  minToMax_btn = false;
  maxToMin_btn = false;
  alpha_btn = true;
  countriesDisplay(inputSearch.value);
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
