import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../../actions/';

import { Toggle } from '../../components/utils';

class BlogItem extends Component {
  static props = {
    data: propsTypes.object.isRequired,
  }

  static defaultProps = {
    data: {},
  }
  
  state = {
    isHidden: true,
  };

  toggleShow = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  deleteBlog = (blogId) => {
    this.props.actions.deleteBlog(blogId)
      .then(() => {
        this.props.actions.getMyBlogs(this.props.auth.user);
      });
  }

  handleChange = () => {
    this.props.updateCheck();
  }

  render() {
    const { data } = this.props;

    return (
      <li className="item">
        <div className="checkbox-custom">
          <input type="checkbox"
            id={`selector${data._id}`}
            name={`selector${data._id}`}
            value=''
            checked={this.props.checked}
            onChange={this.handleChange} />
          <label className="checkbox-label" htmlFor={`selector${data._id}`}>&nbsp;</label>
          <div className="check"></div>
        </div>
        <div className="content" 
            onClick={() => this.toggleShow()} >
          <span className="title">{data.blog_title}</span>
          <div className="row">
            <span className="date-time">{data.created_at}</span>
            <div className="favourite">
              <span className="ficon-heart"></span>
              <span className="number">いいね!({data.likecount})</span>
            </div>
          </div>
          <div className="row comment-text"
            style={{ display: this.state.isHidden ? 'none' : 'block' }}>
            <p className="text">{data.blog_description}</p>
          </div>
        </div>
        <div className="group-action-button">
          <button className="btn-action btn-edit mb5"
            onClick={this.props.updateBlog} >
            編集
          </button>
          <button className="btn-action btn-delete"
            onClick={() => this.deleteBlog(data._id)} >
            削除
          </button>
        </div>
      </li>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogItem);
