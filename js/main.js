let currentMeal = null;
let currentNutrition = null;


function displayCategories(categories) {
  let cartona = "";

  for (let i = 0; i < categories.length; i++) {
    cartona += `
      <div
        class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
        data-category="${categories[i].strCategory}"
      >
        <div class="flex items-center gap-2.5">

          <div
            class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
          >
            <i class="fa-solid fa-utensils"></i>
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-900">
              ${categories[i].strCategory}
            </h3>
          </div>

        </div>
      </div>
    `;
  }

  document.getElementById("categories-grid").innerHTML = cartona;

  let categoryCards =
    document.querySelectorAll(".category-card");

  for (let i = 0; i < categoryCards.length; i++) {
    categoryCards[i].addEventListener(
      "click",
      async function () {

        showLoading();

        try {

          let category =
            categoryCards[i].getAttribute(
              "data-category"
            );

          let meals =
            await getMealsByCategory(category);

          displayMeals(meals);

        } catch (error) {

          displayError();

        }

        hideLoading();

      }
    );
  }
}


function displayMeals(meals) {

  if (meals == null) {

    document.getElementById("recipes-grid").innerHTML = `
      <div class="flex flex-col items-center justify-center py-12 text-center">

        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
        </div>

        <p class="text-gray-500 text-lg">
          No recipes found
        </p>

        <p class="text-gray-400 text-sm mt-2">
          Try searching for something else
        </p>

      </div>
    `;

    document.getElementById("recipes-count").innerHTML =
      "Showing 0 recipes";

    return;
  }


  let cartona = "";


  for (let i = 0; i < meals.length; i++) {

    cartona += `
      <div
        class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-meal-id="${meals[i].idMeal}"
      >

        <div class="relative h-48 overflow-hidden">

          <img
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src="${meals[i].strMealThumb}"
            alt="${meals[i].strMeal}"
            loading="lazy"
          />

          <div class="absolute bottom-3 left-3 flex gap-2">

            <span
              class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
            >
              ${meals[i].strCategory || ""}
            </span>

            <span
              class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
            >
              ${meals[i].strArea || ""}
            </span>

          </div>

        </div>


        <div class="p-4">

          <h3
            class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
          >
            ${meals[i].strMeal}
          </h3>

          <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            Delicious recipe to try!
          </p>

          <div class="flex items-center justify-between text-xs">

            <span class="font-semibold text-gray-900">
              <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
              ${meals[i].strCategory || ""}
            </span>

            <span class="font-semibold text-gray-500">
              <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
              ${meals[i].strArea || ""}
            </span>

          </div>

        </div>

      </div>
    `;
  }


  document.getElementById("recipes-grid").innerHTML =
    cartona;


  document.getElementById("recipes-count").innerHTML =
    `Showing ${meals.length} recipes`;


  let recipeCards =
    document.querySelectorAll(".recipe-card");


  for (let i = 0; i < recipeCards.length; i++) {

    recipeCards[i].addEventListener(
      "click",
      async function () {

        showLoading();

        try {

          let mealId =
            recipeCards[i].getAttribute(
              "data-meal-id"
            );

          let meal =
            await getMealById(mealId);

          displayMealDetails(meal);

        } catch (error) {

          displayError();

        }

        hideLoading();

      }
    );
  }
}


function showMealDetailsSection() {

  document.getElementById(
    "search-filters-section"
  ).style.display = "none";

  document.getElementById(
    "meal-categories-section"
  ).style.display = "none";

  document.getElementById(
    "all-recipes-section"
  ).style.display = "none";

  document.getElementById(
    "meal-details"
  ).style.display = "block";
}


function getIngredients(meal) {

  let ingredients = [];


  for (let i = 1; i <= 20; i++) {

    let ingredient =
      meal["strIngredient" + i];

    let measure =
      meal["strMeasure" + i];


    if (
      ingredient != null &&
      ingredient.trim() != ""
    ) {

      ingredients.push({
        ingredient: ingredient,
        measure: measure
      });

    }
  }


  return ingredients;
}


