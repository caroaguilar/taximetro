import React, { Component } from 'react';
import StarRating from 'react-star-rating-component';
import _ from 'underscore';

import api from './api/index';
import './styles/reviews.css';

class WriteReview extends Component {
    render() {
        return (
            <div className="">
                <textarea className="mdl-textfield__input"
                    name="reviewContent" rows={5}>
                    Que te pareció el servicio ofrecido?
                </textarea>
                <h2 className="mdl-typography--headline">Calificación:</h2>
                <StarRating name={"rating"}
                    value={0}/>

                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Calificar
                </button>
            </div>
        );
    }
}

export default WriteReview;
