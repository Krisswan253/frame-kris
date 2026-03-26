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

     frame.innerHTML = "";

    // 10 li 
    for (let i = 0; i < 10; i++) {
        const li = document.createElement("li");

        if (i == 0) {
            li.classList.add("active");
        }

        li.textContent = "Loading...";
        frame.appendChild(li);
    }
    const pokemonList = [
  { name: 'ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
  { name: 'venusaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
  { name: 'charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { name: 'charmeleon', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png' },
  { name: 'charizard', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
  { name: 'squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { name: 'wartortle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png' },
  { name: 'blastoise', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png' },
  { name: 'caterpie', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png' },
  { name: 'metapod', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png' }
];

    const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}`;

const gqlVariables = {
  limit: 10,
  offset: 1,
};

fetch('https://graphql-pokeapi.graphcdn.app/', {
  credentials: 'omit',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: gqlQuery,
    variables: gqlVariables,
  }),
  method: 'POST',
})
  .then((res) => res.json())
  .then((res) => {
    console.log('Response from server', res);

    const items = frame.querySelectorAll("li");

    for (let i = 0; i < pokemonList.length; i++) {
        const img = document.createElement("img");

        img.src = pokemonList[i].image;
        img.alt = pokemonList[i].name;

        items[i].innerHTML = ""; // remove "Loading..."
        items[i].appendChild(img);
    }
});
                  
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