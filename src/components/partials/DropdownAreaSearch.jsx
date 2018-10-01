import React, { Component } from 'react';
import propsTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router'
import * as qs from 'query-string';

class DropdownAreaSearch extends Component {
  state = {
    isOpenArea: {
      __root: false
    },
    isLoading: {},
    listAreas: {}
  }

  static props = {
    data: propsTypes.array,
    isBottom: propsTypes.bool
  }

  static defaultProps = {
    data: [],
    isBottom: false
  }

  handleOpenArea = (e) => {
    e.preventDefault();

    this.setState(preState => ({
      isOpenArea: {
        __root: !preState.isOpenArea.__root
      }
    }));
  }

  searchRestaurantsByMainArea = (name, data, qty, e) => {
    e.preventDefault();
    const fieldName = this.getFieldName(qty);
    const fullData = {
      ...data,
      [fieldName]: name
    };

    this.props.history.push({
      pathname: "/search/result",
      search: `?${qs.stringify(fullData)}`,
    });
  }

  loadSubArea = (qty, item) => {
    const fieldName = `${item}-${qty}`;

    if (this.state.listAreas[fieldName]) {
      return this.setState({
        isOpenArea: {
          ...this.state.isOpenArea,
          [fieldName]: !this.state.isOpenArea[fieldName]
        }
      });
    }

    this.setState({
      isLoading: {
        ...this.state.isLoading,
        [fieldName]: true
      }
    });

    return this.props.actions[`getListAreaSub${qty}`](item).then(res => {
      if (res.error) {
        return;
      }

      this.setState({
        listAreas: {
          ...this.state.listAreas,
          [fieldName]: res.payload.data.results || []
        },
        isOpenArea: {
          ...this.state.isOpenArea,
          [fieldName]: !this.state.isOpenArea[fieldName]
        },
        isLoading: {
          ...this.state.isLoading,
          [fieldName]: false
        }
      });
    });
  }

  getFieldName(id) {
    let fieldName = 'main_area';
    switch (id) {
      case 2:
        fieldName = 'sub_area';
        break;
      case 3:
        fieldName = 'sub_area_detail';
        break;
      case 4:
        fieldName = 'sub_area_detail2';
        break;
      case 5:
        fieldName = 'sub_area_detail3';
        break;
      case 6:
        fieldName = 'sub_area_detail4';
        break;
      default:
        break;
    }

    return fieldName;
  }

  renderSub = (name, data, id = 1, fields = {}) => {
    const fieldName = this.getFieldName(id);
    const nextId = id + 1;
    const updateFields = {
      ...fields,
      [fieldName]: name
    }

    return (
      <ul className="list" style={{ display: this.state.isOpenArea[`${name}-${id}`] ? 'block' : 'none' }}>
        {
          data.map((item, key) => (
            <li className="sub-item" key={key}>
              <a href="#/" onClick={this.searchRestaurantsByMainArea.bind(this, item, updateFields, nextId)}>{item}</a>
              {
                id < 5 &&
                !this.state.isLoading[`${item}-${nextId}`] &&
                !this.props.isBottom &&
                <span className={classnames({
                  'ficon-next': !this.state.isOpenArea[`${item}-1`],
                  'ficon-next2': this.state.isOpenArea[`${item}-1`]
                })} onClick={this.loadSubArea.bind(this, nextId, item)}></span>
              }
              {
                id < 5 &&
                !this.state.isLoading[`${item}-${nextId}`] &&
                this.props.isBottom &&
                <span className="ficon ficon-plus" onClick={this.loadSubArea.bind(this, nextId, item)}>
                  {this.state.isOpenArea[`${item}-1`] ? '-' : '+'}
                </span>
              }
              {
                this.state.isLoading[`${item}-${nextId}`] &&
                <span className="ficon mt0">
                  <span className="loader loader-quart"></span>
                </span>
              }
              {
                this.state.listAreas[`${item}-${nextId}`] &&
                this.renderSub(item, this.state.listAreas[`${item}-${nextId}`], nextId, updateFields)
              }
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { data, isBottom } = this.props;

    return (
      <li className="item">
        <a href="/" className="action" onClick={this.handleOpenArea}>
          {
            !isBottom &&
            <span className="ficon-first ficon-location"></span>
          }
          エリア一覧から検索
          {
            !this.state.isOpenArea.__root &&
            !isBottom &&
            <span className="ficon-next"></span>
          }
          {
            this.state.isOpenArea.__root &&
            !isBottom &&
            <span className="ficon-next2"></span>
          }
          {
            !this.state.isOpenArea.__root &&
            isBottom &&
            <span className="ficon-plus">+</span>
          }
          {
            this.state.isOpenArea.__root &&
            isBottom &&
            <span className="ficon-plus">-</span>
          }
        </a>
        <ul className="list" style={{ display: this.state.isOpenArea.__root ? 'block' : 'none' }}>
          {
            data.map((item, id) => (
              <li className="sub-item" key={id}>
                <a href="#/" onClick={this.searchRestaurantsByMainArea.bind(this, item, {}, 1)}>{item}</a>
                {
                  !this.state.isLoading[`${item}-1`] &&
                  !isBottom &&
                  <span className={classnames({
                    'ficon-next': !this.state.isOpenArea[`${item}-1`],
                    'ficon-next2': this.state.isOpenArea[`${item}-1`]
                  })} onClick={this.loadSubArea.bind(this, 1, item)}></span>
                }
                {
                  !this.state.isLoading[`${item}-1`] &&
                  isBottom &&
                  <span className="ficon ficon-plus" onClick={this.loadSubArea.bind(this, 1, item)}>
                    {this.state.isOpenArea[`${item}-1`] ? '-' : '+'}
                  </span>
                }
                {
                  this.state.isLoading[`${item}-1`] &&
                  <span className="ficon mt0">
                    <span className="loader loader-quart"></span>
                  </span>
                }
                {
                  this.state.listAreas[`${item}-1`] &&
                  this.renderSub(item, this.state.listAreas[`${item}-1`], 1)
                }
              </li>
            ))
          }
        </ul>
      </li>
    );
  }
}

export default withRouter(DropdownAreaSearch);

