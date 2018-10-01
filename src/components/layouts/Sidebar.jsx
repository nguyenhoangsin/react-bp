import React from 'react';
import { Link } from 'react-router-dom'

class Siderbar extends React.Component {
  render() {
    return (
      <div className="navigation-content">
        <ul className="search-actions-list">
          <li className="item">
            <Link to="/">
              <span className="ficon-first ficon-location"></span>地域リストの検索
              <span className="ficon-next"></span>
            </Link>
          </li>
          <li className="item">
            <Link to="/">
              <span className="ficon-first ficon-public-transport-subway"></span>駅から検索する
              <span className="ficon-next"></span>
            </Link>
          </li>
          <li className="item">
            <Link to="/">
              <span className="ficon-first ficon-location"></span>ジャンルリストから検索する
              <span className="ficon-next"></span>
            </Link>
          </li>
        </ul>
        <ul className="link-list">
          <li className="item">
            <Link to="/">ホームページ</Link>
          </li>
          <li className="item">
            <Link to="/">私たちに関しては</Link>
          </li>
          <li className="item">
            <Link to="/">ホステスバーとは何ですか？</Link>
          </li>
          <li className="item">
            <Link to="/">コンテンツガイドライン</Link>
          </li>
          <li className="item">
            <Link to="/">個人情報保護方針</Link>
          </li>
          <li className="item">
            <Link to="/">発表</Link>
          </li>
          <li className="item">
            <Link to="/">お問い合わせ</Link>
          </li>
          <li className="item">
            <Link to="/">コンテンツガイドライン</Link>
          </li>
          <li className="item">
            <Link to="/">個人情報保護方針</Link>
          </li>
          <li className="item">
            <Link to="/">発表</Link>
          </li>
          <li className="item">
            <Link to="/">お問い合わせ</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Siderbar;
