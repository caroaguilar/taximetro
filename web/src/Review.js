import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';
import _ from 'underscore';

import './styles/reviews.css';

import profileImage from './images/profile-image.svg'

class ReviewsCard extends Component {
    render() {
        var review = this.props.review;
        return (
            <div className="review-row mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                <h3 className="review-name mdl-typography--headline">{review.fbname}</h3>
                <p>{review.content}</p>
                <span>{`Likes: ${review.likes}`}</span>
            </div>
        );
    }
}

export default ReviewsCard;
