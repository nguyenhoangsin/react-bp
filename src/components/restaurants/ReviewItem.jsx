import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Rating from 'react-rating';
import { IMAGE_URL } from '../../constants/Api';
import { Link } from 'react-router-dom';

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
      <Link to={`/user/${data.user.id}`}>
        <li className="item">
          {
            false &&
            data.user &&
            data.user.profilePicThum &&
            <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/profile/thumbnail/${data.user.profilePicThum})`}}>
              {/* <img src={`${IMAGE_URL}/profile/thumbnail/${data.user.profilePicThum}`} alt="" /> */}
            </div>
          }
          <div className="content">
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
            <p className="text">by {data.name}</p>
            <div className="row">
              <a
                href="#/"
                className="text-link"
                onClick={this.handleShowComment}
                style={{ display: !this.state.isShowComment ? 'block' : 'none' }}
              >
                もっと見る
                <span className="ficon-next"></span>
              </a>
              <p className="date">{data.cDate}</p>
            </div>
            <div className="row comment-text" style={{ display: this.state.isShowComment ? 'block' : 'none' }}>
              <p className="text">{data.comment}</p>
            </div>
          </div>
        </li>
      </Link>
    );
  }
}

export default ReviewItem;

