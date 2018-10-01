import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/image-logo.png';

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    isPremiumPage: PropTypes.bool,
    isDetailPage: PropTypes.bool
  }

  static defaultProps = {
    user: {},
    isPremiumPage: false,
    isDetailPage: false
  }

  render() {
    return (
      <header className={classnames('header-container', {
        'fix-header-height': this.props.isPremiumPage,
        '@@otherClass': this.props.isDetailPage
      })}>
        <div className="header-content">
          <div className="button-group">
            <button className={classnames({
              'button-open-menu': !this.props.isOpenMenu,
              'button-close-menu': this.props.isOpenMenu
            })} onClick={this.props.onToggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>

          <div className="logo">
            <h1>
              <Link to="/">
                <img src={Logo} alt="Hotess Bar" />
              </Link>
            </h1>
          </div>

          <div className="user-login">
            <Link to={this.props.user.id ? `/mypage` : '/login'} className="txt-link">
              <span className="ficon ficon-male-user-shadow"></span>
              <span className="text">{this.props.user.fullname || 'ログイン'}</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
