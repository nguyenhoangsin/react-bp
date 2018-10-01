import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import { MasterLayout } from '../../components/layouts';
import * as Actions from '../../actions/';
import { TopPageSearch, DropdownAreaSearch, DropdownCategorySearch } from '../../components/partials';
import { IndexReview } from '../../components/restaurants';

class Premium extends Component {
  static props = {
    areas: propsTypes.object,
    categories: propsTypes.object,
    searchResult: propsTypes.object
  }

  static defaultProps = {
    areas: [],
    categories: [],
    searchResult: []
  }

  state = {
    keywords: '',
    categorySelected: '',
  }

  keyWordsChange = (e) => {
    this.setState({ keywords: e.target.value });
  }

  categoryChange = (categorySelected) => {
    this.setState({ categorySelected });
  }

  componentDidMount = () => {
    this.props.actions.getListAreas();
    this.props.actions.getListRestaurantCategory();
    this.props.actions.listLastReview(0);
  }

  handleSeeMoreClick = (e) => {
    e.preventDefault();
    let limit = this.props.reviews_state.lastReviews.limit * 2;
    this.props.actions.listLastReview(0, 0, limit);
  }

  render() {
    const categoryOptions = this.props.categories.map(item => {
      return { value: item.id, label: item.categoryName }
    });

    return (
      <MasterLayout isPremiumPage>
        <section className="main-container premium-container">
          <div className="introduction">
            <h3 className="intro-title">素敵な夜にしよう</h3>
            <p className="intro-description">夜を一段と輝かせるための飲みログです。</p>
          </div>
          <div className="search-group">
            <div className="main-form search-form">
              <TopPageSearch
                categories={categoryOptions}
              />
              <div className="clearfix"></div>
            </div>

            <div className="search-types">
              <div className="seach-box">
                <Link to="/search">
                  <span className="image"><img src={`${process.env.PUBLIC_URL}/assets/images/image-search-type-1.png`} alt="" /></span>
                  <span className="text-search">エリア検索</span>
                </Link>
              </div>
              <div className="seach-box">
                <Link to="/search">
                  <span className="image"><img src={`${process.env.PUBLIC_URL}/assets/images/image-search-type-2.png`} alt="" /></span>
                  <span className="text-search">マップから探す</span>
                </Link>
              </div>
              <div className="clearfix"></div>
            </div>
            <div className="search-list">
              <ul className="search-actions-list">
                <DropdownAreaSearch data={this.props.areas} actions={this.props.actions}/>
                {/* <li className="item">
                  <Link to="/search">
                  <span className="ficon-first ficon-public-transport-subway"></span>路線・駅一覧から検索<span className="ficon-next"></span>
                  </Link>
                </li> */}
                <DropdownCategorySearch data={categoryOptions}/>
              </ul>
            </div>
          </div>
          <div className="block-container">
            <h2 className="main-title">最新口コミ一覧</h2>
            <IndexReview data={this.props.searchResult} />
            <div className="footer-bar">
              {/*<Link to="/" className="view-more">もっと見る <span className="ficon-next"></span></Link>*/}
              <a className="view-more" href="#/" onClick={this.handleSeeMoreClick}>もっと見る <span className="ficon-next"></span></a>
            </div>
          </div>
          <div className="block-container list-container">
            <div className="search-list mt10">
              <ul className="search-actions-list">
                <DropdownAreaSearch data={this.props.areas} actions={this.props.actions} isBottom/>
                <DropdownCategorySearch data={categoryOptions} isBottom/>
              </ul>
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

  areas: state.users.areas,
  categories: state.restaurants.categories,
  searchResult: state.reviews.lastReviews.items.map(id => ({
    ...state.entities.reviews[id],
    user: state.entities.users[state.entities.reviews[id].userId]
  })),
  reviews_state: state.reviews,
  entities: state.entities
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Premium);

