import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Rating from 'react-rating';
import classnames from 'classnames';
import { IMAGE_URL } from '../../constants/Api';
import { Link } from 'react-router-dom';

class UserReviewItem extends Component {
  static props = {
    data: propsTypes.object.isRequired,
  }

  static defaultProps = {
    data: {}
  }

  state = {
    isShowComment: false
  }

  handleShowComment = (e) => {
    e.preventDefault();

    this.setState(preState => ({
      isShowComment: !preState.isShowComment
    }));
  }

  render() {
    const { data } = this.props;

    return (
      <li className="item">
        {
          data.restaurantId &&
          data.restaurantId.restaurantPhoto &&
          data.restaurantId.restaurantPhoto.length > 0 &&
          <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/resPhoto/${data.restaurantId.restaurantPhoto[0]}`}}>
            <img src={`${IMAGE_URL}/resPhoto/${data.restaurantId.restaurantPhoto[0]}`} alt="" />
          </div>
        }
        <div className="content">
          <h5 className="title">{data.restaurantId.restaurantName}</h5>
          <p className="address">{data.restaurantId.restaurantAddress}</p>
          <div className="row">
            <Link to={data.restaurantId && data.restaurantId.isPremium ? `/premium/${data.restaurantId.id}` : `/free/${data.restaurantId.id}`} className="text-link">本文を読む <span className="ficon-next"></span></Link>
            <p className="txt-title">{data.title}</p>
          </div>
          <div className="row">
            <div className="favourite">
              <span className={classnames('ficon', {
                'ficon-heart': !data.restaurantId.isLikeResT,
                'ficon-vheart': data.restaurantId.isLikeResT
              })}></span>
              <span className="number">いいね!({data.likeReviewCount})</span>
            </div>
            <div className="rating">
              <span className="number">{data.rating || 0}</span>
              <div className="star">
                <div className="list-star">
                  <Rating
                    initialRate={parseFloat(data.rating) || 0}
                    full="ficon ficon-star-rating"
                    empty="ficon ficon-star-rating empty"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default UserReviewItem;

