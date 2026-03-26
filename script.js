/* 
    Assignment: Frame
    1. Pick a free, public API (e.g. NASA, Dog API, PokéAPI, etc.)
    2. In getData(), use fetch() to fetch data from the API
    3. Insert 10+ li elements into the .frame element 
*/

const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 10; // change this if you do more than 10 items

async function getData() {
    // YOUR CODE HERE
  async function getData() {

    frame.innerHTML = "";

    const loadingItem = document.createElement("li");
    loadingItem.textContent = "Loading...";
    loadingItem.classList.add("active");
    frame.appendChild(loadingItem);

    const query = `
        query {
            pokemons(limit: 10, offset: 0) {
                results {
                    name
                    image
                }
            }
        }
    `;

    try {
        const response = await fetch("https://graphql-pokeapi.vercel.app/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: query })
        });

        const data = await response.json();

        frame.innerHTML = "";

        const pokemonList = data.data.pokemons.results;

        for (let i = 0; i < pokemonList.length; i++) {
            const li = document.createElement("li");
            const img = document.createElement("img");

            img.src = pokemonList[i].image;
            img.alt = pokemonList[i].name;

            if (i == 0) {
                li.classList.add("active");
            }

            li.appendChild(img);
            frame.appendChild(li);
        }

    } catch (error) {
        frame.innerHTML = "";

        const errorItem = document.createElement("li");
        errorItem.textContent = "Error loading data";
        errorItem.classList.add("active");
        frame.appendChild(errorItem);

        console.log(error);
    }
}
}

function goToItem(index) {
    const items = frame.querySelectorAll('li');
    items[currentItem].classList.remove('active');
    currentItem = index;
    items[currentItem].classList.add('active');
}

frame.addEventListener('click', function () {
    const nextItem = (currentItem + 1) % totalItems;
    goToItem(nextItem);
});

getData();