import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/driver.css';

import profileImage from './images/profile-image.svg'

class Driver extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            id: '',
            central: '',
            vehicle: ''
        }
    }

    render() {
        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--2-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                    <img src={profileImage} className="profile-image"/>
                </div>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                    <h2 className="">{this.props.params.licensePlate}</h2>
                    <h2 className="">{this.state.name}</h2>
                </div>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                    <h2 className="">{`Cédula: ${this.state.id}`}</h2>
                </div>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                    <h2 className="">{`Base de Operaciones: ${this.state.central}`}</h2>
                </div>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                    <h2 className="">{`Vehículo: ${this.state.vehicle}`}</h2>
                </div>
            </div>
        );
    }
}

export default Driver;
