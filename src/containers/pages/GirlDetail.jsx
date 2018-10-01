import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propsTypes from 'prop-types';
import { MasterLayout } from '../../components/layouts';
import { IMAGE_URL } from '../../constants/Api';
import * as Actions from '../../actions/';

class GirlDetail extends Component {
  static props = {
    userBlogs: propsTypes.object,
  }

  static defaultProps = {
    userBlogs: [],
  }

  breadcrumb = [
    {
      name: '&nbsp;',
      icon: 'ficon-home',
      link: '/'
    },
    {
      name: 'エリア名',
      link: '/'
    },
    {
      name: '店舗名',
      link: '/'
    }
  ]

  state = {
    isLoadPhoto: false
  }

  componentDidMount = () => {
    this.props.actions.getCastDetail(this.props.match.params.id);
    this.props.actions.getUserBlogs(this.props.match.params.id);
  }

  handleLoadMorePhoto = (e) => {
    e.preventDefault();

    if (this.state.isLoadPhoto) {
      return;
    }

    this.setState(preState => ({
      isLoadPhoto: true
    }));
  }

  render() {
    const { user } = this.props;
    return (
      <MasterLayout breadcrumb={this.breadcrumb}>
        <section className="main-container detail-container detail-list-one-container">
          <div className="user-image">
            <div className="image">
              <img src={`${IMAGE_URL}/profile/${user.profilePic}`} alt="" />
            </div>
            <div className="username">
              <span className="text">{user.fullnameFake}</span>
            </div>
          </div>
          <div className="block-container user-info">
            <ul className="list">
              <li><span className="text-label">名前: {user.fullnameFake}</span></li>
              <li><span className="text-label">生年月日: {user.birthdayFake}</span></li>
              <li><span className="text-label">エリア: {user.addressFake}</span></li>
            </ul>
          </div>
          <div className="block-container">
            <h2 className="main-title">写真</h2>
            <div className="list-girl-content">
              <ul className="list-girl-image">
                {
                  user.fakePic &&
                  user.fakePic[0] &&
                  user.fakePic[0].fakePicThum.slice(0, this.state.isLoadPhoto ? user.fakePic[0].fakePicThum.length : 1).map((item, k) => (
                    <li className="item" key={k}>
                      <span className="image" style={{ backgroundImage: `url(${IMAGE_URL}/profile/fakeMultiple/thumbnail/${item})` }}>
                        <img src={`${IMAGE_URL}/profile/fakeMultiple/thumbnail/${item}`} alt="" />
                      </span>
                    </li>
                  ))
                }
              </ul>
            </div>
            {
              !this.state.isLoadPhoto &&
              <div className="footer-bar text-center">
                <a to="/" className="view-more" onClick={this.handleLoadMorePhoto}>さらに読み込む <span className="ficon-next"></span></a>
              </div>
            }
          </div>
          <div className="block-container restaurant-container blog-list-container mt0 mb0">
            <h2 className="main-title">ブログ</h2>
            <div className="restaurant-content">
              <ul className="restaurant-list">
                {
                  this.props.userBlogs.map((item, key) =>
                    <li className="item" key={key}>
                      <div className="image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/image-restaurant-1.jpg)` }}>
                        <img src="images/image-restaurant-1.jpg" alt="" />
                      </div>
                      <div className="content">
                        <h5 className="title">{item.blog_title}</h5>
                        <div className="row">
                          <div className="favourite">
                            <span className="ficon ficon-heart"></span>
                            <span className="number">いいね!({item.likecount})</span>
                          </div>
                          <p className="date">{item.created_at}</p>
                        </div>
                        <div className="row">
                          <Link to="/" className="text-link">本文を見る<span className="ficon-next"></span></Link>
                        </div>
                      </div>
                    </li>
                  )
                }
              </ul>
            </div>
            <div className="footer-bar">
              <Link to={`/`} className="view-more">もっと見る <span className="ficon-next"></span></Link>
            </div>
          </div>
          <div className="block-container link-container mt0 mb0">
            <div className="wrap-button">
              <Link to={`/premium/${this.props.match.params.restaurantId}/cast`} className="button-more-info">他のキャストを見る</Link>
            </div>
            <a to="#" className="button button-top"><span className="ficon ficon-up"></span> 店舗トップへ</a>
            <Link to="/" className="button button-link-store"><span className="ficon ficon-home"></span> レビュアートップ</Link>
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: {
    ...state.auth,
    user: state.entities.users[state.auth.user]
  },

  user: state.entities.users[state.users.detailId] || {},
  userBlogs: state.users.userBlogs,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GirlDetail);
