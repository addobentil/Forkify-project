import icon from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data){
        if (!data || (Array.isArray(data) && data.length === 0))
        return this.renderError();

        this._data = data;
        this._clear();
        const markUp = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp)
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    // Spinner function
    renderSpinner = function(){
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icon}#icon-loader"></use>
            </svg>
          </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  renderError(message = this._errorMessage){
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}