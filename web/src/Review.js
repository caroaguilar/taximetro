import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';
import _ from 'underscore';

import './styles/reviews.css';

import profileImage from './images/profile-image.svg'

class ReviewsCard extends Component {
    render() {
        console.log(this.props.review)
        return (
            <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">

            </div>
        );
    }
}

export default ReviewsCard;
