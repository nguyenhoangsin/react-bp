import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Rating from 'react-rating';
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../constants/Api';

class MyReviews extends Component {
  static props = {
    myReviews: propsTypes.array,
  }

  static defaultProps = {
    myReviews: []
  }

  render() {
    return (
      <div className="my-review-list">
        <ul className="list">
          {
            this.props.myReviews.map((item, key) =>
              <li className="item" key={key}>
                <div className="image"
                  style={{
                    backgroundImage: item.restaurantId.restaurant_photo &&
                      item.restaurantId.restaurant_photo.length ?
                      `url(${IMAGE_URL}/resPhoto/${item.restaurantId.restaurant_photo[0]})` : ''
                  }}>
                </div>
                <div className="content">
                  <h5 className="title">{item.restaurantId.restaurant_name}</h5>
                  <div className="row">
                    <Link className="text-link" to={`/free/${item._id}`}>
                      続き <span className="ficon-next"></span>
                    </Link>
                    <p className="address">
                      <span className="ficon-location"></span>
                      <span className="text">{item.restaurantId.restaurant_location}
                        <br/>{item.restaurantId.restaurant_address}</span>
                    </p>
                  </div>
                  <div className="row">
                    <div className="favourite">
                      <span className="ficon-heart"></span>
                      <span className="number">いいね!({item.like_review_count || 0})</span>
                    </div>
                    <div className="rating">
                      <span className="number">{parseFloat(item.rating).toFixed(1) || 0}</span>
                      <div className="star">
                        <div className="list-star">
                          <Rating
                            initialRate={parseFloat(item.rating) || 0}
                            full="ficon ficon-star-rating"
                            empty="ficon ficon-star-rating empty"
                            readonly={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
        </ul>
      </div>
    );
  }
}

export default MyReviews;

