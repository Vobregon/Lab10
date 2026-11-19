
        const contenedor = document.getElementById("resultado");
        const buscador = document.getElementById("buscador");

        let pokedex = [];
        const nombres = ["bulbasaur", "charmander", "squirtle", "pikachu", "jigglypuff", "gengar"];

        function crearTarjeta(pokemon) {
            const { nombre, imagen, tipos } = pokemon;
            const img = imagen ?? "https://via.placeholder.com/96?text=?";
            const badges = tipos.map(function(tipo) {
                return `<span class="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">${tipo}</span>`;
            }).join("");

            const articulo = document.createElement("article");
            articulo.className = "bg-white rounded-xl shadow p-4 text-center transform hover:scale-105 transition duration-200";
            articulo.innerHTML = `
                <img src="${img}" alt="${nombre}" class="w-24 mx-auto">
                <h2 class="capitalize font-bold text-slate-800 mt-2">${nombre}</h2>
                <div class="flex gap-1 justify-center mt-2 flex-wrap">${badges}</div>
            `;
            return articulo;
        }

        function render(lista) {
            contenedor.innerHTML = "";

            if (lista.length === 0) {
                contenedor.innerHTML = '<p class="col-span-full text-center text-slate-500">No se encontraron Pokémon con ese nombre.</p>';
                return;
            }

            lista.forEach(function(pokemon) {
                const tarjeta = crearTarjeta(pokemon);
                contenedor.appendChild(tarjeta);
            });
        }

        function adaptarPokemon(data) {
            return {
                nombre: data.name,
                imagen: data.sprites?.front_default ?? "https://via.placeholder.com/96?text=?",
                tipos: data.types.map(t => t.type.name)
            };
        }

        /*contenedor.innerHTML = '<p class="col-span-full text-center text-slate-500">Cargando Pokedex de la muestra...</p>';*/
        contenedor.innerHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-8 gap-3">
        <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-sm text-slate-500 font-medium">Cargando Pokédex...</p>
    </div>
`;

        const promesas = nombres.map(function(nombre) {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then(r => r.json());
        });

        Promise.all(promesas)
            .then(function(datosCrudos) {
                pokedex = datosCrudos.map(adaptarPokemon);
                render(pokedex);
            })
            .catch(function() {
                contenedor.innerHTML = '<p class="col-span-full text-center text-slate-500">No se pudo cargar la pokedex</p>';
            });

        buscador.addEventListener("input", function() {
            const textoBuscado = buscador.value.toLowerCase().trim();
            
            // CORRECCIÓN: Usar "pokedex" en lugar de "pokemonLocal"
            const pokemonFiltrados = pokedex.filter(function(pokemon) {
                return pokemon.nombre.includes(textoBuscado);
            });
            
            render(pokemonFiltrados);
        });
   
   
        /*
const contenedor =  document.getElementById("resultado");
const buscador = document.getElementById("buscador");

let pokedex = [];
const nombres = ["bulbasaur","charmander","squirtle","pikachu","jigglypuff","gengar"];


function crearTarjeta(pokemon){
     const {nombre, imagen, tipos} = pokemon;

     const img = imagen ?? "https://via.placeholder.com/96?text=?"

     const bages = tipos.map(function(tipo){
        return `<span class="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">${tipo} </span>`;
    }).join("");

    const articulo = document.createElement("article");
    articulo.className = "bg-white rounded-xl shadow p-4 text-center transform hover:scale-105 transition duration-200"

    articulo.innerHTML = `
             <img src="${img}" alt="${nombre}" class="w-24 mx-auto">
             <h2 class="capitalize font-bold text-slate-800 mt-2">${nombre}</h2>
            <div class="flex gap-1 justify-center mt-2 flex-wrap"></div>
    
    `;

    return articulo;
}
 function render(lista) {
    contenedor.innerHTML = "";
    lista.forEach(function(pokemon) {
        const tarjeta = crearTarjeta(pokemon);
        contenedor.appendChild(tarjeta);
    });

 } 

function adaptarPokemon(data){
   return {
             nombre: data.name,
             imagen: data.sprites?.front_default ?? "https://via.placeholder.com/96?text=?",
             tipos: data.types.map( t => t.type.name)

             };
}

contenedor.innerHTML = '<p class="col-span-full text-center text-slate-500">Cargando Pokedex de la muestra</p>';
const promesas = nombres.map(function(nombre) {
       return fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`).then(r => r.json());

});

Promise.all(promesas).then(function(datosCrudos){
    pokedex = datosCrudos.map(adaptarPokemon);
    render(pokedex);
}).catch(function(){
    contenedor.innerHTML = '<p class="col-span-full text-center text-slate-500">No se pudo cargar la pokedex</p>';
})

 buscador.addEventListener("input", function(){
    const textoBuscado = buscador.value.toLocaleLowerCase();

    const pokemonFiltrados = pokemonLocal.filter(function(pokemon){
        return pokemon.nombre.includes(textoBuscado);
    })

    render(pokemonFiltrados);
 }) */