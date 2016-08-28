import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';

import './styles/reviews.css';

class ReviewsCard extends Component {
    render() {
        var review = this.props.review;
        return (
            <div className="review-row mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                <a className="review-name mdl-typography--headline "
                    href={`https://www.facebook.com/profile.php?id=${review.fbid}`}>
                    <img className="review-user-image" src={`http://graph.facebook.com/${review.fbid}/picture?type=square`}/>
                    {review.fbname}
                </a>
                <StarRating name={"rating"} value={review.rating} editing={false}/>
                <p>{review.content}</p>
                <span>{`Likes: ${review.likes}`}</span>
            </div>
        );
    }
}


export default ReviewsCard;
