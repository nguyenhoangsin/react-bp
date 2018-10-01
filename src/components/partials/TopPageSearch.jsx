import React, { Component } from 'react';
import propsTypes from 'prop-types';
import Select from 'react-select';
import { withRouter } from 'react-router'

class TopPageSearch extends Component {
  state = {
    keywords: '',
    categorySelected: ''
  }

  static props = {
    categories: propsTypes.array,
    onSearch: propsTypes.func,
  }

  static defaultProps = {
    categories: []
  }

  keyWordsChange = (e) => {
    this.setState({ keywords: e.target.value });
  }

  categoryChange = (categorySelected) => {
    this.setState({ categorySelected });
  }

  searchRestaurants = (e) => {
    e.preventDefault();
    let params = {
      keywords: this.state.keywords,
      restaurant_category: this.state.categorySelected && this.state.categorySelected.value,
    };

    if(!params.restaurant_category) {
      params.restaurant_category = '';
    }

    if (this.props.onSearch) {
      return this.props.onSearch(params);
    }

    this.props.history.push({
      pathname: "/search/result",
      search: `?keywords=${params.keywords}&restaurant_category=${params.restaurant_category}`,
    });

  }

  render() {
    const { categorySelected } = this.state;
    const value = categorySelected && categorySelected.value;

    return (
      <div className="form-content">
        <form onSubmit={this.searchRestaurants}>
          <div className="input-group">
            <input type="text"
              name="area"
              className="input-control"
              placeholder="エリア・駅..."
              value={this.state.keywords}
              onChange={this.keyWordsChange} />
          </div>
          <div className="input-group select-picker mb0">
            <Select placeholder="ジャンル..."
              value={value}
              onChange={this.categoryChange}
              options={this.props.categories}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="button-submit"><span className="ficon-magnifying-glass"></span></button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(TopPageSearch);

