import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propsTypes from 'prop-types';
import classnames from 'classnames';
import Rating from 'react-rating';
import { IMAGE_URL } from '../../constants/Api';

class DetailReviewItem extends Component {
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
          data.user &&
          data.user.profilePicThum &&
          <Link to={`/user/${data.user.id}`}>
            <div className="image" style={{ backgroundImage: `url(${IMAGE_URL}/profile/thumbnail/${data.user.profilePicThum})` }}>
              <img src={`${IMAGE_URL}/profile/thumbnail/${data.user.profilePicThum}`} alt="" />
            </div>
          </Link>
        }
        <div className="content">
          <Link to={`/user/${data.user.id}`}>
          <p className="date">{data.cDate}</p>
          <h5 className="title">{data.title}</h5>
          <div className="rating">
            <span className="number">{data.rating}</span>
            <div className="star">
              <div className="list-star">
                <Rating
                  initialRate={parseFloat(data.rating)}
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
            本文を読む <span className="ficon-next"></span>
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

export default DetailReviewItem;
