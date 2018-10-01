import React, { Component } from 'react';
import propsTypes from 'prop-types';
import ReviewItem from './ReviewItem';

class DetailReview extends Component {
  static props = {
    reviews: propsTypes.array,
  }

  static defaultProps = {
    reviews: []
  }

  render() {
    return (
      <ul className="review-list">
        {
          this.props.reviews.map((item, k) => <ReviewItem data={item} key={k} />)
        }
      </ul>
    );
  }
}

export default DetailReview;