function displayIngredients(meal) {

  let ingredients =
    getIngredients(meal);

  let cartona = "";


  for (let i = 0; i < ingredients.length; i++) {

    cartona += `
      <div
        class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
      >

        <input
          type="checkbox"
          class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
        />

        <span class="text-gray-700">

          <span class="font-medium text-gray-900">
            ${ingredients[i].measure || ""}
          </span>

          ${ingredients[i].ingredient}

        </span>

      </div>
    `;
  }


  document.getElementById(
    "ingredients-container"
  ).innerHTML = cartona;


  document.getElementById(
    "ingredients-count"
  ).innerHTML =
    ingredients.length + " items";
}


function displayInstructions(meal) {

  document.getElementById(
    "instructions-container"
  ).innerHTML = `
    <div
      class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
    >

      <div
        class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
      >
        1
      </div>

      <p class="text-gray-700 leading-relaxed pt-2">
        ${meal.strInstructions}
      </p>

    </div>
  `;
}


function displayMealDetails(meal) {

  currentMeal = meal;

  currentNutrition = null;


  document.getElementById(
    "meal-details-image"
  ).src =
    meal.strMealThumb;


  document.getElementById(
    "meal-details-image"
  ).alt =
    meal.strMeal;


  document.getElementById(
    "meal-details-name"
  ).innerHTML =
    meal.strMeal;


  document.getElementById(
    "meal-details-category"
  ).innerHTML =
    meal.strCategory;


  document.getElementById(
    "meal-details-area"
  ).innerHTML =
    meal.strArea;


  document.getElementById(
    "log-meal-btn"
  ).setAttribute(
    "data-meal-id",
    meal.idMeal
  );


  displayIngredients(meal);

  displayInstructions(meal);

  displayMealVideo(meal);


  let nutritionIngredients =
    getIngredientsForNutrition(meal);


  setLogMealLoading();


  analyzeMealNutrition(
    meal.strMeal,
    nutritionIngredients
  )
    .then(function (nutrition) {

      currentNutrition =
        nutrition;


      displayNutrition(
        nutrition
      );


      setLogMealReady();


      console.log(
        "Nutrition ready:",
        currentNutrition
      );

    })
    .catch(function (error) {

      console.log(
        "Nutrition error:",
        error
      );


      let logMealBtn =
        document.getElementById(
          "log-meal-btn"
        );


      logMealBtn.disabled =
        true;


      logMealBtn.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span>Nutrition unavailable</span>
      `;

    });


  showMealDetailsSection();


  window.scrollTo(0, 0);
}


function hideMealDetailsSection() {

  document.getElementById(
    "meal-details"
  ).style.display =
    "none";


  document.getElementById(
    "search-filters-section"
  ).style.display =
    "block";

  document.getElementById(
    "meal-categories-section"
  ).style.display =
    "block";

  document.getElementById(
    "all-recipes-section"
  ).style.display =
    "block";


  window.scrollTo(0, 0);
}


document
  .getElementById(
    "back-to-meals-btn"
  )
  .addEventListener(
    "click",
    function () {

      hideMealDetailsSection();

    }
  );


function showLoading() {

  document.getElementById(
    "app-loading-overlay"
  ).style.display =
    "flex";
}


function hideLoading() {

  document.getElementById(
    "app-loading-overlay"
  ).style.display =
    "none";
}


async function init() {

  showLoading();


  document.getElementById(
    "meal-details"
  ).style.display =
    "none";

  document.getElementById(
    "products-section"
  ).style.display =
    "none";

  document.getElementById(
    "foodlog-section"
  ).style.display =
    "none";


  try {

    let categories =
      await getCategories();


    displayCategories(
      categories
    );


    let meals =
      await searchMeals("");


    displayMeals(
      meals
    );

  } catch (error) {

    displayError();

  }

  displayTodayDate();


  hideLoading();
}


init();


let searchInput =
  document.getElementById(
    "search-input"
  );


searchInput.addEventListener(
  "input",
  async function () {

    showLoading();


    try {

      let searchValue =
        searchInput.value;


      let meals =
        await searchMeals(
          searchValue
        );


      displayMeals(
        meals
      );

    } catch (error) {

      displayError();

    }


    hideLoading();

  }
);


let allRecipesBtn =
  document.getElementById(
    "all-recipes-btn"
  );


let egyptianFilterBtn =
  document.getElementById(
    "egyptian-filter-btn"
  );


allRecipesBtn.addEventListener(
  "click",
  async function () {

    showLoading();


    try {

      let meals =
        await searchMeals("");


      displayMeals(
        meals
      );

    } catch (error) {

      displayError();

    }


    hideLoading();

  }
);


egyptianFilterBtn.addEventListener(
  "click",
  async function () {

    showLoading();


    try {

      let meals =
        await getMealsByArea(
          "Egyptian"
        );


      displayMeals(
        meals
      );

    } catch (error) {

      displayError();

    }


    hideLoading();

  }
);


function showMealsPage() {

  document.getElementById(
    "search-filters-section"
  ).style.display =
    "block";

  document.getElementById(
    "meal-categories-section"
  ).style.display =
    "block";

  document.getElementById(
    "all-recipes-section"
  ).style.display =
    "block";


  document.getElementById(
    "meal-details"
  ).style.display =
    "none";

  document.getElementById(
    "products-section"
  ).style.display =
    "none";

  document.getElementById(
    "foodlog-section"
  ).style.display =
    "none";


  document.getElementById(
    "header-title"
  ).innerHTML =
    "Meals & Recipes";


  document.getElementById(
    "header-subtitle"
  ).innerHTML =
    "Discover delicious and nutritious recipes tailored for you";


  window.scrollTo(0, 0);
}


function showProductsPage() {

  document.getElementById(
    "search-filters-section"
  ).style.display =
    "none";

  document.getElementById(
    "meal-categories-section"
  ).style.display =
    "none";

  document.getElementById(
    "all-recipes-section"
  ).style.display =
    "none";

  document.getElementById(
    "meal-details"
  ).style.display =
    "none";

  document.getElementById(
    "foodlog-section"
  ).style.display =
    "none";


  document.getElementById(
    "products-section"
  ).style.display =
    "block";


  document.getElementById(
    "header-title"
  ).innerHTML =
    "Product Scanner";


  document.getElementById(
    "header-subtitle"
  ).innerHTML =
    "Search packaged foods and view nutrition information";


  window.scrollTo(0, 0);
}


function showFoodLogPage() {

  document.getElementById(
    "search-filters-section"
  ).style.display =
    "none";

  document.getElementById(
    "meal-categories-section"
  ).style.display =
    "none";

  document.getElementById(
    "all-recipes-section"
  ).style.display =
    "none";

  document.getElementById(
    "meal-details"
  ).style.display =
    "none";

  document.getElementById(
    "products-section"
  ).style.display =
    "none";


  document.getElementById(
    "foodlog-section"
  ).style.display =
    "block";


  document.getElementById(
    "header-title"
  ).innerHTML =
    "Food Log";


  document.getElementById(
    "header-subtitle"
  ).innerHTML =
    "Track and monitor your daily nutrition intake";


  displayFoodLog();


  window.scrollTo(0, 0);
}


let mealsNavLink =
  document.getElementById(
    "meals-nav-link"
  );


let productsNavLink =
  document.getElementById(
    "products-nav-link"
  );


let foodlogNavLink =
  document.getElementById(
    "foodlog-nav-link"
  );


mealsNavLink.addEventListener(
  "click",
  function (event) {

    event.preventDefault();

    showMealsPage();

  }
);


productsNavLink.addEventListener(
  "click",
  function (event) {

    event.preventDefault();

    showProductsPage();

  }
);


foodlogNavLink.addEventListener(
  "click",
  function (event) {

    event.preventDefault();

    showFoodLogPage();

  }
);


function displayError() {

  document.getElementById(
    "recipes-grid"
  ).innerHTML = `
    <div class="text-center py-12">

      <i
        class="fa-solid fa-triangle-exclamation text-red-500 text-3xl mb-3"
      ></i>

      <p class="text-red-500 font-semibold">
        Something went wrong
      </p>

      <p class="text-gray-500 text-sm mt-2">
        Please try again later
      </p>

    </div>
  `;


  document.getElementById(
    "recipes-count"
  ).innerHTML =
    "Unable to load recipes";
}


function getIngredientsForNutrition(meal) {

  let ingredients = [];


  for (let i = 1; i <= 20; i++) {

    let ingredient =
      meal["strIngredient" + i];

    let measure =
      meal["strMeasure" + i];


    if (
      ingredient != null &&
      ingredient.trim() != ""
    ) {

      ingredients.push(
        (measure || "") +
        " " +
        ingredient
      );

    }
  }


  return ingredients;
}


function displayNutrition(nutrition) {

  let data =
    nutrition.data;


  document.getElementById(
    "hero-servings"
  ).innerHTML =
    data.servings +
    " servings";


  document.getElementById(
    "hero-calories"
  ).innerHTML =
    data.perServing.calories +
    " cal/serving";


  document.getElementById(
    "nutrition-facts-container"
  ).innerHTML = `
    <p class="text-sm text-gray-500 mb-4">
      Per serving
    </p>

    <div
      class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
    >
      <p class="text-sm text-gray-600">
        Calories per serving
      </p>

      <p class="text-4xl font-bold text-emerald-600">
        ${data.perServing.calories}
      </p>

      <p class="text-xs text-gray-500 mt-1">
        Total: ${data.totals.calories} cal
      </p>
    </div>


    <div class="space-y-4">

      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Protein
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.protein}g
        </span>
      </div>


      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Carbs
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.carbs}g
        </span>
      </div>


      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Fat
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.fat}g
        </span>
      </div>


      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Fiber
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.fiber}g
        </span>
      </div>


      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Sugar
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.sugar}g
        </span>
      </div>


      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Sodium
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.sodium}mg
        </span>
      </div>


      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Cholesterol
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.cholesterol}mg
        </span>
      </div>


      <div class="flex items-center justify-between">
        <span class="text-gray-700">
          Saturated Fat
        </span>

        <span class="font-bold text-gray-900">
          ${data.perServing.saturatedFat}g
        </span>
      </div>

    </div>
  `;
}


function displayFoodLog() {

  let foodLog = [];


  if (
    localStorage.getItem(
      "foodLog"
    ) != null
  ) {

    foodLog =
      JSON.parse(
        localStorage.getItem(
          "foodLog"
        )
      );

  }


  let cartona = "";

  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;


  if (foodLog.length == 0) {

    document.getElementById(
      "logged-items-list"
    ).innerHTML = `
      <div class="text-center py-8 text-gray-500">

        <i
          class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
        ></i>

        <p class="font-medium">
          No meals logged today
        </p>

        <p class="text-sm">
          Add meals from the Meals page or scan products
        </p>

      </div>
    `;


    document.getElementById(
      "logged-items-count"
    ).innerHTML =
      "Logged Items (0)";


    document.getElementById(
      "calories-text"
    ).innerHTML =
      "0 / 2000 kcal";


    document.getElementById(
      "protein-text"
    ).innerHTML =
      "0 / 50 g";


    document.getElementById(
      "carbs-text"
    ).innerHTML =
      "0 / 250 g";


    document.getElementById(
      "fat-text"
    ).innerHTML =
      "0 / 65 g";


    document.getElementById(
      "calories-bar"
    ).style.width =
      "0%";


    document.getElementById(
      "protein-bar"
    ).style.width =
      "0%";


    document.getElementById(
      "carbs-bar"
    ).style.width =
      "0%";


    document.getElementById(
      "fat-bar"
    ).style.width =
      "0%";


    document.getElementById(
      "clear-foodlog"
    ).style.display =
      "none";


    return;
  }


  for (let i = 0; i < foodLog.length; i++) {

    totalCalories +=
      foodLog[i].calories;

    totalProtein +=
      foodLog[i].protein;

    totalCarbs +=
      foodLog[i].carbs;

    totalFat +=
      foodLog[i].fat;


    cartona += `
      <div
        class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
      >

        <img
          src="${foodLog[i].image}"
          alt="${foodLog[i].name}"
          class="w-14 h-14 rounded-lg object-cover"
        />

        <div class="flex-1">

          <h4 class="font-semibold text-gray-900">
            ${foodLog[i].name}
          </h4>

          <div class="flex gap-3 text-xs text-gray-500 mt-1">

            <span>
              ${foodLog[i].calories} kcal
            </span>

            <span>
              ${foodLog[i].protein}g protein
            </span>

            <span>
              ${foodLog[i].carbs}g carbs
            </span>

            <span>
              ${foodLog[i].fat}g fat
            </span>

          </div>

        </div>

      </div>
    `;
  }


  document.getElementById(
    "logged-items-list"
  ).innerHTML =
    cartona;


  document.getElementById(
    "logged-items-count"
  ).innerHTML =
    "Logged Items (" +
    foodLog.length +
    ")";


  document.getElementById(
    "calories-text"
  ).innerHTML =
    totalCalories +
    " / 2000 kcal";


  document.getElementById(
    "protein-text"
  ).innerHTML =
    totalProtein +
    " / 50 g";


  document.getElementById(
    "carbs-text"
  ).innerHTML =
    totalCarbs +
    " / 250 g";


  document.getElementById(
    "fat-text"
  ).innerHTML =
    totalFat +
    " / 65 g";


  let caloriesPercent =
    (totalCalories / 2000) * 100;

  let proteinPercent =
    (totalProtein / 50) * 100;

  let carbsPercent =
    (totalCarbs / 250) * 100;

  let fatPercent =
    (totalFat / 65) * 100;


  if (caloriesPercent > 100) {
    caloriesPercent = 100;
  }

  if (proteinPercent > 100) {
    proteinPercent = 100;
  }

  if (carbsPercent > 100) {
    carbsPercent = 100;
  }

  if (fatPercent > 100) {
    fatPercent = 100;
  }


  document.getElementById(
    "calories-bar"
  ).style.width =
    caloriesPercent + "%";


  document.getElementById(
    "protein-bar"
  ).style.width =
    proteinPercent + "%";


  document.getElementById(
    "carbs-bar"
  ).style.width =
    carbsPercent + "%";


  document.getElementById(
    "fat-bar"
  ).style.width =
    fatPercent + "%";


  document.getElementById(
    "clear-foodlog"
  ).style.display =
    "block";
}


function setLogMealLoading() {

  let logMealBtn =
    document.getElementById(
      "log-meal-btn"
    );


  logMealBtn.disabled =
    true;


  logMealBtn.innerHTML = `
    <i class="fa-solid fa-spinner fa-spin"></i>
    <span>Calculating...</span>
  `;
}


function setLogMealReady() {

  let logMealBtn =
    document.getElementById(
      "log-meal-btn"
    );


  logMealBtn.disabled =
    false;


  logMealBtn.innerHTML = `
    <i class="fa-solid fa-clipboard-list"></i>
    <span>Log This Meal</span>
  `;
}


function showLogMealPopup() {

  console.log("Meal:", currentMeal);
  console.log("Nutrition:", currentNutrition);

  if (
    currentMeal == null ||
    currentNutrition == null
  ) {

    Swal.fire({
      icon: "error",
      title: "Nutrition not ready",
      text: "Please wait until the nutrition calculation is complete."
    });

    return;
  }

  let servings = 1;

  let nutrition =
    currentNutrition.data.perServing;


  Swal.fire({

    html: `
      <div class="text-left">

        <div class="flex items-center gap-4 mb-6">

          <img
            src="${currentMeal.strMealThumb}"
            class="w-20 h-20 rounded-xl object-cover"
          />

          <div>

            <h2 class="text-2xl font-bold text-gray-900">
              Log This Meal
            </h2>

            <p class="text-gray-500">
              ${currentMeal.strMeal}
            </p>

          </div>

        </div>


        <h3 class="font-semibold text-gray-700 mb-3">
          Number of Servings
        </h3>


        <div class="flex items-center gap-4 mb-6">

          <button
            id="decrease-servings"
            class="w-12 h-12 bg-gray-100 rounded-xl text-xl font-bold"
          >
            −
          </button>


          <div
            id="servings-number"
            class="w-24 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center text-xl font-bold"
          >
            1
          </div>


          <button
            id="increase-servings"
            class="w-12 h-12 bg-gray-100 rounded-xl text-xl font-bold"
          >
            +
          </button>

        </div>


        <div
          class="bg-emerald-50 rounded-2xl p-5"
        >

          <p class="text-gray-600 mb-4">
            Estimated nutrition per serving:
          </p>


          <div class="grid grid-cols-4 gap-4 text-center">

            <div>

              <p class="text-2xl font-bold text-emerald-600">
                ${nutrition.calories}
              </p>

              <p class="text-sm text-gray-500">
                Calories
              </p>

            </div>


            <div>

              <p class="text-2xl font-bold text-blue-600">
                ${nutrition.protein}g
              </p>

              <p class="text-sm text-gray-500">
                Protein
              </p>

            </div>


            <div>

              <p class="text-2xl font-bold text-orange-500">
                ${nutrition.carbs}g
              </p>

              <p class="text-sm text-gray-500">
                Carbs
              </p>

            </div>


            <div>

              <p class="text-2xl font-bold text-purple-600">
                ${nutrition.fat}g
              </p>

              <p class="text-sm text-gray-500">
                Fat
              </p>

            </div>

          </div>

        </div>

      </div>
    `,


    showCancelButton:
      true,


    confirmButtonText:
      "Log Meal",


    cancelButtonText:
      "Cancel",


    didOpen: function () {

      let increaseBtn =
        document.getElementById(
          "increase-servings"
        );


      let decreaseBtn =
        document.getElementById(
          "decrease-servings"
        );


      let servingsNumber =
        document.getElementById(
          "servings-number"
        );


      increaseBtn.addEventListener(
        "click",
        function () {

          servings++;


          servingsNumber.innerHTML =
            servings;

        }
      );


      decreaseBtn.addEventListener(
        "click",
        function () {

          if (servings > 1) {

            servings--;


            servingsNumber.innerHTML =
              servings;

          }

        }
      );

    }

  }).then(function (result) {

    if (result.isConfirmed) {

      saveMealToFoodLog(
        servings
      );

    }

  });
}


function saveMealToFoodLog(servings) {

  let foodLog = [];


  if (
    localStorage.getItem(
      "foodLog"
    ) != null
  ) {

    foodLog =
      JSON.parse(
        localStorage.getItem(
          "foodLog"
        )
      );

  }


  let nutrition =
    currentNutrition.data.perServing;


  let loggedMeal = {

    type:
      "meal",

    id:
      currentMeal.idMeal,

    name:
      currentMeal.strMeal,

    image:
      currentMeal.strMealThumb,

    servings:
      servings,

    calories:
      nutrition.calories *
      servings,

    protein:
      nutrition.protein *
      servings,

    carbs:
      nutrition.carbs *
      servings,

    fat:
      nutrition.fat *
      servings

  };


  foodLog.push(
    loggedMeal
  );


  localStorage.setItem(
    "foodLog",
    JSON.stringify(
      foodLog
    )
  );

  displayFoodLog();
}


let logMealBtn =
  document.getElementById("log-meal-btn");

logMealBtn.addEventListener(
  "click",
  function () {

    console.log("Log button clicked");

    showLogMealPopup();

  }
);

let clearFoodLogBtn =
  document.getElementById("clear-foodlog");


clearFoodLogBtn.addEventListener(
  "click",
  function () {

    localStorage.removeItem("foodLog");

    displayFoodLog();

  }
);

function displayTodayDate() {

  let today =
    new Date();


  let options = {
    weekday: "long",
    month: "short",
    day: "numeric"
  };


  let dateText =
    today.toLocaleDateString(
      "en-US",
      options
    );


  document.getElementById(
    "foodlog-date"
  ).innerHTML =
    dateText;
}

function displayMealVideo(meal) {
  let videoSection =
    document.getElementById("video-section");

  let mealVideo =
    document.getElementById("meal-video");

  mealVideo.src =
    meal.strMealThumb;

  videoSection.style.display =
    "block";
}

function displayProducts(products) {

  if (
    products == null ||
    products.length == 0
  ) {

    document.getElementById("products-grid").innerHTML = `
      <div class="text-center py-12">
        <i class="fa-solid fa-search text-gray-400 text-3xl mb-3"></i>

        <p class="text-gray-500">
          No products found
        </p>
      </div>
    `;

    document.getElementById("products-count").innerHTML =
      "0 products found";

    return;
  }


  let cartona = "";


  for (let i = 0; i < products.length; i++) {

    let nutrients =
      products[i].nutrients;


    cartona += `
      <div
        class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-barcode="${products[i].barcode}"
      >

        <div
          class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
        >

          <img
            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${products[i].image || ""}"
            alt="${products[i].name || "Product"}"
            loading="lazy"
          />


          <div
            class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
          >
            Nutri-Score ${products[i].nutritionGrade || "unknown"}
          </div>


          ${
            products[i].novaGroup
              ? `
                <div
                  class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                >
                  ${products[i].novaGroup}
                </div>
              `
              : ""
          }

        </div>


        <div class="p-4">

          <p
            class="text-xs text-emerald-600 font-semibold mb-1 truncate"
          >
            ${products[i].brand || "Unknown Brand"}
          </p>


          <h3
            class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
          >
            ${products[i].name || "Unknown Product"}
          </h3>


          <div
            class="flex items-center gap-3 text-xs text-gray-500 mb-3"
          >

            <span>
              <i class="fa-solid fa-fire mr-1"></i>
              ${Math.round(nutrients.calories || 0)} kcal/100g
            </span>

          </div>


          <div class="grid grid-cols-4 gap-1 text-center">

            <div class="bg-emerald-50 rounded p-1.5">

              <p class="text-xs font-bold text-emerald-700">
                ${(nutrients.protein || 0).toFixed(1)}g
              </p>

              <p class="text-[10px] text-gray-500">
                Protein
              </p>

            </div>


            <div class="bg-blue-50 rounded p-1.5">

              <p class="text-xs font-bold text-blue-700">
                ${(nutrients.carbs || 0).toFixed(1)}g
              </p>

              <p class="text-[10px] text-gray-500">
                Carbs
              </p>

            </div>


            <div class="bg-purple-50 rounded p-1.5">

              <p class="text-xs font-bold text-purple-700">
                ${(nutrients.fat || 0).toFixed(1)}g
              </p>

              <p class="text-[10px] text-gray-500">
                Fat
              </p>

            </div>


            <div class="bg-orange-50 rounded p-1.5">

              <p class="text-xs font-bold text-orange-700">
                ${(nutrients.sugar || 0).toFixed(1)}g
              </p>

              <p class="text-[10px] text-gray-500">
                Sugar
              </p>

            </div>

          </div>

        </div>

      </div>
    `;
  }


  document.getElementById("products-grid").innerHTML =
    cartona;


  document.getElementById("products-count").innerHTML =
    products.length + " products found";
}

let productSearchInput =
  document.getElementById(
    "product-search-input"
  );


let searchProductBtn =
  document.getElementById(
    "search-product-btn"
  );


searchProductBtn.addEventListener(
  "click",
  async function () {

    let query =
      productSearchInput.value.trim();


    if (query == "") {
      return;
    }


    showLoading();


    try {

      let products =
        await searchProducts(query);


      displayProducts(products);

      productSearchInput.value = "";

    } catch (error) {

      console.log(error);

    }


    hideLoading();

  }
);

let barcodeInput =
  document.getElementById("barcode-input");

let lookupBarcodeBtn =
  document.getElementById("lookup-barcode-btn");


lookupBarcodeBtn.addEventListener(
  "click",
  async function () {

    let barcode =
      barcodeInput.value.trim();


    if (barcode == "") {

      Swal.fire({
        icon: "warning",
        title: "Enter a barcode",
        text: "Please enter a barcode first"
      });

      return;
    }


    showLoading();


    try {

      let product =
        await getProductByBarcode(barcode);


      if (product == null) {

        Swal.fire({
          icon: "error",
          title: "Product not found",
          text: "No product was found with this barcode"
        });

      } else {

        barcodeInput.value = "";

        showProductPopup(product);

      }

    } catch (error) {

      console.log(error);


      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later"
      });

    }


    hideLoading();

  }
);