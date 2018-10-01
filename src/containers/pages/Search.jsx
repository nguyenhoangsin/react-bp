import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MasterLayout } from '../../components/layouts';
import { Link } from 'react-router-dom'
import * as Actions from '../../actions/';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as qs from 'query-string';

class Search extends Component {
  state = {
    area: '',
    restaurant_category: '',
    minPrice: '',
    maxPrice: '',
    restaurant_kitchen: []
  }

  componentDidMount = () => {
    this.props.actions.getListRestaurantCategory();
    this.props.actions.listRestaurantKitchen();
  }

  handlePriceChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  }

  handleCategoryChange = (item) => {
    this.setState({ restaurant_category: item.value });
  }

  handleChangeArea = (e) => {
    this.setState({ area: e.target.value });
  }

  handleKitchenChoose = (e) => {
    let { restaurant_kitchen } = this.state;

    if (e.target.value === 'true') {
      restaurant_kitchen.push(e.target.name);
    } else {
      restaurant_kitchen.splice(restaurant_kitchen.indexOf(e.target.name), 1);
    }

    return this.setState({ restaurant_kitchen });
  }

  handleRankingSearch = (e) => {
    return this.props.history.push({
      pathname: '/search/result',
      search: `?ranking=true&${qs.stringify(this.state)}`
    });
  }

  handleNormalSearch = (e) => {
    return this.props.history.push({
      pathname: '/search/result',
      search: `?ranking=false&${qs.stringify(this.state)}`
    });
  }

  render() {
    const { features, categories } = this.props;
    const categoryOptions = categories.map(item => {
      return { value: item.id, label: item.categoryName }
    });

    return (
      <MasterLayout>
        <section className="main-container search-container">
          <div className="main-form search-form">
            <div className="input-group">
              <span className="ficon ficon-location"></span>
              <input
                type="text"
                name="location"
                className="input-control"
                placeholder="エリア名・駅名..."
                onChange={this.handleChangeArea}
              />
            </div>
            <div className="input-group select-picker mb0">
              <span className="ficon ficon-culinary"></span>
              <Select
                className="select-control"
                placeholder=""
                style={{width: '100%'}}
                value={this.state.restaurant_category}
                onChange={this.handleCategoryChange}
                options={categoryOptions}
              />
            </div>
          </div>
          <div className="budget-filter">
            <div className="budget-content">
              <span className="ficon ficon-coin-of-dollar"></span>
              <label>目安予算</label>
              <div className="select-picker">
                <input
                  type="number"
                  className="select-control"
                  placeholder="0 $"
                  style={{width: '100px'}}
                  onChange={this.handlePriceChange.bind(this, 'minPrice')}
                />
              </div>
              <span className="line"></span>
              <div className="select-picker">
                <input
                  type="number"
                  className="select-control"
                  placeholder="1999999 $"
                  style={{width: '100px'}}
                  onChange={this.handlePriceChange.bind(this, 'maxPrice')}
                />
              </div>
            </div>
          </div>
          <div className="list-checkbox">
            <ul className="list">
              {
                features.map((item, k) => (
                  <li className="item" key={k}>
                    <label className="title"><span className="ficon ficon-degrees"></span> {item.kitchenName}</label>
                    <div className="checkbox-custom">
                      <input
                        type="radio"
                        id={item.id}
                        name={item.id}
                        value={true}
                        onChange={this.handleKitchenChoose}
                      />
                      <label className="checkbox-label" htmlFor={item.id} >あり</label>
                      <div className="check"></div>
                    </div>
                    <div className="checkbox-custom">
                      <input
                        type="radio"
                        id={`selector-none-${k}`}
                        name={item.id}
                        value={false}
                        defaultChecked
                        onChange={this.handleKitchenChoose}
                      />
                      <label className="checkbox-label" htmlFor={`selector-none-${k}`}>なし</label>
                      <div className="check"></div>
                    </div>
                  </li>
                ))
              }
            </ul>
            <div className="group-button">
              <button onClick={this.handleNormalSearch} className="button-action">通常検索</button>
              <button onClick={this.handleRankingSearch} className="button-action mr0">ランキング検索</button>
            </div>
          </div>
          <div className="block-container link-container mt0 mb0">
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
  features: state.restaurants.features.map(id => state.entities.features[id]),
  categories: state.restaurants.categories
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

