import React, { Component } from 'react';
import propsTypes from 'prop-types';
import { withRouter } from 'react-router'

class DropdownCategorySearch extends Component {
  state = {
    isOpen: false
  }

  static props = {
    data: propsTypes.array,
    isBottom: propsTypes.bool
  }

  static defaultProps = {
    data: [],
    isBottom: false
  }

  handleOpen = () => {
    this.setState(preState => ({
      isOpen: !preState.isOpen
    }))
  }

  handleSearch = (id, e) => {
    e.preventDefault();

    this.props.history.push({
      pathname: "/search/result",
      search: `?restaurant_category=${id}`,
    });
  }

  render() {
    const { data, isBottom } = this.props;

    return (
      <li className="item">
        <a to="/search" onClick={this.handleOpen}>
          {
            !isBottom &&
            <span className="ficon-first ficon-location"></span>
          }
          ジャンル一覧から検索
          {
            !this.state.isOpen &&
            !isBottom &&
            <span className="ficon-next"></span>
          }
          {
            this.state.isOpen &&
            !isBottom &&
            <span className="ficon-next2"></span>
          }
          {
            !this.state.isOpen &&
            isBottom &&
            <span className="ficon-plus">+</span>
          }
          {
            this.state.isOpen &&
            isBottom &&
            <span className="ficon-plus">-</span>
          }
        </a>
        <ul className="list" style={{ display: this.state.isOpen ? 'block' : 'none'}}>
          {
            data.map((item, id) => (
              <li className="sub-item" key={id}>
                <a href="#/" onClick={this.handleSearch.bind(this, item.value)}>{item.label}</a>
              </li>
            ))
          }
        </ul>
      </li>
    );
  }
}

export default withRouter(DropdownCategorySearch);

