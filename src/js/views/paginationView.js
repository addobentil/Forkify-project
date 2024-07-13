import View from "./View";
import icon from 'url:../../img/icons.svg';

class paginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');

            if (!btn) return;

            console.log(btn);
            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        })
    }

    _generateMarkup(){
        const currPage = this._data.page; 
        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        console.log(numOfPages);

        // If we're in page 1 and there are other pages
        if (currPage === 1 && numOfPages > 1){
            // const btnNext = function(){
                return `
                <button data-goto='${currPage + 1}' class="btn--inline pagination__btn--next">
                <svg class="search__icon">
                <use href="${icon}#icon-arrow-right"></use>
                </svg>
                <span>${currPage + 1}</span>
              </button>
                `;
        // } 
        // return btnNext;
        }

        // Last Page
        if (currPage === numOfPages){
            // const btnPrev = function(){
            return `
            <button data-goto='${currPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
          </button>
            `;
        // } 
        // return btnPrev;
        }

        // Other Page
        if (currPage < numOfPages){
            // const btnPrev_Next = function(){
                return `
                <button data-goto='${currPage - 1}' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>${currPage - 1}</span>
          </button>

          <button data-goto='${currPage + 1}' class="btn--inline pagination__btn--next">
          <svg class="search__icon">
          <use href="${icon}#icon-arrow-right"></use>
          </svg>
          <span>${currPage + 1}</span>
        </button>
                `;
            // } 
            // return btnPrev_Next;
        }

        // If we're in page 1 and there are no other pages
        return ``;
    }
}

export default new paginationView();