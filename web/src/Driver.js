import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Modal from 'react-skylight';
import cookie from 'react-cookie';

import DriverCard from './DriverCard';
import ReviewsCard from './ReviewsCard';
import WriteReview from './WriteReview';

import api from './api/index';
import './styles/driver.css';


class Driver extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
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
        this._findTaxi();
    }

    render() {
        return (
            <div className="main-wrapper">
                <header className="mdl-color--red-800 mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <div className="mdl-layout-spacer"></div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="fixed-header-drawer-exp">
                                <i className="material-icons">search</i>
                            </label>
                            <div className="mdl-textfield__expandable-holder">
                                <input className="mdl-textfield__input" type="text"
                                    name="sample" id="fixed-header-drawer-exp"/>
                            </div>
                        </div>
                    </div>
                </header>
                {(() => {
                    if (this.state.isLoading) {
                        return (<div
                            className="mdl-progress mdl-js-progress mdl-progress__indeterminate"/>);
                    } else {
                        return (
                            <div className="mdl-color--grey-100 mdl-grid">
                                <DriverCard {...this.state}
                                cardOnClick={() => {
                                    if (cookie.load('user')) {
                                        this.refs.reviewsDialog.show();
                                    } else {
                                        this.refs.loginDialog.show();
                                    }
                                }}/>
                                <ReviewsCard reviews={this.state.reviews}/>
                            </div>
                        );
                    }
                })()}
                <Modal ref="reviewsDialog"
                      title={ `Califica el servicio del taxi ${this.state.plate}`}>
                      <WriteReview plate={this.state.plate}
                        onReviewSubmitted={() => {
                            this.refs.reviewsDialog.hide();
                            this.setState({ updated: true });
                            this._findTaxi();
                        }}/>
                </Modal >
                <Modal ref="loginDialog">
                    <FacebookLogin
                        appId="119358528516179"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    />
                </Modal >
            </div>
        );
    }

    _findTaxi() {
        var self = this;
        api.findTaxi(this.props.params.licensePlate, function(driver) {
            self.setState(Object.assign(driver, { isLoading: false }))
            console.log(JSON.stringify(self.state, 0, 2))
        });
    }

    responseFacebook = (user) => {
        cookie.save('user', user);
        this.refs.loginDialog.hide();
        this.refs.reviewsDialog.show();
    };
}

export default Driver;
