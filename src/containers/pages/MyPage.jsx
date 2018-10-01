import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { MasterLayout } from '../../components/layouts';
import * as Actions from '../../actions/';
import { IMAGE_URL } from '../../constants/Api';

import { MyReviews, MyFollowers } from '../../components/mypage';

class MyPage extends Component {
  static props = {
    myProfile: propsTypes.object,
    myReviews: propsTypes.object,
    myFollowers: propsTypes.object,
  }

  static defaultProps = {
    myProfile: {},
    myReviews: [],
    myFollowers: [],
  }

  componentDidMount = () => {
    this.props.actions.getMyProfile(this.props.auth.user);
    this.props.actions.getMyReviews(this.props.auth.user);
    this.props.actions.getMyFollowers(this.props.auth.user);
  }

  render() {
    return (
      <MasterLayout>
        <section className="main-container personal-container">
          <div className="personal-banner-container">
            <div className="image"
              style={{
                backgroundImage: this.props.myProfile.coverimage ?
                  `url(${IMAGE_URL}/cover/${this.props.myProfile.coverimage})` : ''
              }}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/image-user-banner.jpg`} alt="" />
            </div>
            <div className="file-upload-form">
              <input type="file" className="input-file" />
              <span className="ficon-photo-camera"></span> 編集
            </div>
          </div>
          <div className="wrap-user-info">
            <div className="personal-avatar">
              <div className="image-avatar"
                style={{
                  backgroundImage: this.props.myProfile.profile_pic ?
                    `url(${IMAGE_URL}/profile/${this.props.myProfile.profile_pic})` : ''
                }}
              >
                <img src={`${process.env.PUBLIC_URL}/assets/images/image-follower-1.jpg`} alt="" />
              </div>
              <div className="upload-avatar">
                <div className="file-upload-form">
                  <input type="file" className="input-file" />
                  <span className="ficon-photo-camera"></span> 編集
                </div>
              </div>
            </div>
            <div className="username">
              <a href="#" className="button-edit">編集 <span className="ficon-next"></span></a>
              <p className="text">{this.props.myProfile.fullname}</p>
            </div>
          </div>
          <div className="block-container tab-user">
            <ul className="list">
              <li className="item active"><a href="#" className="no-bdr no-bdt no-bdl">レビュアートップ</a></li>
              <li className="item">
                <Link to="/restaurants">レビュー済 店舗</Link>
              </li>
              <li className="item">
                <Link to="/favorite">お気に入り</Link>
              </li>
              <li className="item">
                <Link to="/blog">ブログ</Link>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="block-container my-review-container">
            <h2 className="main-title text-center">マイレビュー</h2>
            <MyReviews myReviews={this.props.myReviews}/>
            <div className="footer-bar text-center">
              <a href="#" className="button-link">口コミ一覧へ（{this.props.myReviews.length}）<span className="ficon-next"></span></a>
            </div>
          </div>
          <div className="block-container my-followers-container">
            <h2 className="main-title text-center">マイフォロワー</h2>
            <MyFollowers myFollowers={this.props.myFollowers} />
            <div className="footer-bar">
              <Link to="/followers" className="button-link">
                口コミ一覧へ（{this.props.myFollowers.length} <span className="ficon-next"></span>
              </Link>
            </div>
          </div>
          <div className="block-container link-container">
            <a href="#" className="button button-link-store"><span className="ficon ficon-home"></span> レビュアートップ</a>
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  myProfile: state.users.myProfile,
  myReviews: state.users.myReviews,
  myFollowers: state.users.myFollowers,
  // myRestaurantLikes: state.users.myRestaurantLikes,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);

