import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';

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
                    onClick={(e)=> { this.setState({reviewContent: e.target.value })}}
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
        api.submitReview({
            plate: this.props.plate,
            review: {
                'rating': this.state.stars,
                'content': this.state.reviewContent,
                'fbid': 100009410315274,
                'fbname': 'Carlos Jenkins'
            }
        }, function(err, result) {
            console.log('####error: ', err)
            console.log('####result: ', result)
        });
    }
}

export default WriteReview;
