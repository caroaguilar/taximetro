import React, { Component } from 'react';
import _ from 'underscore';
import Review from './Review';

import './styles/reviews.css';

class ReviewsCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            reviews: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.setState({ reviews: this.props.reviews});
    }

    render() {
        return (
            <div className="review-card mdl-cell mdl-cell--8-col mdl-cell--12-col-table mdl-cell--12-col-phone mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">Reviews</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    {_.isEmpty(this.props.reviews) &&
                        <h2 className="mdl-typography--headline">
                            El taxista aún no posee reviews.
                            Sé el primero en calificarlo!
                        </h2>
                    }
                    {_.map(this.props.reviews, function(r) {
                        return <Review key={r.idreview} review={r}/>;
                    })}
                </div>
            </div>
        );
    }
}

export default ReviewsCard;
