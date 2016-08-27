import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="app">
            <div className="app-header mdl-color--red">
                <h2 className="mdl-typography--display-4">Taximetro</h2>
            </div>
            <form action="#" className="search-box">
                <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id="search-input"/>
                    <label className="mdl-textfield__label" htmlFor="search-input">Ingrese el número de placa...</label>
                </div>
            </form>

            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                Buscar
            </button>
        </div>
    );
  }
}

export default App;
