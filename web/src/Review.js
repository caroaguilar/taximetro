import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';

import api from './api/index';

import './styles/reviews.css';

class ReviewsCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { likeLabel: 'Likes' };
    }
    render() {
        var review = this.props.review;

        return (
            <div className="review-row mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                <a className="review-name mdl-typography--headline "
                    href={`https://www.facebook.com/profile.php?id=${review.fbid}`}>
                    <img className="review-user-image" alt="" src={`http://graph.facebook.com/${review.fbid}/picture?type=square`}/>
                    {review.fbname}
                </a>
                <StarRating className="user-review-stars" name={"rating"} value={review.rating} editing={false}/>
                <p>{review.content}</p>
                <button className="mdl-button mdl-js-button mdl-button--primary"
                        onClick={() => { this._likeReview(review) }}>
                    {`${this.state.likeLabel}: ${review.likes}`}
                </button>
            </div>
        );
    }

    _likeReview(review) {
        var self = this;
        if (this.state.likeLabel === 'Likes') {
            api.addLike({idReview: review.idreview}, function(err, res) {
                self.props.onLikeSubmitted();
                self.setState({
                    likeLabel: 'Liked'
                });
            });
        }
    }
}


export default ReviewsCard;
