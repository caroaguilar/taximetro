import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';
import DriverCard from './DriverCard';
import ReviewsCard from './ReviewsCard';
import Modal from 'react-skylight';

import api from './api/index';
import './styles/driver.css';

import profileImage from './images/profile-image.svg'

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
        var self = this;
        api.findTaxi(this.props.params.licensePlate, function(driver) {
            self.setState(Object.assign(driver, { isLoading: false }))
            console.log(JSON.stringify(self.state, 0, 2))
        });
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
                                cardOnClick={() => { console.log('holis!!!!');this.refs.reviewsDialog.show()}}/>
                                <ReviewsCard reviews={this.state.reviews}/>
                            </div>
                        );
                    }
                })()}
                <Modal ref="reviewsDialog"
                      title={ `Califica a ${this.state.name}`}>
                        I have callbacks!
                </Modal >
            </div>
        );
    }
}

export default Driver;
