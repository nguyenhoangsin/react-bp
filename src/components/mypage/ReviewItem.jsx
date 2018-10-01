import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { IMAGE_URL } from '../../constants/Api';

class ReviewItem extends Component {
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
          <Link to={data.restaurantId.isPremium ? `/premium/${data.restaurantId.id}` : `/free/${data.restaurantId.id}`}>
            <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/resPhoto/${data.restaurantId.restaurantPhoto[0]}`}}>
              <img src={`${IMAGE_URL}/resPhoto/${data.restaurantId.restaurantPhoto[0]}`} alt="" />
            </div>
          </Link>
        }
        <div className="content">
        <Link to={data.restaurantId.isPremium ? `/premium/${data.restaurantId.id}` : `/free/${data.restaurantId.id}`}>
          <h5 className="title">{data.restaurantId.restaurantName}</h5>
          <p className="address">場所 {data.restaurantId.subArea}</p>
          <p className="txt-title">{data.title}</p>
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
        </Link>
          <a
            href="#/"
            className="text-link"
            onClick={this.handleShowComment}
            style={{ display: !this.state.isShowComment ? 'block' : 'none' }}
          >
            もっと見る
            <span className="ficon-next"></span>
          </a>
          <div className="favourite">
            <span className={classnames('ficon', {
              'ficon-heart': !data.restaurantId.isLikeResT,
              'ficon-vheart': data.restaurantId.isLikeResT
            })}></span>
            <span className="number">いいね!({data.likeReviewCount})</span>
          </div>
          <div className="row comment-text" style={{ display: this.state.isShowComment ? 'block' : 'none' }}>
            <p className="text">{data.comment}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default ReviewItem;

