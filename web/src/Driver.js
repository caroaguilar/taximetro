import React, { Component } from 'react';
import { Link } from 'react-router';
import StarRating from 'react-star-rating-component';
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
                <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <img src={profileImage} className="profile-image"/>
                        </div>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--display-2">{this.state.name}</h2>
                        </div>
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--headline">{`Cédula: ${this.state.id}`}</h2>
                        </div>
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--headline">{`Base de Operaciones: ${this.state.central}`}</h2>
                        </div>
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--headline">{`Vehículo: ${this.state.vehicle}`}</h2>
                        </div>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                          Write Review
                        </a>
                    </div>
                    <div className="mdl-card__menu">
                        <StarRating name={"rating"} value={3} editing={false}/>
                        <h2 className="mdl-card__title-text">{this.props.params.licensePlate}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Driver;
