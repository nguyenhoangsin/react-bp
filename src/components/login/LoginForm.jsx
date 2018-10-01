import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class LoginForm extends Component {
  state = {
    form: {
      username: '',
      password: ''
    },
    errors: {
      username: null,
      password: null
    }
  }

  handleChangeInput = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      },
      errors: {
        username: null,
        password: null
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.form.username.trim() === '') {
      return this.setState({
        errors: {
          username: 'User name is required',
          password: null
        }
      });
    }

    if (this.state.form.password.trim() === '') {
      return this.setState({
        errors: {
          username: null,
          password: 'Password is required'
        }
      });
    }

    this.props.onSubmit && this.props.onSubmit(this.state.form)
    .catch(err => {
      this.setState({
        errors: {
          password: err.message
        }
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="username"
            className="input-control"
            placeholder="Eメールアドレス"
            value={this.state.form.username}
            onChange={this.handleChangeInput}
          />
          {
            this.state.errors.username &&
            <span className="text-validate error">{this.state.errors.username}</span>
          }
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            className="input-control"
            placeholder="パスワード"
            value={this.state.form.password}
            onChange={this.handleChangeInput}
          />
          {
            this.state.errors.password &&
            <span className="text-validate error">{this.state.errors.password}</span>
          }
        </div>
        <div className="checkbox-group">
          <div className="checkbox-custom">
            <input
              type="checkbox"
              id="selector"
              name="remember"
              onChange={this.handleChangeInput}
            />
            <label className="checkbox-label" htmlFor="selector">私を覚えてますか</label>
            <div className="check"></div>
          </div>
        </div>
        <Link to="/" className="forgot-link">パスワードをお忘れですか？</Link>
        <div className="button-group">
          <button type="button" className="button-social button-facebook"><span className="ficon ficon-facebook"></span>でログインする</button>
          <button type="button" className="button-social button-google"><span className="ficon ficon-google-plus"></span>Google?</button>
          <button type="button" className="button-social button-twitter"><span className="ficon ficon-twitter"></span>Twitter</button>
          <button type="submit" className="button-submit">ログイン</button>
        </div>
        <button type="submit" className="create-account-link">アカウント作成 <span className="ficon-next"></span></button>
      </form>
    );
  }
}

export default LoginForm;
