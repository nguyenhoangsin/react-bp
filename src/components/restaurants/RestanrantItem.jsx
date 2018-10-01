import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

class RestanrantItem extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  render() {
    const { data } = this.props;

    return (
      <li className="item">
        <div className="image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}${data.restaurant_photo}`}}>
          <img src={`${process.env.PUBLIC_URL}${data.restaurant_photo}`} alt="" />
        </div>
        <div className="content">
          <h5 className="title">Yamato Honda Shushi</h5>
          <p className="address">場所 200m2</p>
          <p className="txt-title">レビュータイトル</p>
          <div className="rating">
            <span className="number">{parseFloat(data.avgRating).toFixed(1) || 0}</span>
            <div className="star">
              <div className="list-star">
                <Rating
                  initialRate={parseFloat(data.avgRating) || 0}
                  full="ficon ficon-star-rating"
                  empty="ficon ficon-star-rating empty"
                />
              </div>
            </div>
          </div>
          <a href="#" className="text-link">本文を読む <span className="ficon-next"></span></a>
          <div className="favourite">
            <span className="ficon-heart"></span>
            <span className="number">いいね!(2)</span>
          </div>
        </div>
      </li>
    );
  }
}

export default RestanrantItem;
