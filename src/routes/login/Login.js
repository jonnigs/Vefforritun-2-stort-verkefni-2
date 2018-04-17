import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginPost } from '../../api';

import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { user, token } = await loginPost(this.state.username, this.state.password);
    if (token.error) {
      this.setState({message: token.error});
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.assign('/');
    }
  }

  render() {
    const { username, password, message } = this.state;

    return (
      <div>
        <h2>Innskráning</h2>
        <p className='error'>{this.state.message}</p>
        <form>
          <label>Notendanafn:
            <input type='text' value={this.state.username} onChange={this.handleUsernameChange}/>
          </label>
          <label>Lykilorð:
            <input type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <Button onClick={this.handleSubmit} children='Innskrá'/>
        </form>
        <Link to='/register'>Nýskráning</Link>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Login;
