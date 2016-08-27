import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';

import api from './api/index';
import './styles/driver.css';

import profileImage from './images/profile-image.svg'

class Driver extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            stars: 0,
            lastname1: '',
            base: '',
            name: '',
            idnum: '',
            plate: '',
            reviews: [],
            lastname2: '',
            service: ''
        }
    }

    componentDidMount() {
        var self = this;
        api.findTaxi(this.props.params.licensePlate, function(driver) {
            self.setState(driver)
            console.log(JSON.stringify(self.state, 0, 2))
        });
    }

    render() {
        var stars = this.state.stars;
        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <img src={profileImage} className="profile-image" alt=""/>
                        </div>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--display-2">{
                                this.state.name + ' ' + this.state.lastname1 + ' ' + this.state.lastname2
                            }</h2>
                        </div>
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--headline">{`Cédula: ${this.state.idnum}`}</h2>
                        </div>
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--headline">{`Base de Operaciones: ${this.state.base}`}</h2>
                        </div>
                        <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--12-col-phone">
                            <h2 className="mdl-typography--headline">{`Vehículo: ${this.state.service}`}</h2>
                        </div>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                          Write Review
                        </a>
                    </div>
                    <div className="mdl-card__menu">
                        {stars && <StarRating name={"rating"} value={stars} editing={false}/>}
                        <h2 className="mdl-card__title-text">{this.props.params.plate}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Driver;
