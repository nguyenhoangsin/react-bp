import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MasterLayout } from '../../components/layouts';
import { UserReviewItem } from '../../components/mypage';
import { Link } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';
import * as Actions from '../../actions/';
import { IMAGE_URL } from '../../constants/Api';

class UserDetail extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object.isRequired,
    lastReviews: PropTypes.object.isRequired
  }

  static defaultPorps = {
    user: {}
  }

  breadcrumb = [
    {
      name: 'ホームへ戻る',
      link: '/',
      icon: 'ficon-home'
    }
  ]

  handlePageClick = (e) => {
    console.log(e);
  }

  followeUser = () => {
    this.props.actions.followeUser(this.props.auth.user.id, this.props.match.params.id)
     .then( (response) => {
       if (response.payload.data.responseCode) {
        this.props.actions.getMyProfile(this.props.auth.user.id);
       }
       alert(JSON.stringify(response.payload.data.message));
     });
  }

  componentDidMount = () => {
    this.props.actions.getMyProfile(this.props.auth.user.id);
    this.props.actions.userDetail(this.props.match.params.id);
    this.props.actions.listLastReview(this.props.match.params.id);
  }

  render() {
    const { lastReviews, user } = this.props;
    const disabledFollower = this.props.auth.user && this.props.auth.user.follower.indexOf(this.props.match.params.id) >= 0;

    return (
      <MasterLayout breadcrumb={this.breadcrumb}>
        <section className="main-container detail-container">
          <div className="user-info-container">
            <div className="image-avatar">
                <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/profile/${user.profilePic})`}}>
                </div>
            </div>
            <div className="user-info">
              <p className="username">{user.fullname}</p>
              <p className="info"><span className="text">{user.sex === 'notset' ? '未設定' : user.sex}</span> <span className="text">{user.address}</span></p>
              <p className="text-link">{user.description}</p>
              {/* <Link to="/" className="text-link">コメント <span className="ficon-next"></span></Link> */}
            </div>
            <div className="group-button">
              <button className="button-action"
                disabled={disabledFollower}
                title={disabledFollower ? 'You have already followed this user!' : 'Click to follow this user!'}
                onClick={this.followeUser} >
                <span>フォローアップ</span>
                <span>このユーザー</span>
              </button>
              <div className="button-action mr0">
                <span>このユーザーの</span>
                <span>お気に入り店舗</span>
              </div>
            </div>
          </div>
          <div className="block-container restaurant-container user-page-container mt0 mb0">
            <h2 className="main-title">新着レビュー</h2>
            <div className="restaurant-content">
              <ul className="restaurant-list">
                {
                  lastReviews.items.map((item, k) => <UserReviewItem key={k} data={item} />)
                }
              </ul>
            </div>
            <div className="link-container">
              <div className="wrap-button">
                <Link to={`/user/${user.id}/reviews`} className="button-more-info mt0 mb0">口コミ一覧へ</Link>
              </div>
            </div>
            <div className="group-button">
              <Link to="/" className="button-action">
                <span>フォローアップ</span>
                <span>このユーザー</span>
              </Link>
              <Link to={`/user/${user.id}/favorite`} className="button-action mr0">
                <span>このレビュアーの</span>
                <span>お気に入りを見る</span>
              </Link>
            </div>
            <div className="link-container">
              <div className="wrap-button pt5 pb5">
                <Link to="/" className="button-more-info"><span className="ficon ficon-home"></span> サイトトップへ</Link>
              </div>
            </div>
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

  lastReviews: {
    start: state.reviews.lastReviews.start,
    limit: state.reviews.lastReviews.limit,
    items: state.reviews.lastReviews.items ? state.reviews.lastReviews.items.map(id => ({
      ...state.entities.reviews[id],
      user: state.entities.users[state.entities.reviews[id].userId]
    })) : []
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);

