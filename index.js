/* eslint-disable no-unused-expressions */
// const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=fish';

const cards = document.querySelector('.cards');
const spinner = document.getElementById('spinner');
const showAllBtn = document.getElementById('show-all-btn');

// spinner toggler function
const toggleSpinner = (isLoading) => {
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
};
// creation of card
function cardDisplay(arr) {
    arr.forEach((meal) => {
        const { strMeal, strMealThumb } = meal;
        const div = document.createElement('div');
        div.className = 'flex justify-center';
        // inside button is the modal pop button
        div.innerHTML = ` 
 <div class="flex flex-col lg:flex-row rounded-lg bg-white shadow-lg">
 <img class="h-auto lg:max-h-[300px] w-full lg:w-2/3 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg" src="${strMealThumb}" alt="" />
 <div class="p-6 flex flex-col xl:w-full justify-start items-start">
   <h5 class="text-gray-900 text-xl font-medium mb-2">${strMeal}</h5>
   <p class="text-gray-700 text-base mb-4 xl:text-sm">
     This is a wider card with supporting text below as a natural lead-in to additional content. This content is a card
   </p>
   <p class="text-gray-600 text-xl mb-3">extra text</p>
   <button onclick='loadDetail(${JSON.stringify(
       meal
   )})' type="button" class="btn px-6 py-2.5 bg-cyan-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
   view details
 </button>
 </div>
</div>
`;
        cards.appendChild(div);
    });
}

// display data card
function display(meals) {
    // emptying card container before search result
    cards.innerHTML = '';

    // nothing found validation
    if (meals === null) {
        toggleSpinner(false);

        cards.innerHTML = `
        <p class="text-3xl text-center">nothing found</p>
        `;
        return;
    }
    let meals6;
    if (meals.length > 6) {
        showAllBtn.classList.remove('hidden');
        meals6 = meals.slice(0, 6);
        const rest = meals.slice(6, meals.length);
        cardDisplay(meals6);
        showAllBtn.addEventListener('click', function () {
            cardDisplay(rest);
            this.className = 'hidden';
        });
    } else {
        showAllBtn.className = 'hidden';
        cardDisplay(meals);
    }

    toggleSpinner(false);
}

// modal details dynamic markup creation
// eslint-disable-next-line no-unused-vars
function loadDetail(detail) {
    const {
        strMeal,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
    } = detail;
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerHTML = `${strMeal}'s details`;

    modalBody.innerHTML = `
    <p>Instruction: ${strInstructions.slice(0, 200)}</p>
    <p class="underline font-bold">Ingredients</p>
    <ul>
    <li class="list-disc list-inside">${strIngredient1} </li>
    <li class="list-disc list-inside">${strIngredient2}</li>
    <li class="list-disc list-inside">${strIngredient3}</li>
    <li class="list-disc list-inside">${strIngredient4}</li>
    </ul>
   
    `;
}

// data fetching from api
const loadMeals = async (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    const response = await fetch(url);
    const data = await response.json();

    display(data.meals);
};
// search addEventListener
const searchInput = document.getElementById('search-input');
document.getElementById('search-btn').addEventListener('click', () => {
    toggleSpinner(true);

    loadMeals(searchInput.value);
    searchInput.value = '';
});
loadMeals('');

// enter option functionality
document.getElementById('search-input').addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
        toggleSpinner(true);

        loadMeals(searchInput.value);
        searchInput.value = '';
    }
});
