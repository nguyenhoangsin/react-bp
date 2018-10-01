import React, { Component } from 'react';
import Rating from 'react-rating';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MasterLayout } from '../../components/layouts';
import * as Actions from '../../actions/';
import { DetailReview, PhotoSlider, Map, DetailBanner } from '../../components/restaurants';

class FreeDetail extends Component {
  breadcrumb = [
    {
      name: 'HOME',
      link: '/',
    },
    {
      name: 'エリア検索'
    },
    {
      name: '東京'
    },
    {
      name: '歌舞伎町'
    },
    {
      name: 'アジアン'
    }
  ]

  likeRestaurant = () => {

    if(this.props.restaurant.isLikeResT)
    {
      alert('You have liked this restaurant');
      return;
    }

    this.props.actions.likeRestaurant(this.props.auth.user.id, this.props.restaurant.id);
    alert('Liked');
  }

  componentDidMount = () => {
    this.props.actions.getdetailsReviewList(this.props.match.params.id);
    this.props.actions.getRestaurantDetail(this.props.match.params.id, this.props.auth.user ? this.props.auth.user.id : 0);
  }

  render() {
    const { restaurant, reviews } = this.props;

    if(restaurant.restaurantKitchen === null || restaurant.restaurantKitchen === undefined)
    {
      restaurant.restaurantKitchen = [];
    }

    return (
      <MasterLayout isDetailPage breadcrumb={this.breadcrumb}>
        <section className="main-container detail-container free-detail-container">
          <div className="banner-container">
            <DetailBanner data={restaurant} />
          </div>
          <div className="category-container">
            <ul className="category-list">
              <li className="item">
                <div className="category-item">
                  <span className="ficon ficon-photo-camera"></span>
                  <span className="title">写真</span>
                </div>
              </li>
              <li className="item">
                <Link to={`/free/${restaurant.id}/reviews`}>
                  <div className="category-item">
                    <span className="ficon ficon-comment-black-oval-bubble-shape"></span>
                    <span className="title">レビュー</span>
                  </div>
                </Link>
              </li>
              <li className="item">
                <div className="category-item">
                  <span className="ficon ficon-culinary"></span>
                  <span className="title">お店情報</span>
                </div>
              </li>
              <li className="item">
                <a href="#map">
                  <div className="category-item">
                    <span className="ficon ficon-location"></span>
                    <span className="title">地図</span>
                  </div>
                </a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="block-container slider-image-container">
            <h2 className="main-title text-center">公式写真</h2>
            <div className="slider-image-content">
              {
                restaurant.restaurantPhoto &&
                <PhotoSlider data={restaurant.restaurantPhoto} />
              }
              <div className="clear"></div>
            </div>
            <div className="footer-bar">
              <a href="#" className="view-more">もっと見る ({restaurant.restaurantPhoto ? restaurant.restaurantPhoto.length : 0}) <span className="ficon-next"></span></a>
            </div>
          </div>
          <div className="block-container" style={this.props.auth.user ? {} : { display: 'none' }}>
            <div className="wrap-button">
              <button className="button-add-list" onClick={this.likeRestaurant}><span className="ficon ficon-heart"></span>行きたいリストに追加</button>
            </div>
          </div>
          <div className="block-container info-container">
            <div className="status-bar">
              <div className="rating">
                <span className="number">{parseFloat(restaurant.avgRating).toFixed(1) || 0}</span>
                <div className="star">
                  <ul className="list-star">
                    <Rating
                      initialRate={parseFloat(restaurant.avgRating) || 0}
                      full="ficon ficon-star-rating"
                      empty="ficon ficon-star-rating empty"
                      readonly={true}
                    />
                  </ul>
                </div>
              </div>
              <div className="review"><span className="ficon-comment-black-oval-bubble-shape"></span>{`${restaurant.totalReview || 0} 件`}</div>
              <div className="clearfix"></div>
            </div>
            <div className="list-info-container">
              <ul className="list-address">
                <li><span className="ficon ficon-culinary"></span>{restaurant.restaurantName}</li>
                <li><span className="ficon ficon-clock"></span>今日：{restaurant.restaurantScheduleWork}</li>
                <li>
                  <span className="ficon ficon-location"></span>
                  <p className="text-location">
                    <span>{restaurant.restaurantAddress}</span>
                    <a href="#map" className="view-map">地図上で見る</a>
                  </p>
                </li>
                <li><span className="ficon ficon-phone"></span>{restaurant.restaurantPhone}</li>
              </ul>
              <ul className="list-info">
                {
                restaurant.restaurantKitchen.map((item, key) =><li key={key}>{item.kitchenName}</li>)
                }
              </ul>
            </div>
          </div>
          <div className="block-container review-container" id="review-list">
            <h2 className="main-title text-center">口コミ</h2>
            <div className="status-bar">
              <div className="rating">
                <span className="number">{parseFloat(restaurant.avgRating).toFixed(1) || 0}</span>
                <div className="star">
                  <ul className="list-star">
                    <Rating
                      initialRate={parseFloat(restaurant.avgRating) || 0}
                      full="ficon ficon-star-rating"
                      empty="ficon ficon-star-rating empty"
                      readonly={true}
                    />
                  </ul>
                </div>
              </div>
              <div className="review"><span className="ficon-comment-black-oval-bubble-shape"></span>{`${restaurant.totalReview || 0} 件`}</div>
              <div className="clearfix"></div>
            </div>
            <div className="review-content">
              <DetailReview reviews={reviews} />
            </div>
            <div className="footer-bar text-center">
              <Link to={`/free/${restaurant.id}/reviews`} className="button-link">もっと見る（{restaurant.totalReview}件）</Link>
            </div>
          </div>
          <div className="block-container map-container" id="map">
            <h2 className="main-title text-center">地図</h2>
            <div className="map-content">
              <div className="map-image">
                <Map
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ_F0DpO7I7r5pN8xdyOxN58xKxiwzrKo&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `241px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  lat={restaurant.lat}
                  lng={restaurant.lng}
                />
              </div>
            </div>
            <div className="footer-bar">
              <Link to="/" className="view-more">大きな地図で見る <span className="ficon-next"></span></Link>
            </div>
            <div className="block-container link-container">
              <Link to="/" className="button button-top"><span className="ficon ficon-up"></span> 店舗トップへ</Link>
              <Link to="/" className="button button-link-store"><span className="ficon ficon-home"></span> サイトトップへ</Link>
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
  restaurant: state.entities.restaurants[state.restaurants.detail] || {},
  reviews: state.reviews.detailReviews.map(id => ({
    ...state.entities.reviews[id],
    user: state.entities.users[state.entities.reviews[id].userId]
  }))
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreeDetail);