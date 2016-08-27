import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';

import api from './api/index';
import './styles/driver.css';

import profileImage from './images/profile-image.svg'

class ReviewsCard extends Component {
    render() {
        console.log(this.props.reviews)
        return (
            <div className="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">

            </div>
        );
    }
}

export default ReviewsCard;
