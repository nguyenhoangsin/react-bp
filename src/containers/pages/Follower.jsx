import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../../actions/';
import { MasterLayout } from '../../components/layouts';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../constants/Api';

class Follower extends Component {
  static props = {
    myFollowers: propsTypes.object,
  }

  static defaultProps = {
    myFollowers: [],
  }

  breadcrumb = [
    {
      name: 'メイン',
      link: '/',
      icon: 'ficon-prev'
    }
  ]

  render() {
    return (
      <MasterLayout breadcrumb={this.breadcrumb}>
        <section className="main-container detail-container">
          <h2 className="container-title pt0">マイフォロワー</h2>
          <div className="block-container follower-container">
            <div className="follower-content">
              <ul className="follower-list">
              {
                this.props.myFollowers.map((item, key) =>
                  <li className="item" key={key}>
                    <Link className="cursor-pointer" to={`/user/${item._id}`}>
                      <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/profile/${item.profile_pic})`}}></div>
                      <div className="content">
                        <h5 className="title">{item.fullname}</h5>
                        <div className="favourite">
                          <span className="ficon-heart"></span>
                          <span className="number">いいね!({item.count.count})</span>
                        </div>
                        <p className="text">最終更新日：2017/11/15</p>
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="block-container link-container">
            <Link to="/" className="button button-top"><span className="ficon ficon-up"></span> 店舗トップへ</Link>
            <Link to="/" className="button button-link-store"><span className="ficon ficon-home"></span> レビュアートップ</Link>
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

const mapStateToProps = state => ({
  myFollowers: state.users.myFollowers,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Follower);
