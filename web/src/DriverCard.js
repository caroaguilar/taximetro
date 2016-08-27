import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';

import api from './api/index';
import './styles/driver.css';

import profileImage from './images/profile-image.svg'

class DriverCard extends Component {
    render() {
        return (
            <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <div className="mdl-cell mdl-cell--3-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                        <img src={profileImage} className="profile-image" alt=""/>
                    </div>
                    <div className="mdl-cell mdl-cell--3-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                        <h2 className="mdl-typography--display-1">{this.props.plate}</h2>
                    </div>
                </div>
                <div className="mdl-card__supporting-text">
                    <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                        <h2 className="mdl-typography--display-1">{
                            this.props.name + ' ' + this.props.lastname1 + ' ' + this.props.lastname2
                        }</h2>
                    </div>
                    <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                        <h2 className="mdl-typography--headline">{`Cédula: ${this.props.idnum}`}</h2>
                    </div>
                    <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                        <h2 className="mdl-typography--headline">{`Base de Operaciones: ${this.props.base}`}</h2>
                    </div>
                    <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                        <h2 className="mdl-typography--headline">{`Vehículo: ${this.props.service}`}</h2>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                        <button
                        onClick={this.props.cardOnClick}
                        className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                      Calificar taxista
                    </button>
                </div>
                <div className="mdl-card__menu">
                    {this.props.stars && <StarRating name={"rating"}
                        value={this.props.stars} editing={false}/>}
                </div>
            </div>
        );
    }
}

export default DriverCard;
