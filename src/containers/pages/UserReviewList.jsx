import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MasterLayout } from '../../components/layouts';
import { ReviewItem } from '../../components/mypage';
import { Link } from 'react-router-dom';
import * as Actions from '../../actions/';

class UserReviewList extends Component {
  static propTypes = {
    lastReviews: PropTypes.object
  }

  static defaultProps = {
    lastReviews: []
  }

  breadcrumb = [
    {
      name: 'ホームへ戻る',
      link: '/',
      icon: 'ficon-home'
    }
  ]

  componentDidMount() {
    this.props.actions.listLastReview(this.props.match.params.id || this.props.auth.user.id);
  }

  handlePageClick = (e) => {
    console.log(e);
  }

  render() {
    const { lastReviews } = this.props;

    return (
      <MasterLayout isDetailPage breadcrumb={this.breadcrumb}>
        <section className="main-container detail-container">
          <h2 className="container-title pt0 pb0">パクさんの口コミ一覧</h2>
          <div className="block-container restaurant-container mt0 mb0">
            <div className="restaurant-content">
              <ul className="restaurant-list">
                {
                  lastReviews.items.map((item, k) => <ReviewItem data={item}/>)
                }
              </ul>
            </div>
            {/* <div className="pagination-container">
              <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={restaurants.list.total / 1}
                forcePage={restaurants.list.page}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div> */}
            {
              this.props.match.params.id &&
              <div className="group-button">
                <Link to="/" className="button-action">フォローする</Link>
                <Link to={`/user/${this.props.match.params.id || this.props.auth.user.id}/favorite`} className="button-action mr0"><span>このレビュアーの</span><span>お気に入りを見る</span></Link>
              </div>
            }
          </div>
          <div className="block-container link-container mt0">
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
  lastReviews: {
    start: state.reviews.lastReviews.start,
    limit: state.reviews.lastReviews.limit,
    items: state.reviews.lastReviews.items.map(id => ({
      ...state.entities.reviews[id],
      user: state.entities.users[state.entities.reviews[id].userId]
    }))
  }
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReviewList);

