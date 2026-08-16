const BASE_URL =
  "https://www.themealdb.com/api/json/v1/1/";

const NUTRIPLAN_BASE_URL =
  "https://nutriplan-api.vercel.app/api/";


async function getCategories() {
  let response =
    await fetch(
      BASE_URL + "categories.php"
    );

  let data =
    await response.json();

  return data.categories;
}


async function searchMeals(query) {
  let response =
    await fetch(
      BASE_URL +
      "search.php?s=" +
      query
    );

  let data =
    await response.json();

  return data.meals;
}


async function getMealsByCategory(category) {
  let response =
    await fetch(
      BASE_URL +
      "filter.php?c=" +
      category
    );

  let data =
    await response.json();

  return data.meals;
}


async function getMealById(id) {
  let response =
    await fetch(
      BASE_URL +
      "lookup.php?i=" +
      id
    );

  let data =
    await response.json();

  return data.meals[0];
}


async function getMealsByArea(area) {
  let response =
    await fetch(
      BASE_URL +
      "filter.php?a=" +
      area
    );

  let data =
    await response.json();

  return data.meals;
}


async function analyzeMealNutrition(
  recipeName,
  ingredients
) {
  let response =
    await fetch(
      NUTRIPLAN_BASE_URL +
      "nutrition/analyze",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "x-api-key":
            "p8ggBGaHtkGYSnydt5yESoCKhtpaZEEPgTOSOhyv"
        },

        body: JSON.stringify({
          recipeName:
            recipeName,

          ingredients:
            ingredients
        })
      }
    );


  let data =
    await response.json();


  return data;
}


async function searchProducts(query) {
  let response =
    await fetch(
      NUTRIPLAN_BASE_URL +
      "products/search?q=" +
      query +
      "&page=1&limit=24"
    );


  let data =
    await response.json();


  return data.results;
}


async function getProductByBarcode(barcode) {

  let response =
    await fetch(
      NUTRIPLAN_BASE_URL +
      "products/barcode/" +
      barcode
    );


  let data =
    await response.json();


  return data.result;
}