import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { MasterLayout } from '../../components/layouts';
import { LoginForm } from '../../components/login';
import * as Actions from '../../actions/';

class Login extends Component {
  handleSubmit = (data) => {    
    return this.props.actions.authLogin(data)
    .then(res => {
      if (res.error) {
        throw new Error('Không thể đăng nhập vui lòng thử lại');
      }

      if (res.payload.data.result && res.payload.data.result.error) {
        throw new Error(res.payload.data.result.message);
      }

      return this.props.history.push('/mypage');
    });
  }

  render() {
    return (
      <MasterLayout>
        <section className="main-container user-container" style={{minHeight: '500px'}}>
          <div className="tab-container">
            <div className="tab-header">
              <ul className="tab-group">
                <li className="tab-item is-actived">
                  <Link to="/">ログイン</Link>
                </li>
                <li className="tab-item">
                  <Link to="/">登録</Link>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="signin-container">
                <div className="main-form signin-form">
                  <LoginForm onSubmit={this.handleSubmit} />
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </section>
      </MasterLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

