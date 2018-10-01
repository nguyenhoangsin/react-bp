import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MasterLayout } from '../../components/layouts';
import { Link } from 'react-router-dom';
import { PremiumBar, DetailBanner } from '../../components/restaurants';
import { IMAGE_URL } from '../../constants/Api';
import * as Actions from '../../actions/';

class GirlListDetail extends Component {
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
    this.props.actions.getRestaurantUser(this.props.match.params.id, this.props.auth.user ? this.props.auth.user.id : 0, {}, 0, 18);
  }

  render() {
    const { restaurant, girls } = this.props;

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
          <div className="block-container girl-list-container">
            <h2 className="main-title text-center">カート一覧</h2>
            <ul className="girl-list">
              {
                girls.map((item, k) => (
                  <li className="item" key={k}>
                    <Link to={`/premium/${restaurant.id}/cast/${item.user.id}`} className="content">
                      {
                        item.user &&
                        item.user.profilePicThum &&
                        <div className="image" style={{backgroundImage: `url(${IMAGE_URL}/profile/thumbnail/${item.user.profilePicThum})`}}>
                          <img src={`${IMAGE_URL}/profile/thumbnail/${item.user.profilePicThum}`} alt="" />
                        </div>
                      }
                      <span className="name">{item.user.fullnameFake}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
            <div className="clearfix"></div>
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
  auth: {
    ...state.auth,
    user: state.entities.users[state.auth.user]
  },
  restaurant: state.entities.restaurants[state.restaurants.detail] || {},
  girls: state.restaurants.girls.map(id => ({
    ...state.entities.girls[id],
    user: state.entities.users[state.entities.girls[id].userId]
  }))
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GirlListDetail);
