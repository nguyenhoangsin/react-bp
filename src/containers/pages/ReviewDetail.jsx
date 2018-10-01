import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MasterLayout } from '../../components/layouts';
import { Link } from 'react-router-dom';
import { DetailReviewItem, PremiumBar, DetailBanner } from '../../components/restaurants';
import * as Actions from '../../actions/';
// import ReactPaginate from 'react-paginate';

class ReviewDetail extends Component {
  breadcrumb = [
    {
      name: 'メイン',
      link: '/'
    },
    {
      name: 'エリア検索',
      link: '/'
    },
    {
      name: '東京',
      link: '/'
    },
    {
      name: '丸亀モンゾー',
      link: '/'
    }
  ]

  componentDidMount = () => {
    this.props.actions.getRestaurantDetail(this.props.match.params.id, this.props.auth.user ? this.props.auth.user.id : 0);
    this.props.actions.getdetailsReviewList(this.props.match.params.id, 0, 10);
  }

  render() {
    const { restaurant, reviews } = this.props;

    return (
      <MasterLayout breadcrumb={this.breadcrumb}>
        <section className="main-container detail-container">
          <div className="banner-container">
            <DetailBanner data={restaurant} />
          </div>
          <div className="category-container">
            <PremiumBar item={restaurant} />
            <div className="clearfix"></div>
          </div>
          <div className="block-container restaurant-container detail-review-container mt0 mb0">
            <h2 className="block-title">Reviews</h2>
            <div className="detail-review-content restaurant-content">
              <ul className="restaurant-list detail-review-list">
                {
                  reviews.map((item, k) => <DetailReviewItem data={item} key={k}/>)
                }
              </ul>
            </div>
            {/* <div className="pagination-container">
              <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={3}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div> */}
          </div>
          <div className="block-container link-container">
            <a href="#" className="button button-top"><span className="ficon ficon-up"></span> レビュアートップ</a>
            <Link to="/" className="button button-link-store"><span className="ficon ficon-home"></span> 店舗トップへ</Link>
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
  restaurant: state.entities.restaurants[state.restaurants.detail] || {},
  reviews: state.reviews.detailReviews ? state.reviews.detailReviews.map(id => ({
    ...state.entities.reviews[id],
    user: state.entities.users[state.entities.reviews[id].userId]
  })) : []
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewDetail);