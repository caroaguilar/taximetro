import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';
import cookie from 'react-cookie';

import api from './api/index';
import './styles/reviews.css';

class WriteReview extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            reviewContent: '',
            stars: 0
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="">
                <textarea className="mdl-textfield__input"
                    defaultValue={this.state.reviewContent}
                    placeholder={"Que te pareció el servicio ofrecido?"}
                    onChange={(e)=> { this.setState({reviewContent: e.target.value })}}
                    name="reviewContent" rows={5}/>
                <h2 className="mdl-typography--headline">Calificación:</h2>
                <StarRating name={"rating"}
                    onStarClick={(val)=> { this.setState({ stars: val })}}
                    value={this.state.stars}/>

                <button
                    onClick={() => { this._submitReview() }}
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Calificar
                </button>
            </div>
        );
    }
    _submitReview() {
        var self = this;
        var user = cookie.load('user');

        if (this.state.reviewContent && this.state.stars) {
            api.submitReview({
                plate: this.props.plate,
                review: {
                    'rating': this.state.stars,
                    'content': this.state.reviewContent,
                    'fbid': user.id,
                    'fbname': user.name
                }
            }, function(err, res) {
                if (!err) {
                    self.props.onReviewSubmitted();
                }
            });
        }
    }
}

export default WriteReview;
