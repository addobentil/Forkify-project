import 'core-js/stable';
import 'regenerator-runtime/runtime'
import * as model from './model.js'
import  recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';


// https://forkify-api.herokuapp.com/v2

if (module.hot){
  module.hot.accept();
}

const controlRecipes = async function(){
  try{

    // Get Recipe id
    const id = window.location.hash.slice(1);

    // Guard clause
    if (!id) return;

    // Render spinner
    recipeView.renderSpinner();
    
    // Fetch recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
 
  }catch(err){
    recipeView.renderError(`${err} 💥💥💥💥💥`);
  }
  
};

const controlSearchResults = async function(){
  try {

    // render spinner
    resultsView.renderSpinner();

    // Get search query
    const query = searchView._getQuery();
    if (!query) return;

    // Load search query
    await model.loadSearchResults(query);

    // Render recipe results
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
    
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function(gotoPage){
  console.log('Page Dispatched');

  // Render NEW recipe results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};


// Subscriber - Publisher design Pattern
const init = function(){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
};
init();



// showRecipe();


// ["hashchange","load"].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)