import React, { Component } from 'react';
// import ReactPaginate from 'react-paginate';
import Rating from 'react-rating';
import classnames from 'classnames';
// import _ from 'lodash';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MasterLayout } from '../../components/layouts';
import * as Actions from '../../actions/';
import { IMAGE_URL } from '../../constants/Api';
import { TopPageSearch } from '../../components/partials';
import * as qs from 'query-string';

class SearchDetail extends Component {
  params = {};

  state = {
    isLoading: false,
    endLoadMore: false
  }

  componentDidMount = () => {
    this.refreshList();
    this.props.actions.getListRestaurantCategory();
  }

  componentDidUpdate = (preProps) => {
    if (this.props.location.search !== preProps.location.search) {
      this.refreshList();
    }
  }

  refreshList = () => {
    const parsed = qs.parse(this.props.location.search);
    this.params = this.parseParams(parsed);
    this.handleSubmit(this.params.start, this.params.limit, true);
  }

  parseParams = (parsed) => {
    return {
      area: parsed.area,
      main_area: parsed.main_area,
      sub_area: parsed.sub_area,
      sub_area_detail: parsed.sub_area_detail,
      sub_area_detail2: parsed.sub_area_detail2,
      sub_area_detail3: parsed.sub_area_detail3,
      sub_area_detail4: parsed.sub_area_detail4,
      restaurant_category: parsed.restaurant_category,
      restaurant_kitchen: parsed.restaurant_kitchen,
      catType: parsed.catType,
      start: parsed.start ? parseInt(parsed.start, 10) : 0,
      limit: parsed.limit ? parseInt(parsed.limit, 10) : 5,
      keywords: parsed.keywords,
      maxPrice: parsed.maxPrice,
      minPrice: parsed.minPrice,
      ranking: parsed.ranking
    };
  }

  handleSubmit = (start, limit, clear = false) => {
    this.setState({isLoading: true});

    if (this.params.ranking) {
      if (this.params.ranking === 'true') {
        return this.props.actions.listRestaurants(this.props.auth.user ? this.props.auth.user.id : 0, this.params, start, limit, clear).then(res => {
          if (!res.payload.data.result.results || res.payload.data.result.results.length < limit) {
            return this.setState({endLoadMore: true});
          }

          return res;
        }).then((res) => {
          this.setState({isLoading: false});
          return res;
        });
      }

      return this.props.actions.catSearch(this.props.auth.user ? this.props.auth.user.id : 0, this.params, start, limit, clear).then(res => {
        if (!res.payload.data.result.results || res.payload.data.result.results.length < limit) {
          return this.setState({endLoadMore: true});
        }

        return res;
      }).then((res) => {
        this.setState({isLoading: false});
        return res;
      });

    }

    return this.props.actions.topSearch(this.props.auth.user ? this.props.auth.user.id : 0, this.params, start, limit, clear).then(res => {
      if (!res.payload.data.result.results || res.payload.data.result.results.length < limit) {
        return this.setState({endLoadMore: true});
      }

      return res;
    }).then((res) => {
      this.setState({isLoading: false});
      return res;
    });
  }

  handleLikeRestaurant = (id, liked) => {
    if (liked) {
      return alert("すでにお気に入りに入ってます。");
    }

    this.props.actions.likeRestaurant(this.props.auth.user ? this.props.auth.user.id : 0, id);
  }

  handleLoadMore = (e) => {
    e.preventDefault();
    const { start, limit } = this.params;

    if (this.state.endLoadMore) {
      return;
    }

    this.handleSubmit(start + limit, limit).then(res => {
      if (res && res.error) {
        return;
      }

      this.params.start += limit;
    });
  }

  render() {
    const { restaurants } = this.props;
    const categoryOptions = this.props.categories.map(item => {
      return { value: item.id, label: item.categoryName }
    });

    return (
      <MasterLayout>
        <section className="main-container premium-container other-user-page-container">
          <div className="search-group">
            <div className="main-form search-form pb10">
              <TopPageSearch
                categories={categoryOptions}
              />
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="breadcrumb-container pt0 pb0">
            <ul className="list">
              <li><Link to="/">東京都</Link></li>
              <li><Link to="/">新宿区</Link></li>
              <li>歌舞伎町</li>
            </ul>
          </div>
          <div className="block-container link-container">
            <div className="wrap-button">
              <Link to="/search" className="button-more-info">
                <span className="ficon-filter"></span> フィルタ
              </Link>
              <Link to="/search/result?ranking=true" className="button-more-info"><span className="ficon-king-crown"></span> ランキング表示</Link>
            </div>
          </div>
          <div className="block-container reviews-container">
            <div className="reviews-content">
              <ul className="reviews-list">
                {
                  restaurants.items.map((item, i) => (
                    <li className="item" key={i}>
                      <button className="button-favourite" onClick={this.handleLikeRestaurant.bind(this, item.id, item.isLikeResT)}><span className={classnames({
                        'ficon-heart': !item.isLikeResT,
                        'ficon-vheart': item.isLikeResT
                      })}></span></button>
                      <Link to={item.isPremium ? `/premium/${item.id}` : `/free/${item.id}`}>
                        <h4 className="title">{item.restaurantName}</h4>
                        <p className="text">{item.mainArea} - {item.restaurantCategory && item.restaurantCategory[0].categoryName}</p>
                        <ul className="list-image">
                         {
                           item.restaurantPhoto && item.restaurantPhoto.slice(0, 3).map((photo, k) => (
                            <li key={k}>
                              <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/resPhoto/${photo}`}}>
                                <img src={`${IMAGE_URL}/resPhoto/${photo}`} alt="" />
                              </div>
                            </li>
                           ))
                         }
                        </ul>
                        <div className="content">
                          <h5 className="title">{item.restaurantDescription}</h5>
                          <div className="row">
                            <div className="review"><span className="ficon-comment-black-oval-bubble-shape"></span>{`${item.totalReview || 0} 件}`}</div>
                            <div className="rating">
                              <span className="number">{parseFloat(item.avgRating || 0).toFixed(1) || 0}</span>
                              <div className="star">
                                <div className="list-star">
                                  <Rating
                                    initialRate={parseFloat(item.avgRating) || 0}
                                    full="ficon ficon-star-rating"
                                    empty="ficon ficon-star-rating empty"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="price">平均予算: <span className="number">{item.restaurantCostBanquet}円</span></p>
                        </div>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
            {
              !this.state.endLoadMore &&
              <div className="footer-bar bg-white">
                <Link to="/" className="view-more" onClick={this.handleLoadMore}>さらに読み込む <span className="ficon-next"></span></Link>
              </div>
            }
            <div className="pagination-container">
              {/* <ReactPaginate previousLabel={"previous"}
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
              /> */}
            </div>
          </div>
          <div className="block-container link-container">
            <div className="wrap-button">
              <Link to="/" className="button-more-info">地図で見る</Link>
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
  restaurants: {
    items: state.restaurants.search.items.map(id => state.entities.restaurants[id])
  },
  categories: state.restaurants.categories
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDetail);

