import React from 'react';
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-social-list">
            <ul className="social-list">
              <li className="item">
                <Link to="/">
                  <span className="ficon ficon-facebook"></span>
                </Link>
              </li>
              <li className="item">
                <Link to="/">
                  <span className="ficon ficon-google-plus"></span>
                </Link>
              </li>
              <li className="item">
                <Link to="/">
                  <span className="ficon ficon-youtube"></span>
                </Link>
              </li>
              <li className="item">
                <Link to="/">
                  <span className="ficon ficon-twitter"></span>
                </Link>
              </li>
            </ul>
            <div className="subscribe-container">
              <div className="subscribe-form">
                <form>
                  <div className="input">
                    <input type="text" className="input-control" placeholder="ニュースレターフィードを購読する" />
                  </div>
                  <button className="button button-subscribe">
                    <span className="ficon-send-message-button"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p className="text">Copyright&copy;Tabelog, Inc.無断複写・転載を禁じます。</p>
          </div>
        </div>
        <div className="clearfix"></div>
      </footer>
    );
  }
}

export default Footer;
