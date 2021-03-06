import React, { Component } from 'react';
import { Link } from 'react-router';

import './styles/app.css';

import logoImage from './images/logo.svg'

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            licensePlate: ''
        }
    }

    render() {
        return (
            <div className="app">
                <div className="app-header mdl-color--red-800">
                    <img src={logoImage} className="logo-image" alt=""/>
                    <h2 className="mdl-typography--display-4">Taximetro</h2>
                </div>
                <form action="#">
                    <div className="search-box mdl-textfield mdl-js-textfield">
                        <input className="mdl-textfield__input"
                            type="text" id="search-input"
                            placeholder="Ingrese el número de placa... Ej. TSJ00001"
                            value={this.state.licensePlate}
                            onChange={(e) => {this._handleSearchValueChange(e)}}/>
                    </div>
                </form>

                <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-color--green"
                    to={`/plate/${this.state.licensePlate}`}>
                    Buscar
                </Link>
            </div>
        );
    }

    _handleSearchValueChange(e) {
            this.setState({ licensePlate: e.target.value });
    }
}

export default App;
