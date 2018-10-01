import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';
import classnames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';

class MasterLayout extends Component {
  static propTypes = {
    breadcrumb: PropTypes.array,
    isPremiumPage: PropTypes.bool,
    isDetailPage: PropTypes.bool
  }

  static defaultProps = {
    breadcrumb: [],
    isPremiumPage: false,
    isDetailPage: false,
  }

  state = {
    isOpenMenu: false
  }

  handleTogleMenu = (e) => {
    if (!this.state.isOpenMenu) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    this.setState({
      isOpenMenu: !this.state.isOpenMenu
    });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));

    return (
      <div>
        <div id="main-navigation" className={classnames('main-navigation', {
          'is-opened': this.state.isOpenMenu
        })}>
          <div className="navigation-top">
            <button className={classnames({
              'button-open-menu': !this.state.isOpenMenu,
              'button-close-menu': this.state.isOpenMenu
            })} onClick={this.handleTogleMenu}>
              <span className="ficon-close"></span>閉じる
            </button>
          </div>
          <Sidebar className={classnames({'is-opened': this.state.isOpenMenu})}/>
        </div>
        <div className="wrapper">
          <Header
            user={this.props.auth.user}
            isPremiumPage={this.props.isPremiumPage}
            isDetailPage={this.props.isDetailPage}
            onToggleMenu={this.handleTogleMenu}
            isOpenMenu={this.state.isOpenMenu}
          />
          {
            this.props.breadcrumb &&
            this.props.breadcrumb.length > 0 &&
            <Breadcrumb data={this.props.breadcrumb}/>
          }
          {childrenWithProps}
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: {
    ...state.auth,
    user: state.entities.users[state.auth.user]
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MasterLayout));
