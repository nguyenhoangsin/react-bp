import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PremiumBar extends Component {
  static props = {
    item: propsTypes.object.isRequired,
  }

  static defaultProps = {
    item: {}
  }

  render() {
    const { item } = this.props;

    return (
      <ul className="category-list">
        <li className="item">
          <Link to={`/premium/${item.id}/cast`}>
            <div className="category-item">
              <span className="ficon ficon-female-user"></span>
              <span className="title">キャスト一覧</span>
            </div>
          </Link>
        </li>
        <li className="item">
          <div className="category-item">
            <span className="ficon ficon-photo-camera"></span>
            <span className="title">写真</span>
          </div>
        </li>
        <li className="item">
          <Link to={`/premium/${item.id}/reviews`}>
            <div className="category-item">
              <span className="ficon ficon-comment-black-oval-bubble-shape"></span>
              <span className="title">レビュー</span>
            </div>
          </Link>
        </li>
        <li className="item">
          <a href="#map">
            <div className="category-item">
              <span className="ficon ficon-location"></span>
              <span className="title">地図</span>
            </div>
          </a>
        </li>
        <li className="item">
          <div className="category-item">
            <span className="ficon ficon-culinary"></span>
            <span className="title">お店情報</span>
          </div>
        </li>
        <li className="item">
          <div className="category-item">
            <span className="ficon ficon-user-group"></span>
            <span className="title">求人募集</span>
          </div>
        </li>
      </ul>
    );
  }
}

export default PremiumBar;

