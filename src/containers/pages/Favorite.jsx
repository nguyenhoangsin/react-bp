import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MasterLayout } from '../../components/layouts';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../../constants/Api';
import classnames from 'classnames';
import Rating from 'react-rating';
import * as Actions from '../../actions/';

class Favorite extends Component {
  breadcrumb = [
    {
      name: 'マイページへ',
      link: '/',
      icon: 'ficon-prev'
    }
  ]

  componentDidMount() {
    this.props.actions.getMyRestaurantLikes(this.props.match.params.id || this.props.auth.user.id);
  }

  handleLikeRestaurant = (id, liked) => {
    // if (liked) {
    //   return;
    // }

    this.props.actions.likeRestaurant(this.props.auth.user ? this.props.auth.user.id : 0, id);
  }

  render() {
    const { myRestaurantLikes } = this.props;

    return (
      <MasterLayout breadcrumb={this.breadcrumb}>
        <section className="main-container detail-container">
          <h2 className="container-title pt0">行きたいリスト</h2>
          <div className="block-container reviews-container">
            <div className="reviews-content">
              <ul className="reviews-list">
                {
                  myRestaurantLikes.map((item, k) => {
                    const { restaurantId, restaurant_category } = item;
                    return (
                      <li className="item" key={k}>
                        <button className="button-favourite" onClick={this.handleLikeRestaurant.bind(this, restaurantId._id, restaurantId.isLikeResT)}><span className={classnames({
                          'ficon-heart': !item.restaurantId.isLikeResT,
                          'ficon-vheart': item.restaurantId.isLikeResT
                        })}></span></button>
                        <Link to={restaurantId.isPremium ? `/premium/${restaurantId._id}` : `/free/${restaurantId._id}`}>
                          <h4 className="title">{restaurantId.restaurant_name}</h4>
                          <p className="text">{restaurantId.sub_area} - {restaurant_category ? restaurant_category[0].category_name : ''}</p>
                          <ul className="list-image">
                          {
                            restaurantId.restaurant_photo && restaurantId.restaurant_photo.slice(0, 3).map((photo, k) => (
                              <li key={k}>
                                <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/resPhoto/${photo}`}}>
                                  <img src={`${IMAGE_URL}/resPhoto/${photo}`} alt="" />
                                </div>
                              </li>
                            ))
                          }
                          </ul>
                          <div className="content">
                            <h5 className="title">{restaurantId.restaurant_description}</h5>
                            <div className="row">
                              <div className="review"><span className="ficon-comment-black-oval-bubble-shape"></span>{restaurantId.reviewCount} 件</div>
                              <div className="rating">
                                <span className="number">{item.avg_rating || 0}</span>
                                <div className="star">
                                  <div className="list-star">
                                    <Rating
                                      initialRate={parseFloat(item.avg_rating) || 0}
                                      full="ficon ficon-star-rating"
                                      empty="ficon ficon-star-rating empty"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="price">平均予算: <span className="number">{restaurantId.restaurant_cost_banquet}円</span></p>
                          </div>
                        </Link>
                      </li>
                    )}
                  )
                }
              </ul>
            </div>
          </div>
          <div className="block-container link-container">
            <a href="#" className="button button-top"><span className="ficon ficon-up"></span> 店舗トップへ</a>
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

  myRestaurantLikes: state.users.myRestaurantLikes || []
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite);
