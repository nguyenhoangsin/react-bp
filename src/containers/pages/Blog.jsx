import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { MasterLayout } from '../../components/layouts';
import * as Actions from '../../actions/';
import { IMAGE_URL } from '../../constants/Api';

import { Toggle } from '../../components/utils';
import { BlogItem } from '../../components/mypage';

class Blog extends Component {
  static props = {
    myBlogs: propsTypes.object,
  }

  static defaultProps = {
    myBlogs: [],
  }

  state = {
    hidden: true,
    blogTitle: '',
    blogDescription: '',
    isAllChecked: false,
    updatingBlogId: '',
  };

  componentDidMount = () => {
    this.props.actions.getMyBlogs(this.props.auth.user);
  }

  toggleWriteBlog = () => {
    this.setState((prevState, props) => ({
      hidden: !(prevState.hidden)
    }))
    this.setState({
      updatingBlogId: '', 
      blogTitle: '',
      blogDescription: '',
    })
  }

  blogTitleChange = (e) => {
    this.setState({ blogTitle: e.target.value });
  }

  blogDescriptionChange = (e) => {
    this.setState({ blogDescription: e.target.value });
  }

  createNewBlog = () => {
    let data = { userId: this.props.auth.user, blog_title: this.state.blogTitle, blog_description: this.state.blogDescription }
    this.props.actions.createNewBlog(data)
      .then(() => {
        this.props.actions.getMyBlogs(this.props.auth.user);
      });
  }

  setUpdatingBlogId = (blogId, blogTitle, blogDescription) => {
    if (this.state.updatingBlogId === blogId) this.setState({hidden: true});
    else this.setState({hidden: false})
    this.setState({
      updatingBlogId: blogId, 
      blogTitle: blogTitle,
      blogDescription: blogDescription,
    })
  }

  updateBlog = (blogId) => {
    let data = { blogid: blogId, blog_title: this.state.blogTitle, blog_description: this.state.blogDescription }
    this.props.actions.updateBlog(data)
      .then(() => {
        this.props.actions.getMyBlogs(this.props.auth.user);
      });
  }

  onSubmitBlog = (e) => {
    e.preventDefault();
    if (this.state.updatingBlogId) this.updateBlog(this.state.updatingBlogId)
    else this.createNewBlog();
    this.setState({hidden: true});
    this.setState({
      updatingBlogId: '', 
      blogTitle: '',
      blogDescription: '',
    });
  }

  deleteAllBlog = (blogId) => {
    let dais = this.props.myBlogs.filter((c) => {
      return c.checked;
    })
    let itemsProcessed = 0;
    dais.forEach(item => {
      this.props.actions.deleteBlog(item._id)
        .then(() => {
          itemsProcessed++;
          if (itemsProcessed === dais.length) {
            this.props.actions.getMyBlogs(this.props.auth.user);
          }
        });
    })
  }

  selectAll = (event) => {
  	this.props.myBlogs.map( (item) => { 
      item.checked = event.target.checked 
    })
    this.setState({ isAllChecked: event.target.checked  })
  }
  
  handleChange = (index) => {
    this.props.myBlogs[index].checked = !this.props.myBlogs[index].checked;
    let dais = this.props.myBlogs.filter( (c) => {
      return c.checked;
    }).length;
    if (dais === this.props.myBlogs.length) this.setState({ isAllChecked: true }) 
    else this.setState({ isAllChecked: false });
  }

  render() {
    return (
      <MasterLayout>
        <div className="breadcrumb-container">
          <ul className="list">
            <li>
              <Link to="/mypage"><span className="ficon-prev"></span>マイページ</Link>
            </li>
          </ul>
        </div>
        <section className="main-container detail-container blog-page-container">
          <div className="user-info-container">
            <div className="image-avatar">
              <div className="image"
                style={{
                  backgroundImage: this.props.myProfile.profile_pic ?
                    `url(${IMAGE_URL}/profile/${this.props.myProfile.profile_pic})` : ''
                }}
              >
                <img src="images/image-avatar-1.jpg" alt="" />
              </div>
            </div>
            <div className="user-info">
              <p className="username">{this.props.myProfile.fullname}</p>
              <a href="#" className="text-link">編集 <span className="ficon-next"></span></a>
            </div>
            <div className="group-button" onClick={this.toggleWriteBlog}>
              <a className={"button-action button-action-toggle-form " + (this.state.hidden ? '' : 'button-action-gray')} >
                <span>ブログを書く</span>
              </a>
            </div>
          </div>

          <Toggle hidden={this.state.hidden}>
            <div className="block-container blog-page-form">
              <h2 className="main-title text-center">ブログを追加</h2>
              <div className="main-form">
                <form onSubmit={this.onSubmitBlog}>
                  <div className="input-group">
                    <input type="text"
                      name="email"
                      className="input-control"
                      placeholder="タイトルブログ"
                      value={this.state.blogTitle}
                      onChange={this.blogTitleChange} />
                  </div>
                  <div className="input-group">
                    <textarea className="input-control"
                      rows="5"
                      cols="10"
                      placeholder="ブログの説明"
                      value={this.state.blogDescription}
                      onChange={this.blogDescriptionChange}
                    />
                  </div>
                  <div className="button-group">
                    <button type="submit"
                      className="button-submit"
                      disabled={!this.state.blogTitle || !this.state.blogDescription}>
                      ブログを追加
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Toggle>

          <div className="block-container blog-page-close-container mt0 mb0">
            <div className="list-checkbox">
              <ul className="list">
                <li className="item">
                  <div className="checkbox-custom">
                    <input type="checkbox"
                      id="selectorAll"
                      name="selectorAll"
                      onClick={this.selectAll}
                      checked={this.state.isAllChecked} />
                    <label className="checkbox-label" htmlFor="selectorAll">&nbsp;</label>
                    <div className="check"></div>
                  </div>
                  <div className="content">
                    <span className="title">全選択/全解除</span>
                  </div>
                </li>
                {
                  this.props.myBlogs.map((item, key) =>
                    <BlogItem
                      key={key}
                      data={item}
                      checked={item.checked}
                      updateCheck={() => this.handleChange(key)} 
                      updateBlog={() => this.setUpdatingBlogId(item._id, item.blog_title, item.blog_description)} />
                  )
                }
              </ul>
            </div>
            <div className="footer-bar text-right" onClick={this.deleteAllBlog} >
              <a className="button-link">削除する</a>
            </div>
          </div>
          <div className="block-container link-container">
            <div href="#" className="button button-link-store">
              <Link to="/mypage"><span className="ficon ficon-home"></span> マイページ</Link>
            </div>
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  myProfile: state.users.myProfile,
  myBlogs: state.users.myBlogs,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

